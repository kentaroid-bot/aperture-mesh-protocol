import type { ApertureDatabase, PrivateRecord } from "../db";
import { db } from "../db";
import { decryptJson, encryptJson } from "../crypto";

export class PrivateRepository {
  constructor(private database: ApertureDatabase = db) {}
  async save<T>(ownerId: string, kind: PrivateRecord["kind"], value: T, key: CryptoKey): Promise<PrivateRecord> {
    const record: PrivateRecord = { id: crypto.randomUUID(), ownerId, kind, payload: await encryptJson(value, key), shareState: "private", createdAt: new Date().toISOString() };
    await this.database.privateRecords.add(record);
    return record;
  }
  async listForOwner<T>(ownerId: string, kind: PrivateRecord["kind"], key: CryptoKey): Promise<Array<{ record: PrivateRecord; value: T }>> {
    const records = await this.database.privateRecords.where("[ownerId+kind]").equals([ownerId, kind]).reverse().sortBy("createdAt");
    return Promise.all(records.map(async (record) => ({ record, value: await decryptJson<T>(record.payload, key) })));
  }
  async getForOwner<T>(id: string, ownerId: string, key: CryptoKey): Promise<T | undefined> {
    const record = await this.database.privateRecords.get(id);
    if (!record || record.ownerId !== ownerId) return undefined;
    return decryptJson<T>(record.payload, key);
  }
  async deleteForOwner(id: string, ownerId: string): Promise<boolean> {
    const record = await this.database.privateRecords.get(id);
    if (!record || record.ownerId !== ownerId) return false;
    await this.database.privateRecords.delete(id); return true;
  }
}

