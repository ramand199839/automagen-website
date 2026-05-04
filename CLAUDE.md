# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

AutomaGen — a solo-founder AI automation agency landing page. Pure static site: no build step, no framework, no dependencies.

Live URL: **https://getautomagen.netlify.app**  
Netlify site ID: `81f25a69-36d1-4ae9-a861-492688baca8c`

## Deploying

```powershell
cd C:\Users\raman\AutomaGen
netlify deploy --dir "." --prod
```

Renaming the Netlify subdomain (requires correct body wrapper):
```powershell
netlify api updateSite --data '{"site_id":"81f25a69-36d1-4ae9-a861-492688baca8c","body":{"name":"new-name"}}'
```

## File Structure

| File | Role |
|------|------|
| `index.html` | Single page — all sections, JS inline at bottom |
| `styles.css` | All styles — base design system + every section |
| `snippet_animations.js` | Loaded via `<script src>` — IntersectionObserver scroll reveal + hero orb injection |
| `snippet_*.html/css` | Build artefacts from parallel agent generation — not loaded by the page, kept as reference |

## Architecture

**Single-file approach:** All CSS lives in `styles.css`. All JS except `snippet_animations.js` is inline at the bottom of `index.html` (nav scroll state, contact form submit, FAQ accordion).

**Design system** (CSS custom properties on `:root`):
- Primary: `#6C63FF` → `--accent` (purple, buttons, highlights, borders)
- Accent cyan: `#00D4FF` → `--accent-secondary` (stats, checkmarks, badges, teal glow)
- `--bg-base: #0a0a0f` / `--bg-surface: #12121a`
- `--text-primary: #f0f0f5` / `--text-muted: #8888a0`
- `--radius-card: 12px` / `--radius-btn: 8px` / `--transition: 0.25s ease`

**Pricing tiers (INR, exclusive of taxes):**
- Starter — ₹15,000 /project
- Growth — ₹35,000 /project (featured / Most Popular)
- Scale — ₹75,000 /month (retainer)

**Section order in `index.html`:**
Hero → Services → Process → Pricing → Founding Client Program → FAQ → Contact

**Scroll animations:** `snippet_animations.js` stamps `.reveal` / `.reveal-scale` classes onto elements at DOMContentLoaded, then an IntersectionObserver adds `.visible` on scroll-in. Stagger delays are CSS `nth-child` rules (up to 6 siblings, 0.1s increments).

**Glowing dividers:** `<hr class="glow-divider">` between every section.

**WhatsApp button:** Fixed bottom-right, links to `https://wa.me/919803914492`.

**Contact / CTA emails:**
- "Start Free Audit" (pricing Growth card) → `mailto:ramana199839@gmail.com`
- "Apply for a Founding Spot" (founding section) → `mailto:ramana199839@gmail.com`
- Contact form submit is client-side only (shows success message, no backend)

## Positioning Notes

- Solo founder, not an agency — copy uses "I" not "we/team"
- Founding Client Program: 3 spots, discounted rate in exchange for a case study
