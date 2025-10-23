import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../create-context";

async function searchProviders(lat: number, lon: number, query: string) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "10");
  url.searchParams.set("addressdetails", "1");
  url.searchParams.set("bounded", "1");
  const viewboxSize = 0.05;
  url.searchParams.set("viewbox", `${lon - viewboxSize},${lat + viewboxSize},${lon + viewboxSize},${lat - viewboxSize}`);
  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": "RorkHealthApp/1.0 (contact: support@example.com)",
    },
  });
  if (!res.ok) throw new Error("Provider search failed");
  const data = (await res.json()) as unknown as Array<Record<string, unknown>>;
  return data.map((d) => ({
    name: String(d.display_name ?? "Unknown"),
    lat: Number(d.lat ?? 0),
    lon: Number(d.lon ?? 0),
    type: String(d.type ?? "unknown"),
  }));
}

export const providersRouter = createTRPCRouter({
  nearby: publicProcedure
    .input(z.object({ lat: z.number(), lon: z.number(), query: z.string().default("clinic OR hospital OR gynecologist") }))
    .query(async ({ input }) => {
      const items = await searchProviders(input.lat, input.lon, input.query);
      return { items };
    }),
});
export type ProvidersRouter = typeof providersRouter;
