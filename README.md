# Ozubulu Digital Archive

[![Release](https://img.shields.io/github/v/release/tochukwunwosa/ozubulu-platform?include_prereleases)](https://github.com/tochukwunwosa/ozubulu-platform/releases)
[![License: MIT](https://img.shields.io/github/license/tochukwunwosa/ozubulu-platform)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![CI](https://github.com/tochukwunwosa/ozubulu-platform/actions/workflows/ci.yml/badge.svg)](https://github.com/tochukwunwosa/ozubulu-platform/actions/workflows/ci.yml)
[![Vercel](https://img.shields.io/github/deployments/tochukwunwosa/ozubulu-platform/production?label=vercel&logo=vercel&logoColor=white)](https://ozubulu-platform.vercel.app/)

> Preserving the history, heritage, and stories of Ozubulu for generations to come.

**Project Name:** Ozubulu Digital Platform
**Public Brand:** Ozubulu Digital Archive

The Ozubulu Digital Archive is a community-driven initiative dedicated to preserving, documenting, and sharing the history, culture, institutions, people, and heritage of Ozubulu for current and future generations.

This repository contains the source code, documentation, and supporting infrastructure for the platform — referred to internally as the **Ozubulu Digital Platform**.

Our mission is to build the most trusted digital resource about Ozubulu by combining verified historical research, community contributions, and modern web technologies.

---

## Vision

To become the definitive digital home of Ozubulu—a place where anyone, anywhere in the world can discover our history, understand our culture, celebrate our achievements, and contribute to preserving our collective heritage.

---

## Mission

The Ozubulu Digital Platform exists to:

* Preserve the history of Ozubulu through verified research.
* Document our culture, traditions, and identity.
* Celebrate the people and institutions that have shaped our community.
* Create a trusted digital archive for future generations.
* Encourage community participation while maintaining high editorial standards.

---

## Guiding Principles

Our work is guided by five core principles:

* **Truth** – Every published claim should be supported by reliable evidence whenever possible.
* **Respect** – We honour the dignity, traditions, and diversity of the Ozubulu community.
* **Community** – This platform belongs to the people of Ozubulu and welcomes responsible contributions.
* **Quality** – Accuracy is more important than speed.
* **Preservation** – We are building a lasting historical record, not simply another website.

---

## Version 1 Scope

The first public release focuses on building a strong foundation.

### Core Sections

* Home
* Discover Ozubulu
* History
* Communities
* Villages
* Heritage & Culture
* Notable People
* Historical Articles
* Gallery
* Support the Project
* Contact

Future releases will introduce additional features such as schools, churches, businesses, festivals, interactive maps, oral history archives, and development projects. See the [Roadmap](docs/10-roadmap.md) for details.

---

## Technology Stack

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion

### Content Management

* Sanity CMS

### Database & Backend Services

* Supabase

### Hosting

* Vercel

See [System Architecture](docs/08-system-architecture.md) for how these pieces fit together.

---

## Architecture

The platform separates **published content** from **operational data**.

### Sanity CMS

Sanity stores:

* Communities
* Villages
* People
* Historical Articles
* Photographs
* Sources

### Supabase

Supabase stores:

* Contact messages
* Feedback submissions
* Correction requests
* Newsletter subscribers
* Future authentication
* Future contributor workflow

For the full breakdown, see [System Architecture](docs/08-system-architecture.md), [Database Design](docs/09-database-design.md), and the [Content Model](docs/07-content-model.md). This split is a deliberate architectural decision — see [ADR-004](docs/architecture-decision-records/ADR-004-separate-content-and-operational-data.md).

---

## Repository Structure

```text
.
├── apps/
│   └── web/
│
├── docs/
│   ├── 01-product-vision.md
│   ├── 02-editorial-policy.md
│   ├── 03-governance-charter.md
│   ├── 04-content-standards.md
│   ├── 05-contributor-guide.md
│   ├── 06-information-architecture.md
│   ├── 07-content-model.md
│   ├── 08-system-architecture.md
│   ├── 09-database-design.md
│   ├── 10-roadmap.md
│   ├── architecture-decision-records/
│   │   ├── README.md
│   │   ├── ADR-001-documentation-before-implementation.md
│   │   ├── ADR-002-nextjs-frontend-framework.md
│   │   ├── ADR-003-sanity-as-cms.md
│   │   ├── ADR-004-separate-content-and-operational-data.md
│   │   └── ADR-005-editorial-review-for-contributions.md
│   └── design-system-and-design-languge/
│       ├── README.md
│       ├── 01-foundation-design-language.md
│       ├── 02-components-design-system.md
│       ├── 03-experience-design-system.md
│       └── 04-slow-design.md
│
├── apps/
├── packages/
├── .github/
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
└── LICENSE
```

---

## Documentation

The project is documentation-first.

Every major architectural, editorial, and technical decision should be documented before implementation.

Key documents include:

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
* [Architecture Decision Records (ADRs)](docs/architecture-decision-records/README.md)
* [Design Language & Design System](docs/design-system-and-design-languge/README.md) (includes the [Slow Design Philosophy](docs/design-system-and-design-languge/04-slow-design.md))

---

## Contributing

Community contributions are welcome.

You can contribute by:

* Correcting historical information
* Sharing stories
* Donating photographs
* Providing historical documents
* Reporting errors
* Suggesting improvements

All contributions are reviewed before publication in accordance with the [Editorial Policy](docs/02-editorial-policy.md). See the [Contributor Guide](docs/05-contributor-guide.md) and [Content Standards Guide](docs/04-content-standards.md) for details on how to contribute and how content should be written.

---

## Editorial Standards

Accuracy is more important than speed.

Historical claims should be supported by reliable sources whenever possible.

When information cannot be fully verified, the platform will clearly indicate its verification status rather than present uncertainty as fact.

The platform values transparency over speculation.

See the [Editorial Policy](docs/02-editorial-policy.md) and [Content Standards Guide](docs/04-content-standards.md) for the full standards.

---

## Current Sprint

### Sprint 1 — Foundation

**Milestone:** Phase 2 — Website Foundation

**Status:** In progress

#### Progress

* ✅ Documentation
* 🚧 Project Setup
* ⏳ Homepage
* ⏳ CMS

See the [Roadmap](docs/10-roadmap.md) for how this sprint fits into the wider release plan.

---

## Roadmap

### Phase 1

* Documentation
* System architecture
* Design system
* Content model

### Phase 2

* Website foundation
* Sanity CMS
* Public pages
* Search
* SEO

### Phase 3

* Content population
* Historical research
* Community engagement

### Phase 4

* Public launch

### Phase 5

* Continuous improvement
* New content
* Additional features
* Community partnerships

See the full [Roadmap](docs/10-roadmap.md) for more detail.

---

## License

The source code for this project is licensed under the MIT License unless otherwise stated.

Historical content, photographs, documents, and other cultural materials may be subject to separate licensing or usage restrictions to ensure proper attribution and respectful preservation.

---

## Maintainer

**Nwosa Tochukwu Chinemelu**

Founder and Editor-in-Chief

See the [Governance Charter](docs/03-governance-charter.md) for how the platform is governed.

---

## Acknowledgements

This project would not be possible without the support of the people of Ozubulu, community leaders, elders, historians, volunteers, contributors, and members of the Ozubulu diaspora who are committed to preserving our shared heritage.

Every contribution, no matter how small, helps preserve the story of our community for future generations.

---

> *"A community that preserves its history preserves its identity."*
