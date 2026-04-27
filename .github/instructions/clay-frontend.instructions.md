---
description: "Use when writing Next.js, React, TSX, or CSS for the CISSP frontend, landing pages, study screens, or shared UI components. Enforces DESIGN.md, Clay-inspired tokens, and ADHD-friendly focus-first restraint."
applyTo: ["app/**/*.tsx", "app/**/*.css", "src/**/*.tsx", "src/**/*.css"]
---
# Clay Frontend Rules

- Read [DESIGN.md](../../DESIGN.md) before changing user-facing UI.
- Keep Clay-inspired visuals, but make study surfaces calmer than marketing surfaces.
- Use the theme tokens in `app/globals.css` instead of ad hoc colors, radii, or shadows.
- Prefer large, confident headings and warm surfaces over generic SaaS patterns.
- Keep one primary action per focused study state.
- Use motion only for affordance. Avoid continuous animation in study flows.
- Maintain multilingual resilience: text must expand without breaking hierarchy or spacing.
- Preserve strong contrast, visible focus states, and simple recovery paths after interruption.
