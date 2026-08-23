# Security Policy

## Scope

The current security-sensitive component is the experimental local-first application in `apps/aperture-home`.

Relevant reports include:

- private Monku or Safety data disclosure;
- authentication or member-isolation bypass;
- encryption or export weaknesses;
- Capability Lease surviving expiry or revocation;
- Constitution checks that can be bypassed;
- external network transmission not disclosed by the UI;
- dependency or PWA behavior that exposes household data.

## Reporting

Prefer GitHub private vulnerability reporting when it is available for this repository. Do not place real household data, secrets, exploit details, or identifying information in a public issue.

For a non-sensitive design concern, open a normal issue and mark whether it affects confidentiality, consent, Constitution enforcement, Exit, or Protocol Capture.

## Limitations

This experimental web application cannot protect against an operating-system administrator, an unlocked shared device, physical coercion, a compromised browser, or forced disclosure. It is not an emergency, medical, legal, or child-protection service.
