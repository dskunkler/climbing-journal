import { clerkClient } from "@clerk/nextjs/server";
import { type User } from "@clerk/nextjs/dist/api";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

// WHile this works for posts where we just want to find the last 10 posts and shoe
// Here I Think we actually want to query by CURRENT userid. No need to show
// anyone elses
export const macroCycleRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    // Grab 10 cycles
    const cycles = await ctx.prisma.macroCycle.findMany({
      where: {
        userId: { equals: ctx.userId != null ? ctx.userId : undefined },
      },
      take: 10,
      orderBy: [{ start: "desc" }],
    });
    // Get 10 users where userId is the cycles authorId
    return cycles;
  }),
  getMostRecent: protectedProcedure.query(async ({ ctx }) => {
    // Get most recent
    const cycles = await ctx.prisma.macroCycle.findMany({
      where: {
        userId: { equals: ctx.userId != null ? ctx.userId : undefined },
      },
      take: 1,
      orderBy: [{ start: "desc" }],
      include: {
        microCycles: true,
      },
    });
    return cycles[0];
  }),
  create: protectedProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        goal: z.string().min(1).max(280),
        microCycles: z
          .object({
            start: z.date(),
            end: z.date(),
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
          end: input.end,
          goal: input.goal,
          microCycles: {
            create: input.microCycles.map((cycle) => {
              return {
                start: cycle.start,
                end: cycle.end,
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
