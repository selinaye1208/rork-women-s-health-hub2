import type { Message } from "@/types/chat";
import { getAccessToken, getProjectId } from "@/backend/utils/google";

function toFirestoreFields(message: Message) {
  return {
    id: { stringValue: message.id },
    text: { stringValue: message.text },
    isUser: { booleanValue: message.isUser },
    timestamp: { integerValue: String(message.timestamp) },
  } as const;
}

function fromFirestoreDocument(doc: Record<string, unknown>): Message | null {
  const fields = (doc.fields ?? {}) as Record<string, any>;
  const id = fields.id?.stringValue;
  const text = fields.text?.stringValue;
  const isUser = fields.isUser?.booleanValue;
  const tsStr = fields.timestamp?.integerValue ?? fields.timestamp?.stringValue;
  const timestamp = tsStr ? Number(tsStr) : undefined;
  if (
    typeof id === "string" &&
    typeof text === "string" &&
    typeof isUser === "boolean" &&
    typeof timestamp === "number"
  )
    return { id, text, isUser, timestamp };
  return null;
}

export async function saveMessage(uid: string, message: Message): Promise<void> {
  const accessToken = await getAccessToken();
  const projectId = getProjectId();
  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/chats/${encodeURIComponent(
      uid
    )}/messages`
  );
  url.searchParams.set("documentId", message.id);
  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: toFirestoreFields(message) }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Firestore saveMessage failed", res.status, text);
    throw new Error("Failed to save message");
  }
}

export async function listMessages(uid: string, limit = 50): Promise<Message[]> {
  const accessToken = await getAccessToken();
  const projectId = getProjectId();
  const url = new URL(
    `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/chats/${encodeURIComponent(
      uid
    )}/messages`
  );
  url.searchParams.set("pageSize", String(limit));
  url.searchParams.set("orderBy", "timestamp desc");
  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Firestore listMessages failed", res.status, text);
    throw new Error("Failed to list messages");
  }
  const data = (await res.json()) as { documents?: Array<Record<string, unknown>> };
  const items = (data.documents ?? [])
    .map((d) => fromFirestoreDocument(d))
    .filter((x): x is Message => Boolean(x))
    .reverse();
  return items;
}
