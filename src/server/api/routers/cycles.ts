import { clerkClient } from "@clerk/nextjs/server";
import { type User } from "@clerk/nextjs/dist/api";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// Filter subset of user data
const filterUserForClient = (user: User) => {
  return {
    username: user.username,
    profileImageUrl: user.profileImageUrl,
    id: user.id,
  };
};

// WHile this works for posts where we just want to find the last 10 posts and shoe
// Here I Think we actually want to query by CURRENT userid. No need to show
// anyone elses
export const macroCycleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Grab 10 cycles
    const cycles = await ctx.prisma.macroCycle.findMany({
      where: {
        userId: { equals: ctx.userId != null ? ctx.userId : undefined },
      },
      take: 10,
      orderBy: [{ start: "desc" }],
    });
    // Get 10 users where userId is the cycles authorId
    const users = (
      await clerkClient.users.getUserList({
        userId: cycles.map((cycle) => cycle.userId),
        limit: 10,
      })
    ).map(filterUserForClient);
    // Return post and its associated author id
    return cycles.map((cycle) => {
      const author = users.find((user) => user.id === cycle.userId);
      if (!author) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Author for post not found",
        });
      }

      return {
        cycle,
        author,
      };
    });
  }),
  create: protectedProcedure
    .input(
      z.object({
        start: z.date(),
        goal: z.string().min(1).max(280),
        microCycles: z
          .object({
            start: z.date(),
            duration: z.number(),
            name: z.string(),
            events: z
              .object({
                date: z.date(),
                name: z.string(),
                info: z.object({}).passthrough(),
              })
              .array(),
          })
          .array(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const post = await ctx.prisma.macroCycle.create({
        data: {
          userId,
          start: input.start,
          goal: input.goal,
          microCycles: {
            create: input.microCycles.map((cycle) => {
              return {
                start: cycle.start,
                duration: cycle.duration,
                name: cycle.name,
                userId,
                events: {
                  create: cycle.events.map((event) => {
                    return {
                      date: event.date,
                      name: event.name,
                      userId,
                      info: event.info,
                    };
                  }),
                },
              };
            }),
          },
        },
      });
      return post;
    }),
});
