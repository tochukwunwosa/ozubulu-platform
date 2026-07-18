# Changelog

All notable changes to the Ozubulu Digital Platform will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html) once a first public release is tagged.

## [Unreleased]

### Added

* Project `README.md` describing the vision, mission, guiding principles, Version 1 scope, technology stack, architecture, and repository structure.
* `CONTRIBUTING.md` summarizing how to contribute and linking to the full Contributor Guide.
* Core documentation set under `docs/`:
  * [Product Vision](docs/01-product-vision.md)
  * [Editorial Policy](docs/02-editorial-policy.md)
  * [Governance Charter](docs/03-governance-charter.md)
  * [Content Standards Guide](docs/04-content-standards.md)
  * [Contributor Guide](docs/05-contributor-guide.md)
  * [Information Architecture](docs/06-information-architecture.md)
  * [Content Model](docs/07-content-model.md)
  * [System Architecture](docs/08-system-architecture.md)
  * [Database Design](docs/09-database-design.md)
  * [Roadmap](docs/10-roadmap.md)
* Architecture Decision Records under `docs/architecture-decision-records/`:
  * ADR-001 — Documentation Before Implementation
  * ADR-002 — Use Next.js as the Frontend Framework
  * ADR-003 — Use Sanity as the Content Management System
  * ADR-004 — Separate Published Content from Operational Data
  * ADR-005 — Community Contributions Require Editorial Review
* Design Language & Design System under `docs/design-system-and-design-languge/`, with an index README and four parts: Foundation (colour, typography, spacing, layout), Components, Experience, and Slow Design Philosophy.
* MIT `LICENSE`.
* Week 1 Foundation Sprint — the platform's first running application, in a pnpm workspace under `apps/web`:
  * Next.js 16 (App Router) with TypeScript, Tailwind CSS v4, and ESLint.
  * Tailwind design tokens implementing the Ozubulu colour palette (Camwood, Uli Ink, Cassava Leaf, Palm Gold, Akpu Paper, Riverstone, and supporting colours) and the full type scale, typography hierarchy, line-height, and letter-spacing system from the Design Language doc.
  * Inter and Lora fonts loaded via `next/font`.
  * shadcn/ui component library: Button, Card, Badge, Sheet, Dropdown Menu, Navigation Menu, Input, Textarea, Form, Separator, and Skeleton.
  * Sanity Studio embedded at `/studio` and a Supabase client helper under `lib/`, both connected to live projects (Sanity project `Ozubulu Digital Archive`, dataset `production`; Supabase project on the free plan).
  * `.env.example` documenting the required Sanity and Supabase environment variables.
  * GitHub Actions CI workflow running lint, typecheck, and build on every push and pull request.
  * Prettier, Husky, and lint-staged to keep formatting and lint checks consistent on commit.
* First production deployment, live at [ozubulu-platform.vercel.app](https://ozubulu-platform.vercel.app/), connected via Vercel's GitHub integration (Root Directory `apps/web`, Framework Preset Next.js).
* Documented GitHub ruleset definitions under `.github/rulesets/`: a relaxed ruleset for `dev` (linear history, no force-push/deletion, no required PR) and a strict one for `main` (required PR, required `ci` status check, linear history).

### Fixed

* `@supabase/supabase-js` missing from `apps/web/package.json`/`pnpm-lock.yaml` after a race between two concurrent `pnpm add` invocations during the Week 1 sprint — passed locally (already present in `node_modules`) but failed Vercel's clean install. Re-added and verified with a frozen-lockfile install.

### Changed

* Moved the Slow Design Philosophy doc from `docs/11-slow-design.md` into `docs/design-system-and-design-languge/04-slow-design.md`, alongside the rest of the design system it underpins.
* Introduced **Ozubulu Digital Archive** as the public brand name, distinct from **Ozubulu Digital Platform** (the internal project name used throughout the codebase and documentation). Added the brand statement — "Preserving the history, heritage, and stories of Ozubulu for generations to come." — to the top of the README for consistent reuse across the website and social profiles.
* Renamed the Supabase env var from `NEXT_PUBLIC_SUPABASE_ANON_KEY` to `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, matching Supabase's newer API key naming (publishable/secret, replacing legacy anon/service_role).

[Unreleased]: https://github.com/tochukwunwosa/ozubulu-platform/commits/main

