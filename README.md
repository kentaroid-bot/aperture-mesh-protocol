# Aperture Mesh Protocol

Aperture Mesh is an open research proposal and experimental protocol framework for cooperation between sovereign nodes that do not need to share the same internal values, moral system, or governing OS.

The project asks a practical question:

> How far can governance move from controlling internal beliefs to negotiating verifiable boundaries, scoped capabilities, reversible enforcement, and real exit?

日本語を中心に設計・検証しています。英語版は今後のRevisionで追加予定です。

## Status

**Version:** `v0.1-concept`

This repository contains:

- a civilization-scale roadmap for a recursive Mesh of Meshes;
- a household experiment roadmap for embodied protocol literacy;
- a common protocol model covering contracts, tripwires, revision, exit, and capture resistance;
- a conceptual simulator;
- an experimental, local-first household PWA.

It is not a deployed governance system, legal framework, emergency service, or proven safety mechanism. Simulations in this repository are conceptual experiments using synthetic assumptions, not empirical proof of social or political outcomes.

## Core Idea

```text
Trust Minimization
+ Verifiable Boundaries
+ Limited Escrow
+ Independent Oracles
+ Reversible Tripwires
+ Protocol Constitution
+ Safe Exit
+ Alternative Routes
+ Continuous Revision
```

Trust, affection, and shared morality are welcome, but they are not required as protocol dependencies. The aim is to limit the damage caused by betrayal, failure, coercion, and incompatible internal systems.

The project does not define decentralization as replacing one platform operator with another:

> Replacing the ruler is not a revolution. Node sovereignty begins when rule-making, verification, custody, enforcement, appeal, and exit cannot be recomposed under one controller.

## Read First

1. [Project overview](docs/00-overview.md)
2. [Aperture Mesh Civilization Roadmap](docs/aperture-mesh-civilization-roadmap.md)
3. [Common protocol and simulation design](docs/p2p-aperture-simulation-design.md)
4. [Household experiment roadmap](docs/aperture-home-experiment-roadmap.md)
5. [Aperture Home implementation plan](docs/aperture-home-codex-implementation-plan.md)

## Repository Layout

```text
docs/                  protocol ideas, roadmaps, and implementation plans
simulator/             dependency-free conceptual simulator
apps/aperture-home/    experimental local-first household PWA
```

## Run the Simulator

Open [`simulator/index.html`](simulator/index.html) directly in a browser.

Run its deterministic transition test:

```bash
node simulator/aperture-p2p-simulator-v2.test.js
```

## Run Aperture Home

Requirements: Node.js 20 or later and npm 10 or later.

```bash
cd apps/aperture-home
npm ci
npm run dev
```

The app is local-first. Remote AI, cloud sync, telemetry, and external sending are disabled in the MVP.

Validation:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

See [Aperture Home README](apps/aperture-home/README.md) for data handling, known limitations, and the experimental safety boundary.

## Safety Boundary

The household MVP does not perform abuse detection, truth determination, automatic reporting, smart-lock control, financial punishment, location tracking, or irreversible sanctions.

Food, housing, medical care, education, basic communication, SOS access, and safe exit are not valid collateral.

The app must not delay contact with real emergency, medical, legal, or child-protection services.

## Open Questions

- How can independent Oracles be measured when organizations share funding, data, or infrastructure?
- How can an Exit right remain meaningful when alternative housing, payment, communication, or logistics do not exist?
- How can protocol roles remain replaceable without creating a new universal identity or settlement monopoly?
- Which invariants transfer across households, cooperatives, cities, and states, and which must remain scale-specific?
- How should protocol capture thresholds trigger suspension, migration, or Fork?

Criticism, counterexamples, alternative implementations, and adversarial scenarios are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## Relationship to MonkuAi

Aperture Mesh grew from the broader [MonkuAi](https://github.com/kentaroid-bot/Monku_Ai) research project. It is maintained as a separate repository so the protocol can be read, tested, criticized, and forked independently.

## License

- Software and code samples: Apache License 2.0
- Documentation and diagrams: Creative Commons Attribution 4.0 International

See [LICENSE.md](LICENSE.md).
