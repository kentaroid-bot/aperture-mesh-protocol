import type { RevisionSuggestion } from "./adapter";

export function convertWithLocalTemplate(text: string): RevisionSuggestion {
  const deadline = /(?:まで|期限|時|日)/.test(text);
  const boundary = /(?:入ら|触ら|連絡|静か|距離)/.test(text);
  return {
    ambiguities: [!deadline && "期限が明示されていません", !boundary && "境界または停止条件が明示されていません"].filter(Boolean) as string[],
    proposedPatch: { boundaries: boundary ? ["本人が指定した境界を確認する"] : ["中断を希望したら停止する"], stopConditions: ["当事者のいずれかが再交渉を希望したとき"] },
    safetyFlags: [], sourceDisclosure: "private-monku"
  };
}

