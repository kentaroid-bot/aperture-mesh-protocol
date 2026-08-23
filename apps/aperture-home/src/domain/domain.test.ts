import { describe, expect, it } from "vitest";
import { inspectLease, inspectPatch, PROTOCOL_CONSTITUTION } from "./constitution";
import { canSafetySubjectSelfRelease, evaluateConsensus, majority } from "./consensus";
import { leaseState, renewLease } from "./safety";
import { cooldownState, createCooldown } from "./cooldown";
import { appendAudit, verifyAuditChain } from "./audit";
import type { Consent, MemberNode } from "./types";

const nodes = (count: number): MemberNode[] => Array.from({ length: count }, (_, index) => ({ id: `n${index + 1}`, householdId: "h1", displayName: `Node-${String(index + 1).padStart(2, "0")}`, role: index === 0 ? "protected" : "adult", active: true }));
const consent = (ids: string[], decision: Consent["decision"] = "approve"): Consent[] => ids.map((memberId) => ({ revisionId: "r1", memberId, decision, decidedAt: new Date().toISOString() }));

describe("Protocol Constitution", () => {
  it("keeps all twelve immutable clauses", () => expect(PROTOCOL_CONSTITUTION).toHaveLength(12));
  it("rejects disabling SOS", () => expect(inspectPatch({ disablesSos: true }, "member").ok).toBe(false));
  it("rejects removing protected veto", () => expect(inspectPatch({ removesProtectedVeto: true }, "member").ok).toBe(false));
  it("rejects private Monku sharing without owner consent", () => expect(inspectPatch({ sharesPrivateMonkuOf: ["n2"] }, "member").ok).toBe(false));
  it("rejects AI activation/merge-like state changes", () => expect(inspectPatch({ status: "active" }, "ai").ok).toBe(false));
  it("rejects leases without TTL", () => expect(inspectLease({ scope: ["safety-check"], purpose: "check" }).ok).toBe(false));
});

describe("consensus", () => {
  it.each([[2, 2], [3, 2], [4, 3], [5, 3], [8, 5]])("majority(%i) = %i", (count, required) => expect(majority(count)).toBe(required));
  it("keeps abstentions in denominator", () => expect(evaluateConsensus({ kind: "shared-resource", affectedNodes: nodes(4), consents: consent(["n1", "n2"]) }).accepted).toBe(false));
  it("requires all parties for bilateral contracts", () => expect(evaluateConsensus({ kind: "bilateral", affectedNodes: nodes(2), consents: consent(["n1"]) }).accepted).toBe(false));
  it("does not shrink rights without owner consent", () => expect(evaluateConsensus({ kind: "shared-resource", affectedNodes: nodes(3), consents: consent(["n1", "n2"]), rightsRestrictedFor: ["n3"] }).accepted).toBe(false));
  it("does not let a safety subject self-release", () => expect(canSafetySubjectSelfRelease("n1", ["n1"], "n2")).toBe(false));
});

describe("TTL and exit", () => {
  it("expires a lease offline and never revives it", () => expect(leaseState({ id: "l1", incidentId: "i1", grantee: "local", scope: ["safety-check"], purpose: "check", issuedAt: "2026-01-01T00:00:00Z", expiresAt: "2026-01-01T00:05:00Z" }, new Date("2026-01-01T00:06:00Z"))).toBe("expired"));
  it("requires review after clock rollback", () => expect(leaseState({ id: "l1", incidentId: "i1", grantee: "local", scope: ["safety-check"], purpose: "check", issuedAt: "2026-01-01T00:00:00Z", expiresAt: "2027-01-01T00:00:00Z" }, new Date("2026-01-01T00:00:00Z"), "2026-01-02T00:00:00Z")).toBe("review-required"));
  it("rejects automatic renewal", () => expect(() => renewLease()).toThrow(/自動更新/));
  it("does not force reconnection after cooldown", () => { const session = createCooldown({ initiatedBy: "n1", targetConnectionIds: ["n2"], allowedChannels: ["sos"], durationMinutes: 5 }, new Date("2026-01-01T00:00:00Z")); expect(cooldownState(session, new Date("2026-01-01T00:06:00Z"))).toBe("decision-required"); });
});

describe("audit chain", () => {
  it("detects tampering and refuses secret content", async () => {
    const first = await appendAudit([], { actorId: "n1", action: "contract-created", resourceType: "contract", resourceId: "c1" });
    expect(await verifyAuditChain([first])).toBe(true);
    expect(await verifyAuditChain([{ ...first, action: "changed" }])).toBe(false);
    await expect(appendAudit([], { actorId: "n1", action: "monku-body-saved", resourceType: "note", resourceId: "x" })).rejects.toThrow(/秘密本文/);
  });
});
