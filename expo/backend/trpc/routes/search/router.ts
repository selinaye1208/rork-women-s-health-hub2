import { z } from "zod";
import categories from "@/constants/categories";
import { publicProcedure, createTRPCRouter } from "../../create-context";

export const searchRouter = createTRPCRouter({
  query: publicProcedure
    .input(z.object({ q: z.string().min(1) }))
    .query(async ({ input }) => {
      const q = input.q.toLowerCase();
      const results: Array<{
        id: string;
        title: string;
        summary: string;
        categoryId: string;
        categoryTitle: string;
      }> = [];
      for (const cat of categories) {
        for (const a of cat.articles) {
          if (
            a.title.toLowerCase().includes(q) ||
            a.summary.toLowerCase().includes(q) ||
            (a.subcategory ?? "").toLowerCase().includes(q)
          ) {
            results.push({
              id: a.id,
              title: a.title,
              summary: a.summary,
              categoryId: cat.id,
              categoryTitle: cat.title,
            });
          }
        }
      }
      return { results };
    }),
});
export type SearchRouter = typeof searchRouter;
