import { createTRPCRouter, publicProcedure } from "../../create-context";
import { z } from "zod";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), ".data");
const BUCKET_DIR = path.join(DATA_DIR, "storage");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function keyPath(userId: string, key: string) {
  const safeUser = userId.replace(/[^a-zA-Z0-9-_]/g, "_");
  const safeKey = key.replace(/[^a-zA-Z0-9-_/]/g, "_");
  return path.join(BUCKET_DIR, safeUser, `${safeKey}.jsonl`);
}

async function appendJSONL(filePath: string, items: unknown[]) {
  await ensureDir(path.dirname(filePath));
  const lines = items.map((i) => JSON.stringify(i) + "\n").join("");
  await fs.appendFile(filePath, lines, { encoding: "utf8" });
}

async function readJSONLRange(filePath: string, offset: number, limit: number) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const lines = content.split(/\n/).filter((l) => l.trim().length > 0);
    const slice = lines.slice(offset, offset + limit);
    return slice.map((l) => JSON.parse(l) as unknown);
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "ENOENT") return [];
    throw e;
  }
}

async function statJSONL(filePath: string) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const lines = content.split(/\n/).filter((l) => l.trim().length > 0);
    return { lines: lines.length, bytes: Buffer.byteLength(content, "utf8") };
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "ENOENT") return { lines: 0, bytes: 0 };
    throw e;
  }
}

export const storageRouter = createTRPCRouter({
  append: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        key: z.string(),
        items: z.array(z.unknown()).min(1),
      })
    )
    .mutation(async ({ input }) => {
      const p = keyPath(input.userId, input.key);
      await appendJSONL(p, input.items);
      const meta = await statJSONL(p);
      return { ok: true as const, meta };
    }),
  readRange: publicProcedure
    .input(
      z.object({ userId: z.string(), key: z.string(), offset: z.number().min(0).default(0), limit: z.number().min(1).max(5000).default(1000) })
    )
    .query(async ({ input }) => {
      const p = keyPath(input.userId, input.key);
      const items = await readJSONLRange(p, input.offset, input.limit);
      const meta = await statJSONL(p);
      return { items, meta };
    }),
  stats: publicProcedure
    .input(z.object({ userId: z.string(), key: z.string() }))
    .query(async ({ input }) => {
      const p = keyPath(input.userId, input.key);
      const meta = await statJSONL(p);
      return { meta };
    }),
  delete: publicProcedure
    .input(z.object({ userId: z.string(), key: z.string() }))
    .mutation(async ({ input }) => {
      const p = keyPath(input.userId, input.key);
      try {
        await fs.unlink(p);
      } catch (e: unknown) {
        if ((e as { code?: string }).code !== "ENOENT") throw e;
      }
      return { ok: true as const };
    }),
});
export type StorageRouter = typeof storageRouter;
