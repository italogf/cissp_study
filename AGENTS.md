# CISSP Learning SaaS Guidelines

This workspace exists to build a multilingual SaaS study platform for CISSP candidates with ADHD/TDHA. Every task must improve learning depth, retention, and momentum without increasing cognitive overload.

## Product Priorities
- Design for ADHD/TDHA first: short focusable units, one clear next action, visible progress, low-friction recovery after interruption, and optional stimulation without clutter.
- Trigger hyperfocus/hiperfoco safely: tight feedback loops, meaningful challenge, immersive study flow, and minimal context switching.
- Go deep on every CISSP domain: concept layers, worked examples, scenario-based practice, and mastery checkpoints.
- Keep the content system generic enough to support future certifications and training catalogs beyond CISSP.

## Technical Direction
- Use a TypeScript-first stack and prefer `pnpm` workspaces for consistency.
- Default to a modular monolith first: `Next.js` for the product shell, `PostgreSQL` plus `Prisma` for core data, and background jobs only when there is a measured need.
- Keep infrastructure simple and portable: one primary deployable app, a managed database, managed object storage, and managed observability.
- Treat multilingual support as first-class from day one: all user-facing copy and content metadata must be localization-ready.
- Favor accessible, mobile-friendly UX and product analytics from the first meaningful release.

## Visual Direction
- For all UI, frontend, design, and product surface decisions, follow `DESIGN.md` as the default visual system.
- The design language is Clay-inspired: organic shapes, soft gradients, warm surfaces, strong typography, and art-directed layouts.
- Adapt that visual language for ADHD/TDHA learners by keeping study flows calmer, clearer, and less visually noisy than marketing surfaces.
- Encode design tokens in the implementation so the system stays reusable across CISSP now and other training products later.

## Delivery Rules
- For every plan or implementation, explicitly check ADHD usability, CISSP depth, multilingual coverage, and future extensibility.
- For any UI work, explicitly check alignment with `DESIGN.md`.
- Prefer small vertical slices that can be validated end to end over broad scaffolding with no user value.
- Security, privacy, accessibility, billing safety, and observability are mandatory for production milestones.
- Use the custom orchestrator and specialist agents in `.github/agents/` for multi-stage work.