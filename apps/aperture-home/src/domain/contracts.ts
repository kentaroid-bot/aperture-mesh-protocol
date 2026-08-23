import type { ContractStatus, ContractVersion } from "./types";

const transitions: Record<ContractStatus, ContractStatus[]> = {
  draft: ["proposed", "ended"], proposed: ["active", "draft", "ended"], active: ["limited", "ended"], limited: ["active", "ended"], ended: []
};

export function transitionContract(contract: ContractVersion, next: ContractStatus): ContractVersion {
  if (!transitions[contract.status].includes(next)) throw new Error(`${contract.status} から ${next} へは遷移できません`);
  return { ...contract, id: crypto.randomUUID(), version: contract.version + 1, status: next, createdAt: new Date().toISOString() };
}

