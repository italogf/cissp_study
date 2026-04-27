# Clay-Inspired Design System for the CISSP ADHD SaaS

This workspace uses a Clay-inspired visual system based on the Design MD reference at `https://getdesign.md/clay/design-md`.

Use this file as the default UI direction for all product, design, and frontend work.

## Design Intent
- Organic, editorial, and premium rather than generic SaaS.
- Soft gradients, rounded geometry, warm surfaces, and bold composition.
- Immersive enough to support hyperfocus, but disciplined enough to avoid cognitive overload.
- Playful in motion and form, serious in information hierarchy.

## Product-Specific Adaptation
- Keep the Clay visual language, but tune it for ADHD/TDHA learners.
- Favor calm, readable layouts over decorative density.
- Use one primary action per state.
- Use color and motion to guide focus, not to compete for attention.
- Keep study screens simpler than marketing screens.

## Visual Principles
1. Warm canvas, high-contrast content.
2. Organic shapes and soft gradients as identity anchors.
3. Art-directed composition with clear hierarchy.
4. Large, confident typography with strong sectioning.
5. Card-based information clusters with generous spacing.
6. Motion with intention: subtle rotation, lift, and hard-shadow hover states only where they help affordance.

## Color Direction
- Background: Warm Cream `#faf9f7`
- Primary text: Clay Black `#000000`
- Elevated surfaces: Pure White `#ffffff`
- Secondary text: Warm Silver `#9f9b93`
- Tertiary text: Warm Charcoal `#55534e`
- Border: Oat `#dad4c8`
- Border subtle: Oat Light `#eee9df`

### Accent Palette
- Matcha 300 `#84e7a5`
- Matcha 600 `#078a52`
- Matcha 800 `#02492a`
- Slushie 500 `#3bd3fd`
- Lemon 500 `#fbbd41`
- Ube 300 `#c1b0ff`
- Ube 800 `#43089f`
- Pomegranate 400 `#fc7981`
- Blueberry 800 `#01418d`

## Typography Direction
- Preferred primary family: Roobert or the closest available neo-grotesk alternative.
- Preferred mono family: Space Mono or the closest equivalent for code or structured snippets.
- Large display typography is encouraged for hero areas and domain landing screens.
- Body text must remain highly readable, with comfortable line height and moderate line length.

## Type Scale
- Hero display: `80px`, `600`, line-height `1.00`, letter-spacing `-3.2px`
- Secondary display: `60px`, `600`, line-height `1.00`, letter-spacing `-2.4px`
- Section heading: `44px`, `600`, line-height `1.10`, letter-spacing `-1.32px`
- Card heading: `32px`, `600`, line-height `1.10`, letter-spacing `-0.64px`
- Feature title: `20px`, `600`, line-height `1.40`, letter-spacing `-0.4px`
- Body: `18px`, `400`, line-height `1.60`, letter-spacing `-0.36px`
- Button: `16px`, `500`, line-height `1.50`, letter-spacing `-0.16px`
- Caption: `14px`, `400`, line-height `1.50`
- Label: `12px`, `600`, uppercase, letter-spacing `1.08px`

## Layout Rules
- Use asymmetric, art-directed sections for landing and discovery pages.
- Use cleaner, denser but still spacious grids for active learning screens.
- Keep the main study path visually linear.
- Preserve strong whitespace around lesson goals, progress, and recall actions.
- Prefer scrollable narratives over dashboard clutter for learning journeys.

## Component Rules
- Buttons: solid dark primary, white card secondary, ghost outlined tertiary.
- Cards: rounded, layered, and tactile; use dashed borders only for secondary informational blocks.
- Forms: strong focus ring, clear error ring, large enough targets for low-friction interaction.
- Progress UI: visually prominent but simple.
- Navigation: reduce options during focused study states.

## Spacing, Radius, and Depth
- Spacing scale: `2`, `4`, `8`, `12`, `16`, `20`, `24`
- Radius scale: inputs `4px`, small cards `8px`, buttons `12px`, feature cards `24px`, section pills `40px`
- Elevation: warm flat canvas at rest, layered cards for emphasis, hard offset shadows on hover where useful

## Motion Rules
- Use short, confident transitions.
- Prefer subtle `rotateZ`, lift, and shadow changes on hover or press for interactive affordance.
- Avoid continuous animation during study sessions.
- Reduce motion automatically on dense learning screens or when accessibility settings require it.

## Accessibility and ADHD Rules
- Maintain strong contrast even with gradients and soft surfaces.
- Do not rely on color alone for meaning.
- Keep decorative layers behind the content plane.
- Never let background treatments reduce text readability.
- Limit simultaneous emphasis effects on one screen.
- The more cognitively demanding the task, the more restrained the UI should become.

## Implementation Expectations
- Encode these tokens as CSS variables or theme tokens.
- Keep visual primitives reusable across marketing, onboarding, and study product surfaces.
- Localize all text cleanly without breaking rhythm or hierarchy.
- When unsure, choose clarity first and decoration second.