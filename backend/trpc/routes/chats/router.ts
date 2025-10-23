import { createTRPCRouter, protectedProcedure } from "../../create-context";
import { z } from "zod";
import { saveMessage, listMessages } from "./service";

export const chatsRouter = createTRPCRouter({
  add: protectedProcedure
    .input(
      z.object({
        message: z.object({
          id: z.string(),
          text: z.string(),
          isUser: z.boolean(),
          timestamp: z.number(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const uid = ctx.user.uid;
      await saveMessage(uid, input.message);
      return { ok: true as const };
    }),
  list: protectedProcedure
    .input(z.object({ limit: z.number().min(1).max(200).default(50) }))
    .query(async ({ ctx, input }) => {
      const uid = ctx.user.uid;
      const items = await listMessages(uid, input.limit);
      return { items };
    }),
});

export type ChatsRouter = typeof chatsRouter;
