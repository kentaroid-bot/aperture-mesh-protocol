import { z } from "zod";
import type { ContractPatch } from "../domain/types";

export const revisionSuggestionSchema = z.object({
  ambiguities: z.array(z.string()),
  proposedPatch: z.record(z.unknown()),
  safetyFlags: z.array(z.string()),
  sourceDisclosure: z.enum(["private-monku", "shared-event", "manual-input"])
});
export type RevisionSuggestion = z.infer<typeof revisionSuggestionSchema> & { proposedPatch: ContractPatch };

export interface AiAdapter { readonly enabled: boolean; readonly sendsExternally: boolean; suggest(input: { redactedText: string; approvedFields: string[] }): Promise<RevisionSuggestion>; }

export class DisabledRemoteAdapter implements AiAdapter {
  readonly enabled = false; readonly sendsExternally = false;
  async suggest(_input: { redactedText: string; approvedFields: string[] }): Promise<RevisionSuggestion> { void _input; throw new Error("リモートAIは無効です。データは送信されませんでした。"); }
}
