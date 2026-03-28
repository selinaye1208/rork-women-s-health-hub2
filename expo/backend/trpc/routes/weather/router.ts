import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../../create-context";

async function fetchOpenMeteo(lat: number, lon: number) {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  url.searchParams.set("latitude", String(lat));
  url.searchParams.set("longitude", String(lon));
  url.searchParams.set("current_weather", "true");
  url.searchParams.set("hourly", "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation");
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error("Weather fetch failed");
  return (await res.json()) as unknown as Record<string, unknown>;
}

function buildHealthAdvice(tempC?: number | null, humidity?: number | null, precipitation?: number | null) {
  const parts: string[] = [];
  if (typeof tempC === "number") {
    if (tempC >= 30) parts.push("High heat: hydrate aggressively, avoid peak sun, and plan lighter activity.");
    else if (tempC <= 0) parts.push("Freezing temps: layer clothing, protect extremities, and limit outdoor exposure.");
    else parts.push("Comfortable temperature: great for outdoor walks and moderate exercise.");
  }
  if (typeof humidity === "number") {
    if (humidity >= 75) parts.push("High humidity: watch for heat stress; focus on electrolytes.");
    else if (humidity <= 25) parts.push("Dry air: moisturize skin and consider a humidifier; increase water intake.");
  }
  if (typeof precipitation === "number" && precipitation > 0) {
    parts.push("Rain expected: carry waterproof layers and choose indoor workouts.");
  }
  if (parts.length === 0) parts.push("No special weather risks detected today. Maintain regular healthy routines.");
  return parts.join(" ");
}

export const weatherRouter = createTRPCRouter({
  current: publicProcedure
    .input(z.object({ lat: z.number(), lon: z.number() }))
    .query(async ({ input }) => {
      const data = await fetchOpenMeteo(input.lat, input.lon);
      const current = (data.current_weather ?? {}) as { temperature?: number } & Record<string, unknown>;
      const hourly = (data.hourly ?? {}) as Record<string, unknown> & {
        temperature_2m?: number[];
        relative_humidity_2m?: number[];
        precipitation?: number[];
      };
      const tempC = typeof current.temperature === "number" ? current.temperature : Array.isArray(hourly.temperature_2m) ? hourly.temperature_2m[0] ?? null : null;
      const humidity = Array.isArray(hourly.relative_humidity_2m) ? (hourly.relative_humidity_2m[0] as number) ?? null : null;
      const precipitation = Array.isArray(hourly.precipitation) ? (hourly.precipitation[0] as number) ?? null : null;
      const advice = buildHealthAdvice(tempC ?? null, humidity ?? null, precipitation ?? null);
      return { tempC, humidity, precipitation, advice };
    }),
});
export type WeatherRouter = typeof weatherRouter;
