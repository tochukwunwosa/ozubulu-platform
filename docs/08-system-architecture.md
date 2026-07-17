# Ozubulu Digital Platform

# System Architecture

**Version:** 1.0

**Status:** Draft

---

# Purpose

This document describes the technical architecture of the Ozubulu Digital Platform.

It explains how the different parts of the system work together, how content flows from editors to visitors, and the architectural principles that guide technical decisions.

The goal is to build a platform that is scalable, maintainable, secure, and easy for future contributors to understand.

---

# Architecture Principles

The platform is designed around the following principles.

## Content First

The platform exists to preserve knowledge.

Technology serves the content—not the other way around.

---

## Simplicity

Choose the simplest solution that solves the problem well.

Avoid unnecessary complexity.

---

## Scalability

The platform should support hundreds or thousands of pages without requiring major architectural changes.

---

## Reliability

Historical information should remain available, accurate, and secure.

---

## Maintainability

Future developers should understand the system quickly.

Code should be modular, documented, and predictable.

---

## Performance

Pages should load quickly and remain accessible even on slower internet connections.

---

# High-Level Architecture

```text
                     Contributors
                           │
                           ▼
                    Sanity Studio
                           │
                           ▼
                      Sanity Content API
                           │
                           ▼
                    Next.js Application
                   (Server Components)
                           │
         ┌─────────────────┴──────────────────┐
         │                                    │
         ▼                                    ▼
   Static Rendering                   Dynamic Rendering
         │                                    │
         └─────────────────┬──────────────────┘
                           ▼
                        Vercel CDN
                           │
                           ▼
                         Visitors


Visitors
     │
     ▼
Correction Form
     │
     ▼
Supabase Database
     │
     ▼
Editor Review
```

---

# Core Technologies

## Frontend

**Framework**

Next.js (App Router)

### Why

* Server Components
* Static Site Generation
* Excellent SEO
* Image Optimization
* Streaming
* Long-term ecosystem support

---

## Language

TypeScript

### Why

* Type safety
* Better maintainability
* Easier collaboration
* Improved developer experience

---

## Styling

Tailwind CSS

### Why

* Consistent design system
* Fast development
* Easy maintenance
* Responsive by default

---

## UI Components

shadcn/ui

### Why

* Accessible
* Unstyled foundation
* Fully customizable
* No vendor lock-in

---

## Animations

Framer Motion

Used sparingly to enhance user experience without distracting from the content.

---

# Content Management

## Sanity CMS

Sanity is responsible for all published content.

Examples include:

* Communities
* Villages
* People
* Historical Articles
* Photographs
* Sources

Editors work in Sanity Studio.

Visitors never interact directly with Sanity.

---

# Operational Data

## Supabase

Supabase stores application data.

Examples include:

* Contact messages
* Feedback
* Correction requests
* Future user accounts
* Newsletter subscribers

Operational data is separated from published historical content.

---

# Hosting

## Vercel

The website is deployed on Vercel.

Responsibilities include:

* Global CDN
* Serverless Functions
* Preview Deployments
* Automatic Deployments
* Edge Network

---

# Data Flow

## Publishing Content

Editor

↓

Sanity Studio

↓

Sanity Content API

↓

Next.js

↓

Visitor

---

## Community Feedback

Visitor

↓

Correction Form

↓

Supabase

↓

Editor Review

↓

Sanity Update

↓

Website

No submission is published automatically.

---

# Rendering Strategy

Different pages require different rendering methods.

## Static Rendering (SSG)

Used for:

* Home
* About
* History
* Communities
* Villages
* Heritage
* Articles

These pages rarely change and benefit from maximum performance.

---

## Dynamic Rendering

Used for:

* Search
* Contact
* Feedback
* Future authenticated areas

---

# Search

Version 1 will implement basic search across published content.

Search should support:

* Communities
* Villages
* People
* Articles

Future versions may introduce advanced full-text search.

---

# Images

All images should be optimized before delivery.

Requirements:

* Responsive sizes
* Lazy loading
* Alt text
* Modern image formats where supported

Historical photographs should retain high-quality archival originals whenever possible.

---

# SEO

SEO is a core feature of the platform.

Every page should include:

* Title
* Description
* Open Graph Image
* Structured Metadata
* Canonical URL

Search engines should be able to discover every public page.

---

# Security

Version 1 follows the principle of least privilege.

Editors have publishing access.

Visitors have read-only access.

Correction submissions are reviewed before publication.

No visitor can directly modify published content.

---

# Monitoring

The platform should monitor:

* Uptime
* Performance
* Broken links
* Build failures

Future monitoring may include error tracking and analytics dashboards.

---

# Backups

Content should never exist in only one place.

The platform should maintain:

* Regular content exports
* Database backups
* Source control for code
* Documentation backups

Historical preservation requires long-term redundancy.

---

# Scalability

The architecture is designed for long-term growth.

Future additions may include:

* Interactive maps
* Oral history archive
* Schools
* Churches
* Business directory
* Mobile application
* Public API

The existing architecture should support these additions without major redesign.

---

# Architectural Decisions

Version 1 adopts the following principles:

* Documentation before implementation.
* Structured content over hardcoded pages.
* Separation of published content and operational data.
* Simplicity before complexity.
* Community contributions with editorial review.
* Accessibility and performance by default.

---

# Guiding Principle

The Ozubulu Digital Platform is more than a website.

It is a long-term digital archive for a living community.

Every architectural decision should support one goal:

**Preserve Ozubulu's history, serve its people, and remain maintainable for generations to come.**
