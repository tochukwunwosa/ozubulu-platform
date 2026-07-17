# ADR-004: Separate Published Content from Operational Data

**Status:** Accepted

## Context

Historical content and application workflows have different responsibilities and lifecycles.

## Decision

Store published content in Sanity and operational data in Supabase.

## Rationale

Separating these concerns simplifies the architecture, improves maintainability, and allows each system to focus on its strengths.

## Consequences

Historical content remains independent of application workflows, while operational features such as feedback and correction requests can evolve without affecting published content.
