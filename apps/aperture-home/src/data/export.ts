import type { ApertureDatabase } from "./db";
import { db } from "./db";
import { deriveKey, encryptJson, decryptJson, randomSalt, type EncryptedPayload } from "./crypto";

type BackupEnvelope = { format: "aperture-home-encrypted-backup"; version: 1; salt: string; payload: EncryptedPayload };

async function snapshot(database: ApertureDatabase) {
  return database.transaction("r", database.tables, async () => Object.fromEntries(await Promise.all(database.tables.map(async (table) => [table.name, await table.toArray()]))));
}

export async function exportEncrypted(passphrase: string, database: ApertureDatabase = db): Promise<Blob> {
  if (passphrase.length < 10) throw new Error("パスフレーズは10文字以上にしてください");
  const salt = randomSalt(); const key = await deriveKey(passphrase, salt);
  const envelope: BackupEnvelope = { format: "aperture-home-encrypted-backup", version: 1, salt, payload: await encryptJson(await snapshot(database), key) };
  return new Blob([JSON.stringify(envelope)], { type: "application/json" });
}

export async function importEncrypted(text: string, passphrase: string, database: ApertureDatabase = db): Promise<void> {
  const envelope = JSON.parse(text) as BackupEnvelope;
  if (envelope.format !== "aperture-home-encrypted-backup" || envelope.version !== 1) throw new Error("対応していないバックアップ形式です");
  const data = await decryptJson<Record<string, unknown[]>>(envelope.payload, await deriveKey(passphrase, envelope.salt));
  await database.transaction("rw", database.tables, async () => {
    for (const table of database.tables) { await table.clear(); const rows = data[table.name]; if (rows?.length) await table.bulkAdd(rows); }
  });
}

export async function deleteAllData(database: ApertureDatabase = db): Promise<void> {
  await database.transaction("rw", database.tables, async () => Promise.all(database.tables.map((table) => table.clear())));
}

