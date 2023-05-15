import { clerkClient } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/dist/api";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCClientError } from "@trpc/client";
import { TRPCError } from "@trpc/server";

// Filter subset of user data
const filterUserForClient = (user: User) => {
  return {
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    id: user.id,
  };
};

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Grab 10 posts
    const posts = await ctx.prisma.post.findMany({
      take: 10,
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
});
