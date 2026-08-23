import { inspectPatch } from "./constitution";
import type { Consent, ContractVersion, MemberNode, Revision } from "./types";
import { evaluateConsensus } from "./consensus";

export function mergeRevision(base: ContractVersion, revision: Revision, consents: Consent[], nodes: MemberNode[], ownerConsents: string[] = []): ContractVersion {
  if (revision.status !== "voting") throw new Error("投票中のRevisionだけを採用できます");
  if (new Date(revision.expiresAt).getTime() <= Date.now()) throw new Error("Revisionは期限切れです");
  const constitution = inspectPatch(revision.patch, revision.proposer, ownerConsents);
  if (!constitution.ok) throw new Error(constitution.reasons.join(" / "));
  if (revision.proposer === "ai") throw new Error("C-07: AIはRevisionを直接mergeできません");
  const consensus = evaluateConsensus({ kind: base.kind, affectedNodes: nodes.filter((n) => revision.affectedNodeIds.includes(n.id)), consents, rightsRestrictedFor: revision.patch.rightsRestrictedFor });
  if (!consensus.accepted) throw new Error(consensus.reason);
  const { constitutionalChanges: _a, rightsRestrictedFor: _b, sharesPrivateMonkuOf: _c, disablesSos: _d, removesProtectedVeto: _e, requiresAuditDeletion: _f, blocksExit: _g, automaticPhysicalRestriction: _h, ...safePatch } = revision.patch;
  void [_a, _b, _c, _d, _e, _f, _g, _h];
  return { ...base, ...safePatch, id: crypto.randomUUID(), version: revision.proposedVersion, status: "active", createdAt: new Date().toISOString() };
}

