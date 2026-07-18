# Ozubulu Digital Platform

# Design Language & Design System

**Version:** 1.0

**Status:** Draft

---

# Purpose

The Design Language & Design System defines the visual identity, interaction patterns, and user interface standards for the Ozubulu Digital Platform.

Its purpose is to create a consistent, accessible, and timeless experience that reflects the history, dignity, and cultural identity of Ozubulu.

This document serves as the single source of truth for all design decisions across the platform.

---

# Design Philosophy

The Ozubulu Digital Platform is not designed to look like a startup, a news website, or a government portal.

It is designed to feel like a trusted digital archive and a welcoming community home.

Visitors should feel that they are entering a place of history, knowledge, and belonging.

The interface should quietly support the content, never compete with it.

Every design decision should reinforce four qualities:

* Trust
* Heritage
* Warmth
* Clarity

---

# Design Principles

## Content Comes First

The platform exists to preserve and present knowledge.

Visual design should guide visitors toward the content rather than distract from it.

Photography, typography, and whitespace should work together to improve readability and understanding.

---

## Calm, Not Loud

The interface should be understated and timeless.

Avoid unnecessary decoration, excessive animation, or visual clutter.

The goal is confidence, not attention.

---

## Familiar and Accessible

Navigation, layouts, and interactions should feel intuitive to visitors of all ages and technical abilities.

The platform should remain usable on desktops, tablets, and mobile devices.

Accessibility is a core requirement, not an optional enhancement.

---

## Consistency

Colours, typography, spacing, and components should behave consistently throughout the platform.

Consistency builds familiarity and trust.

---

## Longevity

The design should remain relevant for many years.

Avoid visual trends that may quickly become outdated.

Choose simplicity over novelty.

---

# Brand Personality

The Ozubulu Digital Platform should be perceived as:

* Trustworthy
* Respectful
* Welcoming
* Educational
* Community-focused
* Authentic
* Timeless

It should never feel:

* Flashy
* Corporate
* Overly commercial
* Sensational
* Distracting

---

# Colour System

The colour palette is inspired by the natural environment, traditional materials, and cultural identity of southeastern Nigeria.

It uses warm earth tones, muted greens, and soft neutrals to create a calm and welcoming atmosphere.

## Primary Palette

| Name             | Hex       | Purpose                               |
| ---------------- | --------- | ------------------------------------- |
| **Uli Ink**      | `#1B2436` | Headings, primary text, dark sections |
| **Camwood**      | `#9C4B32` | Brand accent, buttons, links          |
| **Cassava Leaf** | `#3D5C3E` | Active states, success, verification  |
| **Palm Gold**    | `#C79A3D` | Highlights, metadata, icons           |
| **Akpu Paper**   | `#F1EDE0` | Main page background                  |
| **Riverstone**   | `#6B6B63` | Secondary text and captions           |

---

## Supporting Colours

| Name                | Hex       | Purpose                                   |
| ------------------- | --------- | ----------------------------------------- |
| **Linen White**     | `#FAF8F2` | Cards and content surfaces                |
| **Soft Clay**       | `#D7CFC2` | Borders and dividers                      |
| **Mist Grey**       | `#E8E4DC` | Disabled states and subtle backgrounds    |
| **Forest Shade**    | `#2F4632` | Hover states and dark green accents       |
| **Bronze Heritage** | `#8B6A3E` | Historical timelines and archive elements |

---

# Colour Usage

The colour palette should be applied with restraint.

* **Akpu Paper** is the primary reading background.
* **Uli Ink** is the default colour for headings and body text.
* **Camwood** identifies primary actions and important links.
* **Cassava Leaf** communicates positive actions, active navigation, and verified content.
* **Palm Gold** highlights historical significance and key metadata.
* **Riverstone** is reserved for supporting information such as captions, dates, and secondary text.

No single accent colour should dominate the interface.

Balance creates harmony.

---

# Typography

Typography should prioritise readability over decoration.

The platform should feel like reading a well-produced book or journal.

## Primary Typeface

**Inter**

Used for:

* Body text
* Navigation
* Forms
* Interface elements

Reasons:

* Excellent readability
* Wide language support
* Optimised for screens
* Modern without being fashionable

---

## Secondary Typeface

**Lora**

Used sparingly for:

* Historical quotations
* Editorial introductions
* Feature headings
* Long-form storytelling

Its subtle serif style introduces a sense of heritage without making the interface feel old-fashioned.

---

## Type Scale

| Element         |    Size |
| --------------- | ------: |
| Hero Title      | 56–72px |
| Page Title      | 40–48px |
| Section Heading |    32px |
| Subheading      |    24px |
| Body Large      |    20px |
| Body            |    18px |
| Small Text      |    16px |
| Caption         |    14px |

Line length should generally remain between **60 and 75 characters** for comfortable reading.

---

# Spacing System

The platform uses an **8-point spacing system**.

Standard spacing values include:

```text
4
8
16
24
32
48
64
80
96
128
```

Whitespace is considered a design element.

Content should have room to breathe.

---

# Layout Grid

The platform uses a responsive 12-column grid.

### Maximum Content Width

**1280px**

### Reading Width

Approximately **720–760px** for long-form articles.

### Standard Section Padding

Desktop:

* 96px top
* 96px bottom

Tablet:

* 64px

Mobile:

* 48px

Long-form historical articles should use narrower reading widths than landing pages.

---

# Responsive Design

The platform is designed for all modern screen sizes.

| Breakpoint    |   Width |
| ------------- | ------: |
| Mobile        | 0–639px |
| Small Tablet  |  640px+ |
| Tablet        |  768px+ |
| Laptop        | 1024px+ |
| Desktop       | 1280px+ |
| Large Desktop | 1536px+ |

Layouts should adapt gracefully without hiding important content.

---

# Typography

Typography should prioritise readability over decoration.

The platform should feel like reading a well-produced book, journal, or historical archive.

Every typographic decision should make long-form reading comfortable while reinforcing the identity of the Ozubulu Digital Archive.

---

## Typeface Selection

### Primary Typeface — Inter

Inter is the primary typeface used throughout the platform.

**Used for:**

* Body text
* Navigation
* Buttons
* Forms
* Metadata
* Tables
* User interface elements

**Reasons:**

* Excellent readability on digital screens
* Optimised for user interfaces
* Neutral and unobtrusive
* Wide language support
* Comfortable for readers of all ages

---

### Secondary Typeface — Lora

Lora is the secondary typeface used to introduce warmth, heritage, and elegance.

It should be used sparingly to create emphasis rather than throughout the interface.

**Used for:**

* Hero headings
* Page titles
* Historical article titles
* Feature section headings
* Editorial introductions
* Pull quotes
* Important quotations

**Reasons:**

* Elegant serif with a literary character
* Reflects history and heritage
* Pairs naturally with Inter
* Reinforces the identity of a trusted digital archive

---

# Typography Hierarchy

| Element         | Typeface | Weight |
| --------------- | -------- | -----: |
| Hero Heading    | Lora     |    700 |
| Page Title      | Lora     |    700 |
| Section Heading | Lora     |    600 |
| Subheading      | Inter    |    600 |
| Body Text       | Inter    |    400 |
| Navigation      | Inter    |    500 |
| Buttons         | Inter    |    600 |
| Form Labels     | Inter    |    500 |
| Metadata        | Inter    |    400 |
| Captions        | Inter    |    400 |
| Tables          | Inter    |    400 |

---

# Type Scale

The platform follows a consistent, responsive type scale.

| Token      |            Size |
| ---------- | --------------: |
| Display    |     4rem (64px) |
| H1         |     3rem (48px) |
| H2         |  2.25rem (36px) |
| H3         | 1.875rem (30px) |
| H4         |   1.5rem (24px) |
| H5         |  1.25rem (20px) |
| Body Large | 1.125rem (18px) |
| Body       |     1rem (16px) |
| Small      | 0.875rem (14px) |
| Caption    |  0.75rem (12px) |

The scale should adapt responsively across mobile, tablet, and desktop devices while maintaining visual hierarchy.

---

# Line Height

Comfortable reading is essential for historical and educational content.

| Element   | Line Height |
| --------- | ----------: |
| Headings  |         1.2 |
| Body Text |         1.7 |
| Captions  |         1.5 |

The generous line height for body text improves readability during long reading sessions.

---

# Letter Spacing

Typography should remain clean and balanced.

| Element                | Letter Spacing |
| ----------------------- | --------------: |
| Hero Heading           |        -0.03em |
| Page Title             |        -0.02em |
| Body Text              |         Normal |
| Buttons                |        +0.01em |
| Small Uppercase Labels |        +0.08em |

Letter spacing should be subtle and never compromise readability.

---

# Responsive Typography

Typography should scale gracefully across devices.

* **Mobile:** Display typography scales down to approximately H2.
* **Tablet:** Display typography scales down to approximately H1.
* **Desktop:** Full typography scale is used.

The goal is to preserve hierarchy without overwhelming smaller screens.

---

# Accessibility

Typography should remain readable for every visitor.

The platform should follow these standards:

* Minimum body text size of **16px**
* Comfortable reading width of **60–75 characters**
* Avoid long headings written entirely in uppercase
* Maintain sufficient colour contrast between text and background
* Use semantic heading levels throughout the interface

Accessibility is a design requirement, not an enhancement.

---

# Guiding Principle

Typography should never compete with the stories it presents.

Its purpose is to make reading effortless, create visual rhythm, and allow the history, culture, and people of Ozubulu to remain the centre of attention.

---

# Guiding Principle

Good design should feel effortless.

Visitors should remember the stories they discovered—not the interface they used.

Every colour, font, and layout decision should quietly support the preservation and celebration of Ozubulu's history, culture, and people.
