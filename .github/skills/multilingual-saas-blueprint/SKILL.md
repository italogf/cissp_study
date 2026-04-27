---
name: multilingual-saas-blueprint
description: "Create a modern multilingual SaaS with a simple production-ready architecture. Use for TypeScript stack decisions, modular monolith design, Next.js, PostgreSQL, Prisma, auth, billing, localization, analytics, and future expansion beyond CISSP."
---

# Multilingual SaaS Blueprint

## When to Use
- Designing the baseline platform architecture
- Choosing implementation patterns for rapid but clean delivery
- Keeping multilingual support first-class
- Avoiding premature microservices while staying production-ready

## Default Stack
- Language: TypeScript end to end
- Package management: `pnpm` workspace
- App shell: `Next.js` with App Router
- Data: `PostgreSQL` with `Prisma`
- Validation: `Zod`
- Auth: `Auth.js` or another managed provider when enterprise requirements appear
- Billing: `Stripe` or region-appropriate equivalent behind a clean billing module
- Localization: key-based translation plus locale-aware routing and content metadata
- Testing: `Vitest` for unit and integration, `Playwright` for end-to-end

## Frontend Visual System
- Treat `DESIGN.md` as the source of truth for UI direction.
- Implement the Clay-inspired tokens as theme variables so marketing pages and study surfaces share a coherent design language.
- Keep study interfaces visually calmer than landing pages while still using the same underlying system.
- Build reusable primitives for buttons, cards, forms, progress, and layout shells around that token set.

## Architecture Bias
- Start as a modular monolith with clear feature boundaries.
- Separate platform capabilities by module, not by deployment unit.
- Keep domain entities generic enough to support multiple certification catalogs.
- Use eventing only where async work is real: email, reminders, heavy imports, analytics aggregation.

## Core Domain Building Blocks
- `training_program`
- `domain`
- `module`
- `lesson`
- `exercise`
- `exercise_attempt`
- `study_session`
- `mastery_snapshot`
- `subscription`
- `user_locale`

## Multilingual Rules
- Never hard-code user-facing strings.
- Keep content language, source version, and translation status as explicit metadata.
- Design URLs, slugs, and SEO metadata to be locale-aware.
- Make analytics and support tooling locale-aware too.

## Simplicity Rules
- One primary deployable app first.
- One managed database first.
- Introduce queue, cache, search, or separate services only after measured need.
- Prefer managed infrastructure and infrastructure as code once the deployment target is chosen.

## Evolution Path
- Add more certifications by inserting new `training_program` records and content trees.
- Keep exercise engines and mastery logic reusable across catalogs.
- Split services only when independent scale, compliance, or team ownership becomes real.