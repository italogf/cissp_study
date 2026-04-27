---
description: "Create or refine a Clay-inspired study screen for the CISSP ADHD/TDHA SaaS. Use for lesson views, active recall, progress UI, and low-overload hyperfocus-friendly study flows."
name: "Create Focus Study Screen"
argument-hint: "Describe the lesson goal, target locale, and the study interaction you want to build."
agent: "cissp-saas-orchestrator"
model: "GPT-5 (copilot)"
tools: [read, search, edit, execute]
---
Use [DESIGN.md](../../DESIGN.md), [AGENTS.md](../../AGENTS.md), and [clay-frontend.instructions.md](../instructions/clay-frontend.instructions.md) as the contract.

Task:
- Create or refine a study screen that helps ADHD/TDHA learners start quickly, stay engaged, and recover after interruption.
- Keep the Clay-inspired system, but tone it down for focused learning work.
- Prioritize active recall, worked examples, visible progress, and one clear next action.
- Avoid dashboard clutter, decorative overload, and multiple competing calls to action.
- Keep all copy and structure localization-ready for `pt-BR` and `en`.

Implementation target:
- Prefer editing `app/[locale]/study-preview/page.tsx`, `app/globals.css`, and shared components in `src/components/ui/`.

Validation:
- Run a narrow validation step after editing.