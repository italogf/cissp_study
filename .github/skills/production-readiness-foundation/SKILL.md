---
name: production-readiness-foundation
description: "Ship a learning SaaS from zero to production with security, CI/CD, testing, observability, privacy, accessibility, backups, reliability, and operational simplicity. Use for release criteria, deployment pipelines, and go-live readiness."
---

# Production Readiness Foundation

## When to Use
- Planning an initial deployment
- Defining go-live criteria
- Adding release automation and environment strategy
- Reviewing operational, security, privacy, and resilience gaps

## Minimum Production Baseline
- Environment separation for local, preview, staging, and production
- Secret management outside the codebase
- Automated migrations with rollback awareness
- Structured application logging
- Error tracking and uptime monitoring
- Backup and restore plan for learner data and billing-critical records
- Rate limiting and abuse protection on auth and exercise endpoints

## CI/CD Expectations
- Install, lint, typecheck, test, and build on every pull request
- Run end-to-end checks on critical learner paths
- Promote artifacts through predictable environments
- Keep release notes and schema changes visible

## Security and Trust
- Protect auth flows, session handling, and administrative actions
- Treat payment and subscription changes as auditable events
- Minimize personally identifiable information and define retention rules
- Validate localization, accessibility, and privacy before launch

## Operational Simplicity
- Prefer managed database, managed storage, managed observability, and one primary app deployment
- Add queue or cache only for a measured bottleneck
- Keep incident response steps short and documented

## Go-Live Checklist
- Critical paths are covered by automated tests
- Monitoring and alerts exist for auth, billing, content delivery, and study session failures
- Backups are tested, not just configured
- Accessibility review covers the core study loop
- Localization review covers at least one secondary locale end to end
- Rollback steps are written and rehearsed