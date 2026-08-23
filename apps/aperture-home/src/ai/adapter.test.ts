import { describe, expect, it } from "vitest";
import { DisabledRemoteAdapter } from "./adapter";
import { convertWithLocalTemplate } from "./local-template";
import { inspectPatch } from "../domain/constitution";

describe("AI boundary", () => {
  it("is disabled and never sends by default", async () => { const adapter = new DisabledRemoteAdapter(); expect(adapter.enabled).toBe(false); expect(adapter.sendsExternally).toBe(false); await expect(adapter.suggest({ redactedText: "", approvedFields: [] })).rejects.toThrow(/無効/); });
  it("local conversion remains a draft-shaped patch", () => expect(inspectPatch(convertWithLocalTemplate("もっと静かにして").proposedPatch, "template").ok).toBe(true));
});
