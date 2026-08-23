import type { AuditEntry } from "./types";

const secretPattern = /(monku-body|sos-message|body-content|secret-content|private-message)/i;
const encode = (value: string) => new TextEncoder().encode(value);
const hex = (buffer: ArrayBuffer) => [...new Uint8Array(buffer)].map((b) => b.toString(16).padStart(2, "0")).join("");

export async function hashAuditFields(entry: Omit<AuditEntry, "hash">): Promise<string> {
  return hex(await crypto.subtle.digest("SHA-256", encode([entry.id, entry.actorId, entry.action, entry.resourceType, entry.resourceId, entry.timestamp, entry.previousHash].join("|"))));
}

export async function appendAudit(entries: AuditEntry[], input: Omit<AuditEntry, "id" | "timestamp" | "previousHash" | "hash">, now = new Date()): Promise<AuditEntry> {
  if (Object.values(input).some((value) => secretPattern.test(value))) throw new Error("監査ログに秘密本文または秘密本文を示すフィールドを記録できません");
  const unsigned = { ...input, id: crypto.randomUUID(), timestamp: now.toISOString(), previousHash: entries.at(-1)?.hash ?? "GENESIS" };
  return { ...unsigned, hash: await hashAuditFields(unsigned) };
}

export async function verifyAuditChain(entries: AuditEntry[]): Promise<boolean> {
  for (let i = 0; i < entries.length; i += 1) {
    const { hash, ...unsigned } = entries[i];
    if (unsigned.previousHash !== (i ? entries[i - 1].hash : "GENESIS") || hash !== await hashAuditFields(unsigned)) return false;
  }
  return true;
}
