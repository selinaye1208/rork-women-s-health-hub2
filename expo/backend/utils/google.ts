import crypto from "crypto";

let cachedToken: { accessToken: string; exp: number } | null = null;

export function getProjectId(): string {
  const projectId = process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID ?? process.env.FIREBASE_PROJECT_ID ?? "";
  if (!projectId) throw new Error("FIREBASE_PROJECT_ID env is required");
  return projectId;
}

function getClientEmail(): string {
  const v = process.env.FIREBASE_CLIENT_EMAIL ?? "";
  if (!v) throw new Error("FIREBASE_CLIENT_EMAIL env is required");
  return v;
}

function getPrivateKey(): string {
  const raw = process.env.FIREBASE_PRIVATE_KEY ?? "";
  if (!raw) throw new Error("FIREBASE_PRIVATE_KEY env is required");
  return raw.replace(/\\n/g, "\n");
}

export async function getAccessToken(): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  if (cachedToken && cachedToken.exp - 60 > now) return cachedToken.accessToken;

  const iat = now;
  const exp = now + 3600;
  const iss = getClientEmail();
  const scope = "https://www.googleapis.com/auth/datastore";
  const aud = "https://oauth2.googleapis.com/token";

  const header = { alg: "RS256", typ: "JWT" };
  const payload = { iss, scope, aud, iat, exp } as const;

  const base64url = (input: string) => Buffer.from(input).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");

  const signingInput = `${base64url(JSON.stringify(header))}.${base64url(JSON.stringify(payload))}`;
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(signingInput);
  signer.end();
  const signature = signer.sign(getPrivateKey());
  const jwt = `${signingInput}.${signature.toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_")}`;

  const res = await fetch(aud, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }).toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Google OAuth token error", res.status, text);
    throw new Error("Failed to obtain access token");
  }
  const data = (await res.json()) as { access_token?: string; expires_in?: number };
  const accessToken = String(data.access_token ?? "");
  const expiresIn = Number(data.expires_in ?? 3600);
  if (!accessToken) throw new Error("Empty access token");
  cachedToken = { accessToken, exp: now + expiresIn };
  return accessToken;
}
