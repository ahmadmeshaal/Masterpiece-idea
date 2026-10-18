---
name: Taqaddomi Playful Momentum
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#3e4a3d'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0ea'
  outline: '#6e7b6c'
  outline-variant: '#bdcaba'
  surface-tint: '#006e2d'
  primary: '#006b2c'
  on-primary: '#ffffff'
  primary-container: '#00873a'
  on-primary-container: '#f7fff2'
  inverse-primary: '#62df7d'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#a33900'
  on-tertiary: '#ffffff'
  tertiary-container: '#cc4900'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7ffc97'
  primary-fixed-dim: '#62df7d'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005320'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  display-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 56px
    fontWeight: '800'
    lineHeight: 64px
    letterSpacing: -0.03em
  display-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-numeric-streak:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '800'
    lineHeight: 24px
    letterSpacing: 0.02em
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 3rem
  margin-mobile: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a warm, gamified, and tactile atmosphere centered on daily self-improvement and communal momentum. Built around the ethos of step-by-step progress ("Taqaddomi"), the interface balances playful delight with dependable habit structure. 

The aesthetic blends **Tactile / Modern Skeuomorphism** with clean, rounded geometry:
- **Tone:** Encouraging, vibrant, celebratory, and welcoming. Never punishing or sterile.
- **Audience:** Everyday habit-builders, language learners, fitness enthusiasts, and digital teams seeking accountability without friction.
- **Atmosphere:** Physical stationery meets interactive mobile arcade—reminiscent of tactile sticker books, raised push-buttons, and collectible momentum badges.
- **Rule of Restraint:** Under no circumstances should pitch-black outlines (`#000000`) be introduced. Structural hierarchy is achieved strictly via creamy tone transitions, deep emerald undertones, and warm biscuit-toned borders.

## Colors

The palette balances warm organic ivory backdrops with dynamic, candy-crisp greens and energetic flame accents.

### Color Tokens
- **Background Tiers:**
  - `canvas-default`: `#FBF9F4` (Primary light canvas)
  - `canvas-subtle`: `#FAF7F0` (Card fills and secondary surfaces)
  - `canvas-sunken`: `#F4F0E8` (Trough backgrounds, progress track bases, inset wells)
- **Primary & Interactive Green:**
  - `brand-primary`: `#16a34a` (Core active state, primary buttons, major milestones)
  - `brand-primary-light`: `#22c55e` (Hover highlights, icon accents)
  - `brand-primary-press`: `#15803d` (Physical 3D bottom-ridge borders, pressed button states)
  - `brand-mint-tint`: `#DCFCE7` (Celebratory tags, completed habit badge fills)
  - `brand-mint-border`: `#BBF7D0` (Borders for completed habit states)
- **Momentum & Streak Accents:**
  - `streak-amber`: `#F59E0B` (Active streaks, stars, coins)
  - `streak-fire`: `#EA580C` (Flame icons, emergency freeze warnings, top milestones)
  - `streak-amber-soft`: `#FEF3C7` (Streak card pill backgrounds)
- **Neutrals & Structural Borders:**
  - `border-soft`: `#EBE5D8` (Default perimeter line for cards, containers, inputs)
  - `border-strong`: `#E5DFD0` (Divider lines, subtle card offsets)
  - `text-primary`: `#1E293B` (High-contrast charcoal for titles and readable metrics)
  - `text-secondary`: `#64748B` (Subtext, unselected tab items, streak micro-labels)
  - `text-tertiary`: `#94A3B8` (Placeholders and disabled copy)

## Typography

The typography couples the friendliness of **Plus Jakarta Sans** with geometric clarity.

- **Weight Pairing:** Use heavy weights (`700` and `800`) generously for titles, gamified statistics, button labels, and milestones to generate an approachable arcade punchiness.
- **RTL & Arabic Adaptability:** When rendering Arabic copy, inherit matching weights using system-native modern Naskh/Sans typefaces with optical alignment adjustments, ensuring line heights remain ample (`1.5` minimum) to accommodate ascenders and diacritics.
- **Metrics & Streaks:** Counters and streak indicators must always use tabular figures and bold weights (`label-numeric-streak`) to prevent layout shifts during live count animations.

## Layout & Spacing

A structured 12-column layout on desktop, transitioning to a single-column stacked flow on mobile screens.

- **Grid Architecture:**
  - **Desktop (>= 1024px):** 12 columns, max-width container of `1200px`, centered, with `margin: 3rem` safety bounds and `gutter: 1.5rem`.
  - **Tablet (768px - 1023px):** 8 columns, `margin: 2rem`, `gutter: 1.25rem`.
  - **Mobile (< 768px):** 4 columns, full fluid width, `margin: 1.25rem`, `gutter: 1rem`.
- **Rhythm Rules:**
  - Interactive tactile blocks (e.g., habit item grids) use `space-md` gaps.
  - Section blocks and hero narrative groupings maintain generous breathing room through `space-xl`.

## Elevation & Depth

Visual hierarchy uses physical, pushable planes rather than diffuse drop shadows.

- **The Tactile 3D Ridge:**
  - Interactive cards and primary buttons feature a solid bottom lip: `border-b-4 border-[#15803d]` for green primaries, and `border-b-4 border-[#E5DFD0]` for neutral cards.
  - **Active Click State:** Translates down by `2px` (`translate-y-[2px]`), shrinking the bottom border to `2px` to evoke an authentic arcade press sensation.
- **Layer Stacking (Surface Tiers):**
  - **Level 0 (Canvas):** Flat base color `#FBF9F4`.
  - **Level 1 (Cards/Wells):** `#FAF7F0` enclosed by a 1.5px solid `#EBE5D8` line.
  - **Level 2 (Floating Popovers/Modals):** `#FFFFFF` paired with an ultra-soft, warm ambient shadow: `0 10px 25px -5px rgba(120, 100, 80, 0.08)`.

## Shapes

The design uses a pill-shaped and ultra-rounded philosophy (`roundedness: 3`).

- **Pill Geometry:** Call-to-actions, category tags, streak chips, and mascot dialog bubbles utilize full capsule radiuses (`rounded-full`).
- **Containers & Surfaces:** Main landing section cards, feature highlights, and interactive progress widgets use `rounded-3xl` (`1.5rem` to `2rem`).
- **Inner Elements:** Nested components (such as habit icon tiles or checkmark targets) use `rounded-2xl` (`1rem`) to mirror the outer container's curvature proportionally.

## Components

### Buttons
- **Primary 3D Push Button:**
  - Background `#16a34a`, hover `#22c55e`, text `#FFFFFF`.
  - Border: 1.5px `#16a34a` with a distinctive `border-b-[4px] border-[#15803d]`.
  - Shape: Fully rounded (`rounded-full`) or `rounded-2xl`.
  - Interaction: On press, `transform: translateY(2px)` with `border-b-[2px]`.
- **Secondary Biscuit Button:**
  - Background `#FAF7F0`, text `#1E293B`.
  - Border: 1.5px `#EBE5D8` with `border-b-[4px] border-[#E5DFD0]`.

### Streak Counters & Momentum Chips
- Pill-shaped layout (`rounded-full`), background `#FEF3C7`, border `1.5px solid #FDE68A`.
- Houses an animated orange flame icon (`#EA580C`) next to an emphatic number formatted in `label-numeric-streak` (`#B45309`).

### Habit Cards & Progress Tiles
- Background `#FAF7F0`, border `1.5px solid #EBE5D8` with `border-b-[4px] border-[#E5DFD0]`.
- Padding: `space-lg`.
- Completed State: Changes background to `#DCFCE7`, border to `#BBF7D0`, with bottom ridge `#86EFAC`.

### Checkboxes & Action Nodes
- Massive 32x32px squircle targets (`rounded-xl`).
- Unchecked: Inset background `#F4F0E8` with a 1.5px border `#EBE5D8`.
- Checked: `#16a34a` with a bold white checkmark icon, giving off a satisfying bounce animation on click.

### Mascot Dialogue Bubbles (Moe the Habit Buddy)
- Background `#FFFFFF`, border `2px solid #EBE5D8`.
- Rounded: `rounded-2xl` with a directional rounded tail pointing to the mascot artwork.
- Subtle inner drop shadow: `inset 0 -2px 0 #F4F0E8`.