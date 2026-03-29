# Aditattva Group — TCE-Style Rewrite

## Current State
The site is a dark navy + gold premium corporate website with 13 sections, animated stats, hero slider, services grid, sectors, projects, leadership, testimonials, and contact form. All data is fetched from the Motoko backend.

## Requested Changes (Diff)

### Add
- Top utility bar (social icons: LinkedIn, Twitter, Facebook, Instagram, YouTube)
- Mega-dropdown navigation (About Us, Sectors, Services, Insights, People, Media, Contact Us)
- Vertical social sidebar on hero section
- Tabbed Insights section (White Papers, Case Studies, Blogs, Technical Publications)
- People/Careers CTA section with background image
- "Design to Delivery" icon-card services section with hover effect (card flips blue on hover)
- Sector cards with full-bleed images and orange "Explore" CTAs
- Orange accent color (#E87722) alongside deep blue (#003087)

### Modify
- Color scheme: white/light background, deep blue (#003087) primary, orange (#E87722) accent
- Hero: 5 full-width slides with bold two-line headlines + subtitle + "Read more" CTA, slide dots at bottom
- Stats row: Years of Excellence, Projects Delivered, Countries, Engineering Talent
- Navigation: sticky white header with logo left, nav items center/right, blue mega-dropdowns on hover
- Footer: multi-column white/light footer with blue logo, grouped links, social icons, copyright row
- All existing content (services, projects, team, contact form) retained and adapted to new layout

### Remove
- Dark navy background
- Gold color scheme
- Single-column dark footer

## Implementation Plan
1. Replace index.css color tokens: deep blue + orange + white base
2. Rewrite App.tsx entirely with TCE layout structure:
   - TopBar component (social links)
   - Header/Nav component with mega-dropdowns (hover-activated, multi-column panels)
   - HeroSlider (5 slides, full viewport height, text overlay, dots navigation)
   - AboutSection (text + animated stats row: 4 counters)
   - ServicesSection ("Design to Delivery" — 5 icon cards with blue hover flip)
   - SectorsSection ("Sectors We Serve" — image cards grid with Explore CTA)
   - ProjectsSection (grid of project cards with images)
   - InsightsSection (tabbed: White Papers, Case Studies, Blogs, Publications)
   - PeopleSection (full-width image, headline, Apply Now CTA)
   - ContactSection (form + office info)
   - Footer (multi-column, logo, links, social, copyright)
3. All backend queries (services, projects, team, stats, testimonials, contact form) remain connected
