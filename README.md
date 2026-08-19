# GON — Responsive Navigation

[![Live Demo](https://img.shields.io/badge/Live_Demo-online-brightgreen?logo=netlify&logoColor=white)](https://gon-responsive-nav.netlify.app) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) ![No Build Step](https://img.shields.io/badge/Build-None-2ecc71) ![License MIT](https://img.shields.io/badge/License-MIT-blue)

A responsive navigation bar built from scratch with **plain HTML, CSS, and vanilla JavaScript** — no frameworks, no build tooling, no dependencies to install. On wide screens it shows a full horizontal menu; on narrow screens it collapses into a **hamburger menu** whose panel slides in from the right.

This repository is both the finished component **and** a complete, six-part written tutorial that builds it step by step (see [Tutorial](#tutorial)).

---

## Demo

**🔗 Live:** <https://gon-responsive-nav.netlify.app> — auto-deployed from `main` via Netlify.

Or run it locally — open `index.html` in any modern browser, or serve the folder:

```bash
python3 -m http.server
# then visit the printed http://localhost:8000
```

> **Note:** icons (Font Awesome) and the *Poppins* font load from CDNs, so an internet connection is required for them to render.

## Features

- **Fully responsive** — a horizontal menu above `768px`, a hamburger menu at or below it.
- **Smooth slide-in mobile menu** using a CSS `transform: translateX()` — not a `display` toggle — so it animates at 60fps.
- **Flexbox layout** for the desktop bar (logo left, links right, vertically centered).
- **Design tokens** via CSS custom properties, plus documented type and spacing scales.
- **~5 lines of JavaScript** — the script's only job is to toggle a single class; CSS does the rest.

## Tech stack

| Layer | Used for |
|:---|:---|
| HTML5 | Semantic structure (`<header>`, `<nav>`, link lists) |
| CSS3 | Flexbox, media queries, transforms, transitions, custom properties |
| JavaScript (vanilla) | Toggling the mobile menu on click |
| [Font Awesome](https://fontawesome.com/) | Hamburger and social icons (CDN kit) |
| [Google Fonts — Poppins](https://fonts.google.com/specimen/Poppins) | Typeface (CDN) |

## Project structure

```
.
├── index.html        # Structure: the two parallel menus (desktop + mobile)
├── style.css         # All styling + the @media (max-width: 768px) breakpoint
├── script.js         # Toggles the .mobile-hide class on the mobile menu
├── images/
│   └── logo.svg       # Brand mark
└── posts/            # 📚 Step-by-step tutorial series (see below)
```

## How it works

1. **Two menus in the markup.** `index.html` contains a `.desktop-menu` and a `.mobile-menu` with identical link lists. A media query shows exactly one at a time — keep their links in sync.
2. **The slide-in trick.** `.mobile-menu-items` defaults to `transform: translateX(100%)` (parked off-screen right). Adding the `.mobile-hide` class sets `translateX(0)`, sliding it into view; a `transition` animates the change.
3. **JavaScript toggles one class.** `script.js` listens for a click on the hamburger and calls `classList.toggle('mobile-hide')`. Behavior flips state; CSS reacts to it.

> The class name `.mobile-hide` is a quirk of this codebase — adding it *shows* the menu. See the tutorial for the full explanation (and how to improve it).

## Tutorial

A complete, build-along series lives in [`posts/`](<posts/>). Read them in order:

- [Series Index](<posts/Responsive Navigation - Tutorial Index.md>)
- [Part 1 — Project Setup and the HTML Structure](<posts/Part 1 - Project Setup and HTML Structure.md>)
- [Part 2 — CSS Foundations: Fonts, Tokens and Reset](<posts/Part 2 - CSS Foundations - Fonts, Tokens and Reset.md>)
- [Part 3 — Styling the Desktop Navigation](<posts/Part 3 - Styling the Desktop Navigation.md>)
- [Part 4 — The Mobile Menu and Responsive Behavior](<posts/Part 4 - The Mobile Menu and Responsive Behavior.md>)
- [Part 5 — Adding JavaScript Interactivity](<posts/Part 5 - Adding JavaScript Interactivity.md>)
- [Part 6 — Testing, Accessibility and Next Steps](<posts/Part 6 - Testing, Accessibility and Next Steps.md>)

## Possible improvements

Covered in Part 6:

- Make the hamburger a real `<button>` with `aria-expanded` / `aria-label` for accessibility.
- Close the menu after a link is chosen; support `Escape` and outside-click.
- Respect `prefers-reduced-motion`.
- Add `overflow-x: hidden` to remove the off-screen panel's phantom scrollbar.
- Refactor the duplicated link list to a single source of truth.

## Credits

Built by **Gonzalo Marcos** as part of a web-design practice series. Inspired by the "50 Projects in 50 Days" and "Build Responsive Real-World Websites" courses.

## License

Released under the MIT License — free to use, learn from, and adapt.
