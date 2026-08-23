import type { CooldownSession } from "./types";

export function createCooldown(input: Omit<CooldownSession, "id" | "startsAt" | "expiresAt"> & { durationMinutes: number }, now = new Date()): CooldownSession {
  const { durationMinutes, ...rest } = input;
  if (durationMinutes < 5 || durationMinutes > 24 * 60) throw new Error("期間は5分から24時間で指定してください");
  return { ...rest, id: crypto.randomUUID(), startsAt: now.toISOString(), expiresAt: new Date(now.getTime() + durationMinutes * 60_000).toISOString() };
}

export function cooldownState(session: CooldownSession, now = new Date()): "active" | "decision-required" | "closed" {
  if (session.outcome) return "closed";
  return now.getTime() >= new Date(session.expiresAt).getTime() ? "decision-required" : "active";
}

export function closeCooldown(session: CooldownSession, outcome: NonNullable<CooldownSession["outcome"]>): CooldownSession {
  return { ...session, outcome };
}

