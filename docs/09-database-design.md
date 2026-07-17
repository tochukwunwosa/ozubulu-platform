# Ozubulu Digital Platform

# Database Design

**Version:** 1.0

**Status:** Draft

---

# Purpose

This document defines how data is stored, organised, and managed within the Ozubulu Digital Platform.

The platform separates **published content** from **operational data**.

Published content is managed through **Sanity CMS**.

Operational and application data is managed through **Supabase**.

This separation keeps the architecture clean, maintainable, and scalable.

---

# Database Principles

The database follows these principles.

## Single Source of Truth

Every piece of information should exist in one place only.

Duplicate data should be avoided.

---

## Relationships Over Duplication

Content should reference related content instead of copying it.

For example:

A Photograph should be uploaded once and referenced by multiple Villages or Articles.

---

## Human-Readable Structure

Schema names, field names, and relationships should be easy to understand.

---

## Extensible Design

New entities should be added without redesigning the database.

---

## Data Integrity

Relationships should be validated.

Broken references should never be published.

---

# Data Ownership

| System         | Responsibility    |
| -------------- | ----------------- |
| **Sanity CMS** | Published content |
| **Supabase**   | Operational data  |

---

# Sanity Document Types (Version 1)

Version 1 will implement the following document types.

## Community

Represents one of the recognised communities within Ozubulu.

### Key Fields

* name
* slug
* description
* history
* featuredImage
* verificationStatus
* sources[]
* gallery[]
* updatedAt

### References

Community references:

* Villages
* Historical Articles
* Photographs

---

## Village

### Key Fields

* name
* igboName
* slug
* meaning
* community
* history
* geography
* boundaries
* featuredImage
* verificationStatus
* sources[]
* updatedAt

### References

Village references:

* Community
* People
* Historical Articles
* Photographs
* Sources

---

## Person

### Key Fields

* fullName
* igboName
* slug
* biography
* occupation
* village
* community
* livingStatus
* consentObtained
* visibility
* photograph
* verificationStatus
* sources[]

### Validation Rules

* Living persons require consent before public publication.
* Visibility must respect the Editorial Policy.
* Verification Status is editor-controlled.

---

## Historical Article

### Key Fields

* title
* slug
* summary
* body
* featuredImage
* verificationStatus
* publishedAt
* updatedAt

### References

May reference:

* Community
* Village
* Person
* Photograph
* Source

---

## Photograph

### Key Fields

* title
* description
* photographer
* contributor
* dateTaken
* location
* copyright
* altText

### References

May reference:

* Community
* Village
* Person
* Historical Article

---

## Source

### Key Fields

* title
* author
* sourceType
* publisher
* publicationYear
* pageNumbers
* archiveLocation
* contributor
* notes

### Source Types

* Book
* Interview
* Government Record
* Church Record
* School Record
* Newspaper
* Academic Research
* Personal Archive
* Oral Tradition

---

# Shared Metadata

Every Sanity document should include common metadata.

### Standard Fields

* _id
* _type
* createdAt
* updatedAt
* createdBy
* lastReviewed
* verificationStatus

These fields improve consistency across the platform.

---

# Slug Strategy

Every public document requires a unique slug.

Examples:

```text
/communities/egbema
/villages/nnukwu-egbema
/people/john-doe
/articles/history-of-ozubulu
```

Routes are namespaced by content type to avoid collisions.

---

# Asset Management

Images are stored in Sanity Assets.

Each image should include:

* Alt text
* Copyright information
* Photographer
* Contributor
* Date
* Related entities

Large historical images should retain an archival-quality original.

---

# Supabase Schema

Supabase stores operational data only.

---

## feedback_submissions

Stores community feedback.

Fields:

* id
* name (optional)
* email (optional)
* message
* pageUrl
* createdAt
* status

Status:

* Pending
* Reviewed
* Closed

---

## correction_requests

Stores historical corrections.

Fields:

* id
* entityType
* entityId
* proposedCorrection
* supportingEvidence
* submitterName
* submitterEmail
* createdAt
* status

Status:

* Pending
* Under Review
* Accepted
* Rejected

Accepted corrections are manually reflected in Sanity after editorial review.

---

## contact_messages

Stores enquiries from visitors.

Fields:

* id
* name
* email
* subject
* message
* createdAt
* status

---

## newsletter_subscribers

Stores email subscriptions.

Fields:

* id
* email
* subscribedAt
* active

---

# Naming Conventions

Use consistent naming throughout the platform.

Tables:

snake_case

Examples:

* feedback_submissions
* correction_requests

Sanity fields:

camelCase

Examples:

* featuredImage
* verificationStatus

React components:

PascalCase

Examples:

* VillageCard
* PersonProfile
* HeroSection

---

# Validation Rules

The platform enforces validation wherever possible.

Examples:

* Required fields for core entities.
* Unique slugs within each content type.
* Valid references only.
* Consent required for living persons.
* Verification Status editable only by authorised editors.

---

# Indexing Strategy

Version 1 should index commonly queried fields.

Examples:

* slug
* name
* title
* verificationStatus
* publicationYear

Efficient indexing supports search and future scalability.

---

# Future Database Expansion

Future schema additions may include:

* Schools
* Churches
* Businesses
* Festivals
* Events
* Landmarks
* Historical Documents
* Videos
* Oral Histories
* Community Organisations

These additions should integrate with the existing relationship model without breaking existing data.

---

# Migration Strategy

Schema changes should be backwards compatible whenever possible.

Breaking changes should be documented and accompanied by migration scripts.

Historical data should never be lost during migrations.

---

# Guiding Principle

The database is not simply a place to store information.

It is the foundation of a permanent digital archive.

Every schema, relationship, and validation rule should contribute to one goal:

**Preserving the history of Ozubulu with accuracy, consistency, and integrity for generations to come.**
