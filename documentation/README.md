# Modeler Game — Freelance 3D Character Modeler Website
## Premium Website Template v1.0.0

---

## Pages Included
| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Hero + Skills + Portfolio Preview + Poly Specs + Process + Testimonials (6 sections) |
| Home 2 | `pages/home2.html` | Split-screen Hero + Marquee + Texture Showcase + Comparison Table + About + Dashboard Teaser (6 sections) |
| Portfolio | `pages/portfolio.html` | Filterable work grid with wireframe visuals + topology samples |
| Services | `pages/services.html` | Service details + 3-tier pricing + add-ons |
| Blog | `pages/blog.html` | Featured post + grid + sidebar with search, tags, newsletter |
| Contact | `pages/contact.html` | Tabbed forms (Quote / Message / Full Brief) + FAQ accordion |
| Login | `pages/login.html` | No-header auth card with animated grid bg |
| Register | `pages/register.html` | Account creation with password strength meter |
| Dashboard | `pages/dashboard.html` | Full studio client portal — upload, review, approve, download |

## Design System
```
Colors:
  --c-bg:      #080C14  (Deep Navy)
  --c-cyan:    #00D4FF  (Electric Cyan)
  --c-violet:  #8B5CF6  (Neon Violet)
  --c-green:   #10B981  (Emerald)
  --c-amber:   #F59E0B  (Amber)

Fonts:
  Headings: Syne (800)
  Body:     IBM Plex Mono
  UI/Labels: Barlow Condensed
```

## Header Layout Rules
- **1024px & 1440px (Desktop):** 3-zone layout — Logo left | Nav center (absolute) | Controls right. NO dropdown menus.
- **768px & 360px (Mobile/Tablet):** Hamburger button only visible (logo+brand stays). All nav links, theme toggle, RTL toggle move INSIDE hamburger drawer.

## Dashboard Features
- Upload concept art with drag-and-drop
- Visual pipeline progress bar (6 stages)
- Wireframe viewer with approval/revision workflow
- PBR texture set review panel
- Revision thread (comment system)
- Download center with asset status

## Connecting Forms
**Formspree:** Add `action="https://formspree.io/f/YOUR_ID" method="POST"` to form tags.
**Netlify:** Add `netlify` attribute to forms.

## Connecting Newsletter
Replace `.nl-form` action with Mailchimp or ConvertKit embed URL.

## Activating Dashboard Backend
The dashboard UI is fully built. To activate:
1. Connect authentication (Supabase, Firebase, Auth0)
2. Connect file storage (AWS S3, Cloudflare R2, Supabase Storage)
3. Add real-time comments (Supabase Realtime, Pusher)
4. Stripe for invoice/payment integration

## Credits
- Google Fonts: Syne, IBM Plex Mono, Barlow Condensed (Open Font License)
- Remix Icons v3.5 (Apache 2.0)
- All SVG wireframe visuals: custom-built, royalty-free

## Features
- Dark/Light mode with system preference detection
- RTL layout support
- Animated grid hero background
- Scroll reveal animations
- Counter animations
- Filter buttons on portfolio and blog
- Tabbed forms on contact and dashboard
- FAQ accordion
- Password strength meter
- File upload with drag-and-drop
- Toast notifications
- Back-to-top button
- Form validation
- Fully responsive 360px → 1440px
- WCAG 2.1 AA accessible
- JSON-LD structured data
- sitemap.xml + robots.txt
