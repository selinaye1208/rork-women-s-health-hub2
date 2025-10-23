import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import { categoriesRouter } from "./routes/categories/router";
import { articlesRouter } from "./routes/articles/router";
import { searchRouter } from "./routes/search/router";
import { weatherRouter } from "./routes/weather/router";
import { providersRouter } from "./routes/providers/router";
import { periodRouter } from "./routes/period/router";
import { storageRouter } from "./routes/storage/router";
import { chatsRouter } from "./routes/chats/router";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  categories: categoriesRouter,
  articles: articlesRouter,
  search: searchRouter,
  weather: weatherRouter,
  providers: providersRouter,
  period: periodRouter,
  storage: storageRouter,
  chats: chatsRouter,
});

export type AppRouter = typeof appRouter;
