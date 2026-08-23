# Contributing

Aperture Mesh is an early research proposal. Contributions that identify failure modes are as valuable as implementations.

## Useful Contributions

- counterexamples to protocol assumptions;
- formal invariants and property-based tests;
- Protocol Capture scenarios;
- alternative Oracle, appeal, escrow, and Exit designs;
- critiques from safety, law, economics, political theory, distributed systems, and lived experience;
- accessibility, privacy, and coercive-control reviews;
- careful translations that preserve uncertainty and scope.

## Ground Rules

- Do not include real family disputes, Monku, SOS records, personal data, or identifying case details.
- Use synthetic scenarios for tests and simulations.
- Do not claim that simulation results prove safety, fairness, deterrence, or political effectiveness.
- Do not add automated punishment, reporting, physical access control, or essential-needs collateral to the household MVP.
- Keep AI in proposal and review roles. AI must not merge revisions, determine guilt, or execute sanctions.
- State assumptions, evidence limits, and unresolved risks directly.

## Development

```bash
cd apps/aperture-home
npm ci
npm run lint
npm run typecheck
npm test
npm run build
```

The conceptual simulator test runs without dependencies:

```bash
node simulator/aperture-p2p-simulator-v2.test.js
```

Open an issue before a large architectural change. A proposal that changes the Protocol Constitution must explain why the change cannot reduce Node safety, consent, privacy, replaceability, or Exit.
