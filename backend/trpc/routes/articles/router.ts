import { z } from "zod";
import { publicProcedure, createTRPCRouter } from "../../create-context";
import categories from "@/constants/categories";

const ARTICLE_FOLDERS = [
  "nutrition",
  "puberty",
  "reproductive",
  "mental",
  "fitness",
  "skinbeauty",
  "sleep",
  "heart",
  "menstruation",
] as const;

async function loadArticleById(id: string) {
  for (const folder of ARTICLE_FOLDERS) {
    try {
      const mod = await import(`@/articles/${folder}/${id}.ts`);
      const data = (mod as unknown as { article?: unknown }).article as
        | { id: string; title: string; content: string }
        | undefined;
      if (data && typeof data.id === "string" && typeof data.content === "string") {
        return { ...data };
      }
    } catch (e) {
      // continue
    }
  }
  return null;
}

export const articlesRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const art = await loadArticleById(input.id);
      if (!art) {
        throw new Error("Article not found");
      }
      return art;
    }),
  listByCategoryId: publicProcedure
    .input(z.object({ categoryId: z.string() }))
    .query(({ input }) => {
      const cat = categories.find((c) => c.id === input.categoryId);
      if (!cat) {
        throw new Error("Category not found");
      }
      return cat.articles;
    }),
  metaById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      for (const cat of categories) {
        const found = cat.articles.find((a) => a.id === input.id);
        if (found) return found;
      }
      throw new Error("Article meta not found");
    }),
});
export type ArticlesRouter = typeof articlesRouter;
