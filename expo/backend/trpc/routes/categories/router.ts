import { createTRPCRouter, publicProcedure } from "../../create-context";
import categories from "@/constants/categories";

export const categoriesRouter = createTRPCRouter({
  list: publicProcedure.query(() => categories),
});
export type CategoriesRouter = typeof categoriesRouter;
