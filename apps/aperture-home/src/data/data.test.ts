import { afterEach, describe, expect, it } from "vitest";
import { ApertureDatabase } from "./db";
import { deriveKey, randomSalt } from "./crypto";
import { PrivateRepository } from "./repositories/privateRepository";
import { exportEncrypted, importEncrypted } from "./export";

describe("local private data", () => {
  let database: ApertureDatabase;
  afterEach(async () => { if (database) await database.delete(); });
  it("survives DB access but cannot be fetched as another owner", async () => {
    database = new ApertureDatabase(`test-${crypto.randomUUID()}`); const repo = new PrivateRepository(database); const key = await deriveKey("1234567890", randomSalt());
    const saved = await repo.save("n2", "monku", { body: "private" }, key);
    expect(await repo.getForOwner(saved.id, "n1", key)).toBeUndefined();
    expect((await repo.getForOwner<{ body: string }>(saved.id, "n2", key))?.body).toBe("private");
    expect(JSON.stringify(await database.privateRecords.get(saved.id))).not.toContain('"body":"private"');
  });
  it("exports and imports only encrypted envelopes", async () => {
    database = new ApertureDatabase(`test-${crypto.randomUUID()}`); await database.settings.add({ key: "hello", value: "world" });
    const blob = await exportEncrypted("long passphrase", database); const text = await new Promise<string>((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result)); reader.onerror = reject; reader.readAsText(blob); });
    expect(text).not.toContain("world"); await database.settings.clear(); await importEncrypted(text, "long passphrase", database);
    expect((await database.settings.get("hello"))?.value).toBe("world");
  });
});
