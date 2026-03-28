import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";

async function verifyFirebaseIdToken(idToken: string): Promise<{ uid: string } | null> {
  try {
    const apiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY ?? "";
    if (!apiKey) return null;
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      }
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { users?: Array<{ localId?: string }> };
    const uid = data.users?.[0]?.localId;
    if (typeof uid === "string" && uid.length > 0) return { uid };
    return null;
  } catch {
    return null;
  }
}

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const authHeader = opts.req.headers.get("authorization") ?? opts.req.headers.get("Authorization");
  let user: { uid: string } | null = null;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.slice("Bearer ".length).trim();
    user = (await verifyFirebaseIdToken(token)) ?? null;
  }
  return {
    req: opts.req,
    user,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.user) throw new TRPCError({ code: "UNAUTHORIZED" });
  return next({ ctx: { user: ctx.user } });
});
