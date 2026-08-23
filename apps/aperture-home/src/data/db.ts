import Dexie, { type EntityTable, type Table } from "dexie";
import type { AuditEntry, CapabilityLease, Consent, ContractVersion, CooldownSession, MemberNode, Revision } from "../domain/types";
import type { EncryptedPayload } from "./crypto";

export type Household = { id: string; name: string; constitutionVersion: "1.0"; createdAt: string };
export type PrivateRecord = { id: string; ownerId: string; kind: "monku" | "safety" | "safe-channel"; payload: EncryptedPayload; shareState: "private" | "diff-only" | "shared"; createdAt: string; convertedRevisionId?: string };
export type SettingRecord = { key: string; value: unknown };

export class ApertureDatabase extends Dexie {
  households!: EntityTable<Household, "id">; members!: EntityTable<MemberNode, "id">;
  contracts!: EntityTable<ContractVersion, "id">; revisions!: EntityTable<Revision, "id">;
  consents!: Table<Consent, [string, string]>; cooldowns!: EntityTable<CooldownSession, "id">;
  leases!: EntityTable<CapabilityLease, "id">; privateRecords!: EntityTable<PrivateRecord, "id">;
  audit!: EntityTable<AuditEntry, "id">; settings!: EntityTable<SettingRecord, "key">;

  constructor(name = "aperture-home") {
    super(name);
    this.version(1).stores({ households: "id", members: "id, householdId, active", contracts: "id, contractId, status, createdAt", revisions: "id, contractId, status", consents: "[revisionId+memberId], revisionId, memberId", cooldowns: "id, initiatedBy, expiresAt", leases: "id, incidentId, expiresAt", privateRecords: "id, [ownerId+kind], ownerId, kind, createdAt", audit: "id, timestamp", settings: "key" });
  }
}

export const db = new ApertureDatabase();
