---
description: "Create or refine a Clay-inspired landing page for the CISSP ADHD/TDHA SaaS. Use for hero, domain overview, product positioning, and conversion-focused multilingual landing work."
name: "Create Clay Landing Page"
argument-hint: "Describe the landing goal, target locale, and desired conversion action."
agent: "cissp-saas-orchestrator"
model: "GPT-5 (copilot)"
tools: [read, search, edit, execute]
---
Use [DESIGN.md](../../DESIGN.md), [AGENTS.md](../../AGENTS.md), and [clay-frontend.instructions.md](../instructions/clay-frontend.instructions.md) as the contract.

Task:
- Create or refine the multilingual landing page for the CISSP study SaaS.
- Preserve the Clay-inspired language: warm canvas, editorial composition, rounded surfaces, and tactile cards.
- Keep the page ADHD-friendly: one dominant CTA above the fold, low clutter, clear hierarchy, and visible momentum.
- Show real CISSP depth instead of generic marketing claims.
- Reuse or extend shared UI primitives before adding one-off styles.
- Keep copy localization-ready for `pt-BR` and `en`.

Implementation target:
- Prefer editing `app/[locale]/page.tsx`, `app/globals.css`, and shared components in `src/components/ui/`.

Validation:
- Run a narrow validation step after editing.
