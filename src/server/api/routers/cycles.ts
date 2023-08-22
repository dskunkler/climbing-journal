import { clerkClient } from "@clerk/nextjs/server";
import { type User } from "@clerk/nextjs/dist/api";
import { z } from "zod";
import { type Context } from "../trpc";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import type MacroCycle from "~/components/macro-cycle";
import { CycleEvent } from "~/components/macro-cycle";

/**
 * Shared Procedures
 *
 * Breaking the procedural logic out now in case we need to reuse it within different procedures
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
const getCycles = async (ctx: Context): Promise<MacroCycle[]> => {
  // Grab 10 cycles
  const cycles = await ctx.prisma.macroCycle.findMany({
    where: {
      userId: { equals: ctx.userId != null ? ctx.userId : undefined },
    },
    take: 10,
    orderBy: [{ start: "desc" }],
    include: {
      microCycles: true,
      events: true,
    },
  });
  return cycles;
};

const getLatestCycle = async (
  ctx: Context
): Promise<MacroCycle | null | undefined> => {
  const cycles = await getCycles(ctx);
  return cycles?.length ? cycles[0] : null;
};

const getEventById = async (
  ctx: Context,
  id: string
): Promise<CycleEvent | null> => {
  const event = await ctx.prisma.event.findUnique({
    where: {
      id: id,
    },
  });
  return event;
};

export const macroCycleRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await getCycles(ctx);
  }),
  getMostRecent: protectedProcedure.query(async ({ ctx }) => {
    return await getLatestCycle(ctx);
  }),
  create: protectedProcedure
    .input(
      z.object({
        start: z.date(),
        end: z.date(),
        goal: z.string().min(1).max(280),
        events: z
          .object({
            date: z.date(),
            name: z.string(),
            // info: z.object({}).passthrough().optional(),https://github.com/dskunkler/climbing-journal/issues/54
            info: z.string().nullable().optional(),
          })
          .array(),
        microCycles: z
          .object({
            start: z.date(),
            end: z.date(),
            duration: z.number(),
            name: z.string(),
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
          events: {
            create: input.events.map((event) => {
              return {
                date: event.date,
                name: event.name,
                info: event.info,
              };
            }),
          },
          microCycles: {
            create: input.microCycles.map((cycle) => {
              return {
                start: cycle.start,
                end: cycle.end,
                duration: cycle.duration,
                name: cycle.name,
              };
            }),
          },
        },
      });
      return post;
    }),
  addEvent: protectedProcedure
    .input(
      z.object({
        event: z.object({
          date: z.date(),
          name: z.string(),
          // info: z.object({}).passthrough().optional(),https://github.com/dskunkler/climbing-journal/issues/54
          info: z.string().nullable().optional(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const latestCycle = await getLatestCycle(ctx);
      if (latestCycle && latestCycle.id) {
        const cycle = await ctx.prisma.event.create({
          data: {
            info: input.event.info,
            name: input.event.name,
            date: input.event.date,
            macroCycleId: latestCycle.id,
          },
        });
        return cycle;
      }
      return null;
    }),
  editEventInfo: protectedProcedure
    .input(
      z.object({
        event: z.object({
          id: z.string(),
          date: z.date(),
          name: z.string(),
          info: z.string().nullable().optional(),
        }),
        newInfo: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Update our event by id and give it the newInfo we want to save
      const mutatedEvent = await ctx.prisma.event.update({
        where: {
          id: input.event.id,
        },
        data: {
          info: input.newInfo,
        },
      });
      return mutatedEvent;
    }),
});
