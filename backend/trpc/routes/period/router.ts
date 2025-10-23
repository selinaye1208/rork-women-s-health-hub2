import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../create-context";
import { promises as fs } from "fs";
import path from "path";

interface PeriodLog {
  date: string;
  mood?: string;
  symptoms?: string[];
  flow?: "light" | "medium" | "heavy";
  notes?: string;
}

const DATA_DIR = process.env.DATA_DIR ?? path.join(process.cwd(), ".data");
const PERIOD_DIR = path.join(DATA_DIR, "period");

async function ensureDir(dir: string) {
  await fs.mkdir(dir, { recursive: true });
}

function userFile(userId: string) {
  const safe = userId.replace(/[^a-zA-Z0-9-_]/g, "_");
  return path.join(PERIOD_DIR, `${safe}.json`);
}

async function readLogs(userId: string): Promise<PeriodLog[]> {
  try {
    const p = userFile(userId);
    const content = await fs.readFile(p, "utf8");
    const data = JSON.parse(content) as unknown;
    if (Array.isArray(data)) return data as PeriodLog[];
    return [];
  } catch (e: unknown) {
    if ((e as { code?: string }).code === "ENOENT") return [];
    throw e;
  }
}

async function writeLogs(userId: string, logs: PeriodLog[]) {
  await ensureDir(PERIOD_DIR);
  const p = userFile(userId);
  const payload = JSON.stringify(logs, null, 2);
  await fs.writeFile(p, payload, "utf8");
}

function predictNextStart(lastStartISO: string, cycleLength = 28) {
  const last = new Date(lastStartISO);
  if (isNaN(last.getTime())) return null;
  const next = new Date(last);
  next.setDate(next.getDate() + cycleLength);
  return next.toISOString().slice(0, 10);
}

export const periodRouter = createTRPCRouter({
  getLogs: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const logs = await readLogs(input.userId);
      return { logs };
    }),
  upsertLog: publicProcedure
    .input(z.object({
      userId: z.string(),
      log: z.object({
        date: z.string(),
        mood: z.string().optional(),
        symptoms: z.array(z.string()).optional(),
        flow: z.enum(["light", "medium", "heavy"]).optional(),
        notes: z.string().optional(),
      }),
    }))
    .mutation(async ({ input }) => {
      const current = await readLogs(input.userId);
      const idx = current.findIndex((l) => l.date === input.log.date);
      if (idx >= 0) current[idx] = { ...current[idx], ...input.log };
      else current.push(input.log);
      current.sort((a, b) => a.date.localeCompare(b.date));
      await writeLogs(input.userId, current);
      return { logs: current };
    }),
  predict: publicProcedure
    .input(z.object({ lastStartISO: z.string(), cycleLength: z.number().min(20).max(40).default(28) }))
    .query(({ input }) => {
      const nextStart = predictNextStart(input.lastStartISO, input.cycleLength);
      return { nextStart };
    }),
});
export type PeriodRouter = typeof periodRouter;
