---
title: "Part 2 — CSS Foundations: Fonts, Tokens and Reset"
slug: responsive-navigation-part-2-css-foundations
description: Lay the CSS groundwork for the nav bar — import Poppins, adopt a font-size and spacing scale, define color design tokens with CSS custom properties, apply a universal reset, and build the reusable centered container.
author: Gonzalo Marcos
date: 2026-08-18
lang: en
category: web-development
tags:
  - css
  - custom-properties
  - design-tokens
  - css-reset
  - google-fonts
  - series
  - tutorial
  - english
stack:
  - css
series: Building a Responsive Navigation Bar
series_part: 2
type: tutorial
difficulty: beginner
read_time: 9
status: not validated
canonical_url: ""
---
![Not Validated](https://img.shields.io/badge/Status-Not_Validated-f1c40f) ![English](https://img.shields.io/badge/Lang-English-4a4a4a) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![Beginner](https://img.shields.io/badge/Level-Beginner-2ecc71) ![Tutorial](https://img.shields.io/badge/Type-Tutorial-8e44ad) ![Series](https://img.shields.io/badge/Series-Responsive_Navigation-16a085) ![Part 2](https://img.shields.io/badge/Part-2-16a085) ![9 min](https://img.shields.io/badge/Read_Time-9_min-lightgrey)

# Part 2 — CSS Foundations: Fonts, Tokens and Reset

With the HTML from [[Part 1 - Project Setup and HTML Structure]] in place, the page is a stack of unstyled links. Before styling any *specific* component, professional stylesheets lay down a **foundation**: a consistent font, a design system (color, type, and spacing scales), a reset that flattens the browser's inconsistent defaults, and a couple of reusable utility classes.

Getting this layer right early means every rule we write afterward is shorter, more predictable, and more consistent. Let's build `style.css` from the top.

> 🔗 **Series:** [[Responsive Navigation - Tutorial Index]] · **Previous:** [[Part 1 - Project Setup and HTML Structure]] · **Next:** [[Part 3 - Styling the Desktop Navigation]]

---

## Table of Contents

- [Step 1 — Import the Poppins font](#step-1--import-the-poppins-font)
- [Step 2 — Document the design system](#step-2--document-the-design-system)
- [Step 3 — Color tokens with CSS custom properties](#step-3--color-tokens-with-css-custom-properties)
- [Step 4 — The universal reset](#step-4--the-universal-reset)
- [Step 5 — Base element styles](#step-5--base-element-styles)
- [Step 6 — The container utility and header](#step-6--the-container-utility-and-header)
- [The full stylesheet so far](#the-full-stylesheet-so-far)
- [Key Takeaways](#key-takeaways)
- [References](#references)

---

## Step 1 — Import the Poppins font

Open `style.css`. The very first line pulls the *Poppins* typeface from Google Fonts:

```css
/* POPPINS */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
```

- **`@import url(...)`** fetches an external stylesheet — here Google's CSS that defines the `@font-face` rules for Poppins. It works without adding any tags to the HTML.
- The long query string requests every weight (`100`–`900`) in both upright (`0`) and italic (`1`) styles. That's comprehensive but heavy; a real site would request only the weights it uses (this project only needs `400` and `500`).
- **`&display=swap`** tells the browser to show a fallback font immediately and *swap* to Poppins once it loads, so text is never invisible while the font downloads.

> [!TIP]
> `@import` is the simplest way to load a font, but it's slightly slower than a `<link>` in the HTML `<head>` because the browser must download the CSS first, *then* discover the font. For this small demo the difference is negligible; for production, prefer a `<link rel="preconnect">` + `<link>` combo. See [[05_Colours and Fonts]].

## Step 2 — Document the design system

Next come two comment blocks. They don't *do* anything to the page — they're a **design system written down** so every value you pick later comes from a deliberate, consistent set instead of random numbers:

```css
/* FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
*/

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/
```

- The **font-size scale** is a fixed set of sizes to choose from. When we set a link to `18px` or the mobile menu to `24px` later, those numbers come from this list — not from eyeballing.
- The **spacing scale** does the same for padding, margins, and gaps: `16px`, `32px`, `48px` all appear on the scale, and that's why the nav uses exactly those values.

Why bother? **Consistency is what makes a design look intentional.** Ten slightly-different paddings (17px, 19px, 22px…) read as sloppy; three values from a scale read as designed. This particular scale comes from Jonas Schmedtmann's web-design framework and shows up across the other projects in this vault. See [[Web Design - White space]] and [[Web Design - Typography]].

> [!NOTE]
> These are comments, so they're purely a reference for *you*. A more advanced setup would turn them into real `--space-*` and `--font-*` custom properties. Here they stay as documentation to keep things simple.

## Step 3 — Color tokens with CSS custom properties

Now define the theme colors once, as **CSS custom properties** (a.k.a. CSS variables) on the `:root` selector:

```css
:root {
  --primary-color: #fc5d66;
  --secondary-color: #ffc05a;
  --light-color: #f9fafb;
  --dark-color: #272d35;
}
```

- **`:root`** is the highest-level selector (it matches the `<html>` element). Custom properties defined here are **inherited by every element on the page**, so they're available everywhere.
- The **`--name` syntax** declares a custom property. You read it back with `var(--name)`, e.g. `background-color: var(--primary-color)`.
- These are **design tokens**: name a color once, reuse it by meaning ("primary") rather than by value ("#fc5d66"). Change the hex here and the whole site updates. It also keeps your palette honest — you reach for `--secondary-color`, not a random new orange.

In this project: `--primary-color` (coral) is the header background, `--secondary-color` (amber) is the link hover color. `--light-color` and `--dark-color` are defined for completeness (a fuller site would use them for text and backgrounds). Read more in [[css-root-vars-explained]] and [[Web Design - Color]].

## Step 4 — The universal reset

Browsers ship with their own default margins, padding, and box model. Left alone, they cause subtle, maddening layout bugs. Flatten them with a **universal reset**:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
```

- **`*`** is the universal selector — it matches *every* element.
- **`margin: 0; padding: 0;`** zero out the default spacing (the `<body>`'s default margin, the `<ul>`'s default padding, etc.) so we start from a clean slate and add spacing back deliberately.
- **`box-sizing: border-box`** is the important one. By default (`content-box`), an element's `width` covers only its content — padding and border are *added on top*, so a `width: 200px` box with `20px` padding actually occupies `240px`. With `border-box`, padding and border are counted *inside* the declared width: `200px` stays `200px`. This single line eliminates the most common source of "why is my box too wide?" math errors.

> [!IMPORTANT]
> `box-sizing: border-box` on `*` is one of the highest-value lines in any stylesheet. It's the reason our `.nav-bar { padding: 16px 32px }` in Part 3 won't unexpectedly blow past its container's width. See [[06_The Box Model]].

## Step 5 — Base element styles

A few base rules set defaults for common elements:

```css
body {
    font-family: 'Poppins', sans-serif;
}

a {
    text-decoration: none;
}

ul {
    list-style: none;
}
```

- **`body { font-family: 'Poppins', sans-serif; }`** — applies Poppins to the whole document (all elements inherit it). The `sans-serif` after the comma is a **fallback**: if Poppins fails to load, the browser uses its default sans-serif font instead of something ugly.
- **`a { text-decoration: none; }`** removes the default underline from all links — we want clean nav links, not underlined ones.
- **`ul { list-style: none; }`** removes the default bullet points from lists. Our menus are lists semantically, but visually they should be plain rows/columns of links, not bulleted lists.

## Step 6 — The container utility and header

Finally, two reusable pieces. First, a **`.container`** utility that centers content and caps its width — recall from Part 1 that `<nav>` carries both `nav-bar` and `container` classes:

```css
/* Utility Classes */

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    background-color: var(--primary-color);
}
```

- **`.container`** does two jobs:
  - `max-width: 1200px` — the content never grows wider than 1200px, so on a big monitor the nav doesn't stretch edge-to-edge. Note it's `max-width`, **not** `width`: below 1200px the container is free to shrink to the screen, which is essential for responsiveness. (A hard `width: 1200px` would force a horizontal scrollbar on any narrower screen — see [[How to use Max Width to center a page]].)
  - `margin: 0 auto` — `0` top/bottom, `auto` left/right. `auto` horizontal margins on a block with a max-width split the leftover space equally, **centering** the container in the viewport.
- **`.header { background-color: var(--primary-color); }`** paints the whole header bar coral, using our token. Because `<header>` is a full-width block, the color spans the entire viewport width, while the `.container` inside keeps the *content* centered at ≤1200px. That's the classic "full-bleed background, centered content" pattern.

## The full stylesheet so far

```css
/* POPPINS */
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

/* FONT SIZE SYSTEM (px)
10 / 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 44 / 52 / 62 / 74 / 86 / 98
*/

/*
SPACING SYSTEM (px)
2 / 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96 / 128
*/

:root {
  --primary-color: #fc5d66;
  --secondary-color: #ffc05a;
  --light-color: #f9fafb;
  --dark-color: #272d35;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Poppins', sans-serif;
}

a {
    text-decoration: none;
}

ul {
    list-style: none;
}

/* Utility Classes */

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.header {
    background-color: var(--primary-color);
}
```

Save and reload. The change is subtle but real: the font is now Poppins, the bullets and underlines are gone, and a **coral band** stretches across the top behind your (still stacked) links. The layout is still vertical because we haven't told anything to be a flex row yet — that's Part 3.

## Key Takeaways

- **Load your font first**, with a sensible fallback and `display=swap` so text is never invisible.
- **Write your scales down.** A fixed type scale and spacing scale are what make a design feel consistent instead of arbitrary.
- **Custom properties on `:root`** are design tokens: define a color once, use it by meaning everywhere, re-theme in one edit.
- **The universal reset** — especially `box-sizing: border-box` — removes whole categories of layout bugs before they happen.
- **`max-width` + `margin: 0 auto`** is the canonical centered, responsive container. Use `max-width`, never a fixed `width`.

> ➡️ **Next up:** [[Part 3 - Styling the Desktop Navigation]] — we turn the coral band into a real nav bar: logo on the left, links on the right, using Flexbox, with hover states in our accent color.

---

## References

- MDN — [Using CSS custom properties (variables)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties "How to declare and consume CSS variables")[^mdn-vars]
- MDN — [`box-sizing`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing "How box-sizing changes the box model")[^mdn-bs]
- Google Fonts — [Poppins](https://fonts.google.com/specimen/Poppins "The Poppins typeface on Google Fonts")[^gf]

> [!NOTE]
> Built from the project's `style.css`, with the design-system scales matching this vault's [[Web Design Framework]] notes.

[^mdn-vars]: MDN Web Docs — declaring custom properties and reading them with `var()`.
[^mdn-bs]: MDN Web Docs — `box-sizing` and the difference between `content-box` and `border-box`.
[^gf]: Google Fonts — the Poppins specimen and embed options.
