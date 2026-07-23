# Content Model

*Ozubulu Digital Platform*

## Purpose

The Content Model defines the information that powers the Ozubulu Digital Platform. The platform is built around structured content, not individual web pages. A page is simply a presentation of one or more content types. This approach allows information to be reused, connected, searched, and expanded without duplication.

The Content Model is designed to preserve the history, culture, institutions, and people of Ozubulu for generations to come.

## Guiding Principles

### Every Important Thing is an Entity

Anything that deserves its own page should have its own content type. Examples include:

* Town
* Community
* Village
* Traditional Institution
* Person
* Historical Article
* Photograph
* Source

### Content Exists Once

Information should only exist once. One photograph may appear on many pages. One person may be referenced by multiple villages or historical articles. One historical source may support many different pieces of content. This keeps information accurate and easy to maintain.

### Everything is Connected

Content should never exist in isolation. Communities connect to Villages. Villages connect to People. Articles connect to Sources. Photographs connect to multiple entities. Every connection helps visitors discover more about Ozubulu.

### Truth Must Be Visible

Historical certainty varies. Every historical record must clearly indicate its level of verification. Visitors should always understand the confidence behind the information they are reading.

### Build for Today. Design for Tomorrow.

The Content Model describes the long-term vision. Version 1 implements only what is required for launch. Future content types will be added without changing the existing structure.

## Platform Responsibilities

The Ozubulu Digital Platform uses two systems.

### Sanity CMS

Sanity stores published content. It is responsible for:

* Town
* Communities
* Villages
* Traditional Institutions
* People
* Historical Articles
* Photographs
* Sources

Sanity is the single source of truth for all published content.

### Supabase

Supabase stores operational data. It is responsible for:

* Feedback submissions
* Correction requests
* Contact messages
* Newsletter subscribers
* Future contributor accounts
* Future authentication
* Future editorial workflow

Operational data supports the platform. Historical content lives in Sanity.

## Version 1 Content Types

The following entities will be implemented for Version 1.

## Town

Represents Ozubulu itself -- the root entity above Community. Added 2026-07-23, after real content (a town-wide origin story, geography, and history sourced from a physical book) turned up with nowhere else to live. Deliberately kept lean: it describes what Ozubulu *is* (identity, at-a-glance facts, and links out to the Communities/Traditional Institutions that make it up), while the full narrative content lives in Historical Articles rather than being duplicated here. This also means the model scales cleanly if the platform ever documents a second town.

**Fields**

* Name
* Igbo Name (optional)
* Slug
* Overview
* Historical Summary (short introduction only -- 2-3 paragraphs; full narratives belong in a Historical Article)
* Geography Summary (short summary only -- a full write-up belongs in a Historical Article)
* Communities
* Traditional Institutions
* Featured Articles (curated Historical Articles to surface, e.g. Origin of Ozubulu)
* Featured Image
* Gallery
* Sources
* Verification Status
* Research Status
* Last Updated

**Relationships**

A Town references many:

* Communities
* Traditional Institutions
* Historical Articles (via Featured Articles)
* Photographs

For Version 1, there is exactly one Town document (Ozubulu).

## Community

Represents one of the recognised communities within Ozubulu. Examples include:

* Amakwa
* Egbema
* Eziora
* Nza

**Fields**

* Name
* Slug
* Description
* History
* Featured Image
* Gallery
* Sources
* Verification Status
* Last Updated

**Relationships**

A Community may contain many:

* Villages
* Traditional Institutions
* Historical Articles
* Photographs

## Village

Represents a village within Ozubulu. Every village should eventually have its own dedicated page.

**Fields**

* Name
* Igbo Name (optional)
* Slug
* Meaning of Name
* Community
* History
* Geography
* Boundaries
* Featured Image
* Gallery
* Sources
* Verification Status
* Last Updated

**Relationships**

A Village belongs to one Community. A Village may reference:

* Traditional Institution
* People
* Historical Articles
* Photographs
* Sources

**Implementation Note**

Before making the Community field mandatory, historical records should confirm that every village belongs to a recognised community without dispute. If legitimate historical uncertainty exists, the relationship may remain optional until resolved.

## Traditional Institution

Represents a traditional ruling or cultural institution connected to Ozubulu — for example, a monarchy, chieftaincy, or council of elders. The Traditional Institution is treated as a first-class entity rather than an article because it carries structured relationships (leadership, offices, affiliated villages) that prose alone cannot represent cleanly.

**Fields**

* Name
* Slug
* Overview
* History
* Leadership
* Communities
* Villages
* Featured Image
* Gallery
* Sources
* Verification Status
* Last Updated

**Relationships**

A Traditional Institution may reference:

* Communities
* Villages
* People (titleholders, leadership)
* Historical Articles
* Photographs
* Sources

**Implementation Note**

Keep Version 1 minimal: Leadership can be a simple reference list to Person profiles (with a title/role label) rather than a fully modelled office/succession system. Offices, symbols, and ceremonial events can be layered on in a later version once real content surfaces what structure is actually needed.

## Person

Represents an individual connected to Ozubulu. Examples include:

* Traditional Rulers
* Community Leaders
* Educators
* Medical Professionals
* Entrepreneurs
* Public Servants
* Artists
* Athletes

**Fields**

* Full Name
* Igbo Name (optional)
* Photograph
* Biography
* Occupation
* Community
* Village
* Traditional Institution (optional, with Title/Role)
* Living Status
* Consent Obtained
* Visibility
* Sources
* Verification Status

**Living Status**

* Living
* Deceased
* Unknown

**Visibility**

* Public
* Restricted
* Private

**Living Persons Policy**

The platform respects the privacy and dignity of living individuals. If a person is marked as Living:

* Consent Obtained must be Yes before the profile may be published publicly.
* Without consent, the profile must remain Restricted or Private.
* Sensitive personal information must never be published without permission.

Historical profiles of deceased persons may be published where supported by reliable evidence and the [Editorial Policy](02-editorial-policy.md).

## Historical Article

Represents long-form historical content. Examples include:

* History of Ozubulu
* Origins of Egbema
* Traditional Leadership
* Education in Ozubulu

**Fields**

* Title
* Slug
* Summary
* Body
* Featured Image
* Verification Status
* Published Date
* Last Updated

**Related Entities**

Version 1 articles may reference:

* Community
* Village
* Traditional Institution
* Person
* Photograph
* Source

Restricting references keeps editorial workflows simple while allowing meaningful cross-linking.

## Photograph

Represents a single photograph. Each photograph is uploaded once and reused wherever appropriate.

**Fields**

* Title
* Description
* Photographer
* Contributor
* Date Taken
* Location
* Copyright
* Alt Text

**Related Entities**

A photograph may be linked to:

* Community
* Village
* Traditional Institution
* Person
* Historical Article

## Source

Every important historical claim should be supported by one or more Sources whenever possible.

**Fields**

* Title
* Author
* Source Type
* Publisher
* Year
* Pages
* Archive Location
* Contributor
* Notes

**Source Types**

* Book
* Interview
* Government Record
* Church Record
* School Record
* Newspaper
* Academic Research
* Personal Archive
* Oral Tradition
* Website

One Source may support many Communities, Villages, People, and Historical Articles.

## Verification Status

Historical entities include a Verification Status. Available values are:

* Verified
* Multiple Sources
* Single Source
* Oral Tradition
* Under Review
* Disputed

The purpose of Verification Status is to communicate the confidence level of published information. Historical uncertainty should never be hidden.

## Verification Authority

Verification Status is an editorial decision. Contributors may submit evidence, corrections, photographs, and historical information. They may recommend changes. They may not assign or change the Verification Status of published content.

For Version 1, only the Editor-in-Chief (Nwosa Tochukwu Chinemelu) may approve or modify Verification Status. Future editorial teams may delegate this responsibility to authorised editors.

## Future Content Types

The following entities are part of the long-term vision but are not included in Version 1.

* School
* Church
* Festival
* Event
* Business
* Landmark
* Historical Document
* Video
* Community Organisation
* Development Project
* Tourism Location
* Scholarship
* Oral History Recording
* Family Lineage

These entities will be introduced when they provide clear value to the community.

## URL Structure

Each content type has its own route namespace. Examples:

* `/communities/[slug]`
* `/villages/[slug]`
* `/institutions/[slug]`
* `/people/[slug]`
* `/articles/[slug]`

This prevents URL conflicts and keeps the platform consistent.

## Multilingual Support

The platform is designed to support both English and Igbo. Where appropriate, entities may include:

* English Name
* Igbo Name
* English Description
* Igbo Description

Version 1 will primarily publish content in English while preparing the platform for future bilingual expansion.

## Scalability

The Content Model is designed to evolve without disrupting existing content. New content types should integrate naturally into the existing relationship model. The structure should remain stable as the platform grows from hundreds to thousands of pages.

## Guiding Principle

Content is the most valuable asset of the Ozubulu Digital Platform. Technology will evolve. Frameworks will change. Designs will be refreshed. But carefully researched, well-structured, and trustworthy content can preserve the story of Ozubulu for generations.

Every modelling decision should answer one question:

> "Will this help preserve and connect the story of Ozubulu?"
