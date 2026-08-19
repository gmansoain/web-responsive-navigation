---
title: "Part 3 — Styling the Desktop Navigation"
slug: responsive-navigation-part-3-desktop-navigation
description: Turn the plain header into a real desktop nav bar using Flexbox — logo left, links right, evenly spaced, with accent-colored hover states — and hide the mobile menu until it's needed.
author: Gonzalo Marcos
date: 2026-08-18
lang: en
category: web-development
tags:
  - css
  - flexbox
  - navigation
  - hover
  - series
  - tutorial
  - english
stack:
  - css
series: Building a Responsive Navigation Bar
series_part: 3
type: tutorial
difficulty: beginner
read_time: 8
status: not validated
canonical_url: ""
---
![Not Validated](https://img.shields.io/badge/Status-Not_Validated-f1c40f) ![English](https://img.shields.io/badge/Lang-English-4a4a4a) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![Beginner](https://img.shields.io/badge/Level-Beginner-2ecc71) ![Tutorial](https://img.shields.io/badge/Type-Tutorial-8e44ad) ![Series](https://img.shields.io/badge/Series-Responsive_Navigation-16a085) ![Part 3](https://img.shields.io/badge/Part-3-16a085) ![8 min](https://img.shields.io/badge/Read_Time-8_min-lightgrey)

# Part 3 — Styling the Desktop Navigation

We have a coral header with two stacked menus inside it. In this part we shape the **desktop** version: logo pinned to the left, the link row pushed to the right, everything vertically centered, with links that glow amber on hover. The whole layout rides on **Flexbox** — the right tool any time you need to arrange items along a single line.

We'll also hide the mobile menu for now, so we can focus. It comes back to life in [[Part 4 - The Mobile Menu and Responsive Behavior]].

> 🔗 **Series:** [[Responsive Navigation - Tutorial Index]] · **Previous:** [[Part 2 - CSS Foundations - Fonts, Tokens and Reset]] · **Next:** [[Part 4 - The Mobile Menu and Responsive Behavior]]

---

## Table of Contents

- [Flexbox in 60 seconds](#flexbox-in-60-seconds)
- [Step 1 — Lay out the nav bar](#step-1--lay-out-the-nav-bar)
- [Step 2 — Size the logo](#step-2--size-the-logo)
- [Step 3 — Style the links](#step-3--style-the-links)
- [Step 4 — Space the link row](#step-4--space-the-link-row)
- [Step 5 — Hide the mobile menu (for now)](#step-5--hide-the-mobile-menu-for-now)
- [Step 6 — The social icons](#step-6--the-social-icons)
- [The full stylesheet so far](#the-full-stylesheet-so-far)
- [Key Takeaways](#key-takeaways)
- [References](#references)

---

## Flexbox in 60 seconds

Set `display: flex` on an element and it becomes a **flex container**; its direct children become **flex items** laid out along a line. Flex has two axes:

- **Main axis** — horizontal by default. `justify-content` positions items along it.
- **Cross axis** — perpendicular (vertical by default). `align-items` positions items along it.

| You want to… | On the flex container, set… |
|:---|:---|
| Push items to opposite ends | `justify-content: space-between` |
| Center items horizontally | `justify-content: center` |
| Vertically center items | `align-items: center` |
| Add even gaps between items | `gap: 32px` |
| Stack vertically instead of in a row | `flex-direction: column` |

That's every flex property this project uses. If you want the deeper version, see [[07_Layout with Flexbox]].

## Step 1 — Lay out the nav bar

Add this below the foundations from Part 2:

```css
/* Desktop Navigation */
.nav-bar {
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}
```

Each line, and why it's there:

- **`padding: 16px 32px`** — `16px` top/bottom, `32px` left/right (both from our spacing scale). This gives the bar height and keeps the logo and links off the very edges.
- **`display: flex`** — turns the nav into a flex row. Its three direct children — the logo `<a>`, `.desktop-menu`, and `.mobile-menu` — now sit on one horizontal line instead of stacking.
- **`justify-content: space-between`** — pushes the first child (logo) to the far left and the last visible child to the far right, with all leftover space in between. This is what puts the logo and the menu on opposite ends.
- **`align-items: center`** — vertically centers the children within the bar's height, so the logo and the text line up on a shared middle line.
- **`position: relative`** — this one looks pointless *now* (it doesn't move anything), but it's doing quiet, important setup work. It makes `.nav-bar` the **positioning context** for the mobile menu panel, which uses `position: absolute` in Part 4. Absolute children anchor to their nearest *positioned* ancestor; `position: relative` here makes the nav bar that ancestor.

> [!IMPORTANT]
> `position: relative` on a parent with no offsets is a common, deliberate idiom: *"I'm not moving, but I'm declaring myself the anchor for my absolutely-positioned descendants."* Remember it — it's why the mobile dropdown in Part 4 aligns to the header instead of the whole page. See [[position-fixed-vs-absolute-explained]].

## Step 2 — Size the logo

The raw SVG logo is far too big. Constrain it:

```css
.nav-bar img {
    width: 100px;
}
```

- **`width: 100px`** sets the logo's rendered width; the SVG scales its height proportionally to keep its aspect ratio. `100px` sits comfortably against the `16px` vertical padding.

## Step 3 — Style the links

Now the links themselves:

```css
.nav-bar a {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
}

.nav-bar a:hover {
    color: var(--secondary-color);
}
```

- **`color: #fff`** — white text reads cleanly on the coral background.
- **`font-size: 18px`** — straight off our type scale from Part 2.
- **`font-weight: 500`** — a medium weight (one of the Poppins weights we imported); a touch bolder than normal for presence without shouting.
- **`.nav-bar a:hover`** — the `:hover` pseudo-class applies only while the pointer is over a link. It switches the color to `--secondary-color` (amber), giving instant visual feedback that the link is interactive. Reusing the token keeps the accent consistent everywhere.

## Step 4 — Space the link row

The links are still a vertical list because the `<ul>` hasn't been told to be a row. Fix that:

```css
.desktop-menu-items {
    display: flex;
    gap: 32px;
}
```

- **`display: flex`** — turns the `<ul>` into its own flex row, so the `<li>`s line up horizontally.
- **`gap: 32px`** — puts an even `32px` (spacing scale) between each item. `gap` is the modern, clean way to space flex/grid children — no more `margin-right` on every item except the last.

So we have **two nested flex containers**: `.nav-bar` (arranges logo vs. menu) and `.desktop-menu-items` (arranges the individual links). Nesting flex like this is completely normal and is how most real layouts are built.

## Step 5 — Hide the mobile menu (for now)

Both menus are still visible, which is why you currently see the links twice plus a stray hamburger. Hide the mobile block:

```css
.mobile-menu {
    display: none;
}
```

- **`display: none`** removes the element entirely — it takes up no space and isn't rendered at all. On desktop we simply don't want it.

In [[Part 4 - The Mobile Menu and Responsive Behavior]] we'll *flip* this: a media query will hide `.desktop-menu` and reveal `.mobile-menu` once the screen drops to 768px or narrower. Right now we're building the desktop-first view, so hiding mobile is exactly right.

## Step 6 — The social icons

The Facebook and Twitter icons need a little polish. Add:

```css
.menu-icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: #fff;
}

.menu-icon:hover {
    color: var(--secondary-color);
}
```

- **`cursor: pointer`** — shows the hand cursor on hover, signaling "clickable" (the surrounding `<a>` is the real link, but this makes the icon itself feel interactive).
- **`color: #fff`** — Font Awesome icons are fonts, so their `color` is set like text: white, matching the links.
- **`:hover` → `--secondary-color`** — same amber hover as the text links, for consistency.

> [!NOTE]
> The `width: 24px; height: 24px` here have little visible effect: a Font Awesome glyph is sized by **`font-size`**, not `width`/`height`, because it's rendered as a font character (or an inline SVG that scales with font-size). These properties are harmless but essentially inert on the `<i>`. If you want bigger icons, set `font-size: 24px` instead. We'll leave the original values as-is and note the fix in [[Part 6 - Testing, Accessibility and Next Steps]].

## The full stylesheet so far

Appended to Part 2's foundations, the desktop section now reads:

```css
/* Desktop Navigation */
.nav-bar {
    padding: 16px 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.nav-bar img {
    width: 100px;
}

.nav-bar a {
    color: #fff;
    font-size: 18px;
    font-weight: 500;
}

.nav-bar a:hover {
    color: var(--secondary-color);
}

.desktop-menu-items {
    display: flex;
    gap: 32px;
}

.mobile-menu {
    display: none;
}

.menu-icon {
    cursor: pointer;
    width: 24px;
    height: 24px;
    color: #fff;
}

.menu-icon:hover {
    color: var(--secondary-color);
}
```

Save and reload on a **wide** browser window. You should now see a proper nav bar: the logo on the left, a clean white row of links and icons on the right, all vertically centered on the coral band. Hover a link — it turns amber. The desktop component is **done**.

Try narrowing the window, though, and the links just crowd together and eventually overflow. There's no mobile experience yet — that's exactly what Part 4 solves.

## Key Takeaways

- **Flexbox is the layout engine** for a nav bar: `justify-content: space-between` splits logo and menu; `align-items: center` aligns them vertically.
- **Nested flex containers** are normal — one arranges the bar, another arranges the links.
- **`gap`** is the clean, modern way to space items — no per-item margins.
- **`position: relative` with no offsets** silently establishes the anchor for the absolutely-positioned mobile menu to come.
- **`:hover` + a color token** gives consistent, instant interactive feedback.
- Font Awesome icons are sized by **`font-size`**, not `width`/`height`.

> ➡️ **Next up:** [[Part 4 - The Mobile Menu and Responsive Behavior]] — the media query that swaps the menus at 768px, and the `transform: translateX()` trick that slides the mobile panel in from the right.

---

## References

- MDN — [Basic concepts of Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox "The main and cross axes explained")[^mdn-flex]
- MDN — [`:hover`](https://developer.mozilla.org/en-US/docs/Web/CSS/:hover "The hover pseudo-class")[^mdn-hover]
- MDN — [`gap`](https://developer.mozilla.org/en-US/docs/Web/CSS/gap "Spacing flex and grid items with gap")[^mdn-gap]

> [!NOTE]
> Built from the project's `style.css`. The Flexbox mechanics mirror this vault's [[07_Layout with Flexbox]] and [[Flex shrink and Flex Grow Deep Dive]] notes.

[^mdn-flex]: MDN Web Docs — the main axis, cross axis, and how flex items are placed.
[^mdn-hover]: MDN Web Docs — the `:hover` pseudo-class and interaction states.
[^mdn-gap]: MDN Web Docs — the `gap` property for flex and grid layouts.
