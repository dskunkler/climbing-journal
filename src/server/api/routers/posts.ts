import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { type User, clerkClient } from "@clerk/nextjs/server";

// Filter subset of user data
const filterUserForClient = (user: User) => {
  return {
    username: user.username,
    imageUrl: user.imageUrl,
    id: user.id,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Grab 10 posts
    const posts = await ctx.prisma.post.findMany({
      take: 10,
      orderBy: [{ createdAt: "desc" }],
    });
    // Get 10 users where userId is the posts authorId
    const users = (
      await clerkClient.users.getUserList({
        userId: posts.map((post) => post.authorId),
        limit: 10,
      })
    ).map(filterUserForClient);
    // Return post and its associated author id
    return posts.map((post) => {
      const author = users.find((user) => user.id === post.authorId);
      if (!author) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found",
        });
      }

      return {
        post,
        author,
      };
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        content: z.string().emoji().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const post = await ctx.prisma.post.create({
        data: {
          authorId,
          content: input.content,
        },
      });
      return post;
    }),
});
