export type MemberNode = { id: string; householdId: string; displayName: string; role: "adult" | "protected"; active: boolean };
export type ContractKind = "bilateral" | "shared-resource" | "data-sharing" | "safety";
export type ContractStatus = "draft" | "proposed" | "active" | "limited" | "ended";

export type ContractVersion = {
  id: string; contractId: string; version: number; kind: ContractKind; title: string;
  participants: string[]; input: string; output: string; sla?: string; boundaries: string[];
  stopConditions: string[]; status: ContractStatus; createdBy: string; createdAt: string;
};

export type ContractPatch = Partial<Pick<ContractVersion, "title" | "input" | "output" | "sla" | "boundaries" | "stopConditions" | "participants" | "status">> & {
  constitutionalChanges?: string[];
  rightsRestrictedFor?: string[];
  sharesPrivateMonkuOf?: string[];
  disablesSos?: boolean;
  removesProtectedVeto?: boolean;
  requiresAuditDeletion?: boolean;
  blocksExit?: boolean;
  automaticPhysicalRestriction?: boolean;
};

export type Revision = {
  id: string; contractId: string; baseVersion: number; proposedVersion: number; patch: ContractPatch;
  affectedNodeIds: string[]; proposer: "member" | "template" | "ai";
  constitutionCheck: "pending" | "passed" | "rejected";
  status: "draft" | "voting" | "accepted" | "rejected" | "expired"; expiresAt: string;
};

export type Consent = { revisionId: string; memberId: string; decision: "approve" | "reject" | "abstain"; decidedAt: string };
export type CooldownSession = { id: string; initiatedBy: string; targetConnectionIds: string[]; allowedChannels: Array<"sos" | "logistics" | "text">; startsAt: string; expiresAt: string; outcome?: "reconnect" | "limited" | "extend" | "exit" };
export type CapabilityLease = { id: string; incidentId: string; grantee: string; scope: Array<"safety-check" | "safe-channel" | "evidence-preservation">; purpose: string; issuedAt: string; expiresAt: string; revokedAt?: string; clockAnchor?: string };
export type AuditEntry = { id: string; actorId: string; action: string; resourceType: string; resourceId: string; timestamp: string; previousHash: string; hash: string };

