# Taqaddomi: UI/UX Design Prompt (All Screens)

> **How to use this file:** Paste **Part 1 (Global Context)** and **Part 2 (Design System)** at the start of every design session with your AI tool. Then paste one screen section from **Part 3** per request. Part 4 covers shared states, and Part 5 contains output instructions.

---

# PART 1: GLOBAL CONTEXT

## 1.1 Product

**Taqaddomi** (Arabic: تقدّمي, "my progress") is a bilingual (Arabic RTL + English LTR) web platform where people set personal goals, document their progress through daily/flexible entries (notes, photos, videos, links), keep streaks, and share their journey with a community. AI helps users polish posts, summarize their month, analyze progress, and discover similar trackers.

**Core idea:** Goal Tracking + Progress Documentation + Community + AI.

**Key difference from normal social apps:** the app opens on the user's **own progress** (a personal dashboard), not on other people's content. Users come to document first, then browse.

## 1.2 Core concepts (use these exact terms in the UI)

- **Tracker:** a goal or journey (e.g. "Learn Flutter in 3 Months").
- **Entry:** one progress update inside a tracker (notes + optional image/video/link). Can stay private or be published as a **post**.
- **Streak:** consecutive successful periods for a tracker (each tracker has a *current streak* and a *max streak*). Belongs to the tracker, not the account.
- **Tracker types (only two):**
  - **Daily:** entries auto-numbered "Day 1, Day 2...". Streak = consecutive days.
  - **Flexible:** user picks a counter label (**Attempt / Session / Update**), numbered "Attempt 3", "Session 5". Optional target: none (no streak), specific weekdays (streak in days), or X times per week (streak in weeks).
- **Follow:** users follow a **tracker**, not an account.
- **Visibility:** Public or Private (per tracker). Private trackers and their calendar are visible only to the owner.
- **Deadline:** optional. When it passes, the tracker automatically becomes **Completed** (visual change). Owner can extend it anytime, or manually press "I achieved my goal".
- **Reactions:** multiple types (Like, Love, Proud, Sad, ...). One reaction per user per post, changeable.

## 1.3 Audience and tone

Students, skill learners, athletes, habit builders, anyone documenting personal progress. Ages roughly 16 to 40. Mostly Arabic and English speakers, heavy mobile usage.

**Tone of voice:** warm, encouraging, human, short sentences. Never technical, never robotic. Examples: "How was your day?", "Add today's update", "You're on a 12-day streak".

## 1.4 Experience principles

1. **Document first, browse second.** The fastest path to adding an entry is always visible.
2. **Simple, not crowded.** Show only essentials; hide the rest behind "Additional options". A new user must create a tracker in under one minute.
3. **Progress is the hero.** The calendar with circles and the streak are the signature visuals of the product.
4. **Real content over decoration.** User photos and screenshots carry the visual interest. No stock illustrations as filler.
5. **Looks human, not "AI".** See the avoid-list in Part 2.
6. **Fully bilingual.** Every layout must work properly in RTL and LTR (mirrored, not just text-aligned).
7. **Mobile-first.** Design for 390px width first, then scale up to tablet and desktop.

---

# PART 2: DESIGN SYSTEM

## 2.1 Visual style

Clean, warm, card-based interface. Soft cream background, white cards with thin borders, moderate rounded corners, generous white space, flat solid colors. Friendly but not childish; calm but motivating. Inspired by: Strava (progress-based social feed), GitHub contribution graph (calendar of activity), Duolingo (streak reward feeling, but toned down), Letterboxd (personal profile and journal), Notion/Linear (clean, quiet layouts).

## 2.2 Color tokens

**Primary brand color: `#4FA65B` (fresh green).**

Because `#4FA65B` is a mid-tone green, white text on it only reaches about 3:1 contrast. Therefore use these rules:
- `#4FA65B` for **fills and graphics**: calendar circles, progress rings, large buttons (with dark text), icons, highlights, active tab indicators.
- `#2E7D3A` (darker green) for **text and links** on light backgrounds, and for **small buttons with white text**.
- Never put small white text on `#4FA65B`.

### Light mode

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#4FA65B` | Calendar circles, rings, main CTA fill, active indicators |
| `--primary-hover` | `#43934F` | Hover/pressed state of primary |
| `--primary-strong` | `#2E7D3A` | Links, green text, small buttons with white text |
| `--primary-soft` | `#E7F4E9` | Chips, selected states, soft green backgrounds |
| `--on-primary` | `#12261A` | Text/icons placed on `--primary` |
| `--streak` | `#E8A317` | Streak flame, achievements, completed badge (only for these) |
| `--streak-soft` | `#FDF1D6` | Background of streak chips |
| `--bg` | `#FAF6F1` | Page background (warm cream) |
| `--surface` | `#FFFFFF` | Cards, modals |
| `--surface-alt` | `#F3EDE5` | Inputs, subtle sections |
| `--border` | `#E8E0D6` | Card and input borders |
| `--text` | `#2A2224` | Main text |
| `--text-muted` | `#6E6468` | Secondary text |
| `--danger` | `#C0392B` | Delete, report, errors |
| `--completed` | `#E8A317` on `--streak-soft` | Completed tracker badge (gold, NOT green) |

### Dark mode

| Token | Hex |
|---|---|
| `--bg` | `#171513` |
| `--surface` | `#211E1B` |
| `--surface-alt` | `#2A2623` |
| `--border` | `#3A3430` |
| `--text` | `#F3EDE6` |
| `--text-muted` | `#A89F98` |
| `--primary` | `#4FA65B` (works directly on dark) |
| `--primary-strong` (text/links) | `#7CC986` |
| `--streak` | `#F0B534` |

The primary color must be a single CSS variable so it can be swapped globally.

## 2.3 Typography

- **Arabic:** Tajawal (weights 400, 500, 700).
- **English:** Plus Jakarta Sans (weights 400, 500, 700).
- Use the same weights across both so numbers and headings feel consistent. Font stack falls back to system sans-serif.

| Style | Size / line height | Weight |
|---|---|---|
| Display (landing hero) | 40 / 48 (desktop), 30 / 38 (mobile) | 700 |
| H1 | 28 / 36 | 700 |
| H2 | 22 / 30 | 700 |
| H3 | 18 / 26 | 500 |
| Body | 16 / 26 (Arabic gets slightly more line height) | 400 |
| Small / caption | 13 / 20 | 400 |
| Button / label | 15 / 20 | 500 |

## 2.4 Layout, spacing, shape

- 8px spacing grid (4, 8, 12, 16, 24, 32, 48).
- Card radius 16px, buttons and inputs radius 12px, chips fully rounded.
- Cards: white surface, 1px `--border`, almost no shadow (a very soft shadow only for modals and floating buttons).
- Content max width: 1200px on desktop; feed column 640px; mobile padding 16px.
- Breakpoints: mobile < 640, tablet 640 to 1024, desktop > 1024.

## 2.5 Iconography and imagery

- One consistent outline icon set (e.g. Lucide), 1.75px stroke. Streak uses a small flame icon in amber.
- AI features use ordinary icons (pen, notebook, magnifier, chart) and human names such as "Writing helper" and "Month recap". **No sparkle (✨) icons, no robot imagery.**
- Imagery: real user photos and screenshots. Cover images get a 16:9 or 3:1 crop with a soft overlay only when text sits on top.

## 2.6 Signature components

- **Calendar circle:** a day with at least one entry is marked with a circle in `--primary` around the day number (filled with `--primary` and number in `--on-primary`). For the **owner**, a day that only has private (unpublished) entries shows a **hollow ring** (1.5px `--primary` outline, no fill) so they are distinguishable. Today has a subtle underline. Visitors only see circles for published days.
- **Streak chip:** pill with amber flame icon + number + unit ("12 days" or "6 weeks"), on `--streak-soft`. Also shows "Best: 20".
- **Entry label badge:** small chip such as "Day 12" or "Attempt 3" in `--primary-soft` with `--primary-strong` text.
- **Tracker card:** cover thumbnail (or colored category icon if no cover), title, category chip, streak chip, status (Active / Completed / Private lock icon).
- **Post card:** header (avatar, owner name, streak chip, time), tracker name link, entry label badge, optional small title, body text, optional media, footer (reaction button, comment count, follow tracker button).
- **Reaction picker:** long-press or hover on the reaction button opens a small bar with 4 to 5 reaction icons (Like, Love, Proud, Sad, Support).
- **Primary button:** `--primary` fill with `--on-primary` text, 48px height, radius 12. Secondary: white with border. Text button: `--primary-strong`.
- **Completed state:** gold badge with check icon, gold border accent on the tracker card, and a soft gold tint at the top of the tracker page. Streak freezes at its final value.

## 2.7 Motion

Subtle and quick (150 to 250 ms ease-out). The only celebratory moments: the calendar circle softly "pops" when an entry is added, the streak number counts up by one, and a gentle confetti-free glow ring when a tracker is completed. No heavy animation, no looping effects.

## 2.8 RTL and bilingual rules

- The whole layout mirrors in Arabic: navigation, back arrows, chevrons, progress direction, calendar (week starts Saturday in Arabic, Sunday/Monday in English), reaction bars, sliders.
- Do not mirror: media controls (play), logos, numbers, charts' time axis can stay left-to-right unless it is a calendar.
- Use logical properties (start/end, not left/right).
- Allow Arabic text to be ~20% longer/shorter than English without breaking layouts.
- A language switcher (AR / EN) is available in the top bar and settings.
- User-generated content keeps its own direction (auto-detect per post).

## 2.9 Accessibility

- Text contrast at least 4.5:1 (use `--primary-strong` for green text).
- Touch targets at least 44px.
- Focus rings visible (2px `--primary-strong` outline).
- Never rely on color alone: completed, private, and published states also use icons/labels.
- Support reduced-motion.

## 2.10 Avoid the "AI product" look

- No gradients, glows, neon, glassmorphism, or dark-purple/blue "tech" palettes.
- No sparkle icons, robot avatars, or chat-bubble gimmicks for AI features.
- No abstract 3D blobs or generic stock illustrations.
- No crowded dashboards with many charts. Keep it calm and human.

---

# PART 3: SCREEN-BY-SCREEN DESIGN BRIEFS

Each brief states the purpose, layout (mobile first, then desktop), every element, interactions, and notes. Design both **Arabic (RTL)** and **English (LTR)** versions and both **light** and **dark** mode unless told otherwise.

---

## SCREEN 1: Landing Page (visitors, logged out)

**Purpose:** Explain the idea in 5 seconds and drive sign-up.

**Layout (top to bottom):**
1. **Top bar:** logo (Taqaddomi wordmark with a small circle-with-check mark), language switcher (AR/EN), "Log in" text button, "Get started" primary button. Sticky.
2. **Hero:** headline (e.g. "Set a goal. Document the journey. Grow with people who get it."), one-line subheading, primary CTA "Start your first tracker", secondary "See how it works". On the right (left in RTL): a **realistic product mockup**: a tracker page showing a calendar with green circles and a streak chip, plus a floating post card. Use real-looking content (a student learning Flutter, a runner).
3. **How it works (3 steps):** Create a tracker → Add daily updates → Share and grow. Each step is a card with icon and one sentence.
4. **Two tracker types:** side-by-side cards: "Daily" (journey, Day 1, Day 2...) and "Flexible" (habits, attempts, sessions). Each with a mini preview.
5. **Streaks and calendar showcase:** large calendar mockup with circles, caption "See your consistency at a glance".
6. **Community section:** a few example post cards from different categories (coding, fitness, language, football).
7. **Categories strip:** scrolling chips (Sports, Programming, Languages, Study, Habits, ...).
8. **Writing helper / Month recap teaser:** one card showing a rough note turned into a clean post, and a monthly recap sample. Use pen/notebook icons, not sparkles.
9. **Pricing teaser:** Free vs Premium two-column comparison.
10. **Final CTA band:** soft green (`--primary-soft`) background with CTA.
11. **Footer:** links, language, social, copyright.

**Notes:** Plenty of whitespace; alternating cream and white sections; cards with thin borders; max one accent color.

---

## SCREEN 2: Sign Up / Log In

**Purpose:** Fast, friendly authentication.

**Layout:** centered card (max 420px) on cream background; on desktop split layout: form on one side, a green-tinted panel with a calendar-circle mockup and a testimonial-style quote on the other.

**Elements:**
- Tabs or link toggle: Log in / Sign up.
- Sign up fields: full name, username (with live availability check), email, password (show/hide), terms checkbox. Social login buttons (Google, Apple) optional.
- Log in fields: email or username, password, "Forgot password?".
- Primary button full width.
- Inline validation, clear error messages in `--danger`.
- Language switcher in the corner.

**After sign-up:** short onboarding (Screen 3).

---

## SCREEN 3: Onboarding (3 quick steps, skippable)

**Purpose:** Personalize recommendations without friction.

1. **"What are you working on?"** Grid of category chips (multi-select): Sports, Programming, Languages, Study, Fitness, Habits, Art, Business, Other.
2. **"Create your first tracker"**: opens a simplified version of the Create Tracker form (title + category + type only).
3. **"Follow a few journeys"** (optional): 4 to 6 suggested public tracker cards with a Follow button.

Progress dots at top, "Skip" at every step, large primary "Continue" button.

---

## SCREEN 4: Home (Personal Dashboard)

**Purpose:** The first screen after login. It answers: "What should I document today, and how am I doing?"

**Layout (mobile):** single column. **Desktop:** main column (about 2/3) + right sidebar (1/3, left in RTL).

**Elements, in order:**

1. **Greeting header:** "Good evening, Ahmad" + today's date + a small streak summary. Below it: "How was your day?"

2. **Today's check-in section (most important):**
   - Title: "Today's updates".
   - A horizontal list (mobile) or grid (desktop) of **tracker cards for active trackers**. Each card shows: cover thumbnail or category icon, tracker title, category chip, streak chip, a status line ("Not documented today" in muted text, or "Done today" with a green check), and a prominent **"Add entry"** button. For Flexible trackers with a weekly target show a mini progress "2 of 3 this week" as small dots.
   - If everything is done today: a calm message "You're all set for today" with the green check.

3. **My activity:** a compact monthly calendar (all trackers combined) with green circles on the days with activity, month navigation arrows, and a line like "14 active days this month".

4. **My trackers:** compact list of all trackers grouped by Active / Completed. Each row: title, type tag (Daily/Flexible), current streak, deadline countdown if set ("12 days left"). "+ New tracker" button at the end.

5. **Reactions and comments on my posts:** the 3 to 5 latest interactions ("Sara reacted Love to your post", "Omar commented...") with small avatars. "See all" link goes to Notifications.

6. **One recap card (right sidebar on desktop, below on mobile):** "Your week in review" with 2 to 3 plain facts (entries added, longest streak, most active tracker) and a "Read more" link. One card only; full analytics live on the Insights page.

**Empty state (new user):** friendly illustration-free message "Create your first tracker to begin" with a large primary button and the two tracker type cards.

**Global elements present here:** top bar, bottom navigation (mobile) or left sidebar (desktop), floating "+" button.

---

## SCREEN 5: Add Entry (Check-in) Modal / Sheet

**Purpose:** Add progress in seconds. Mobile: full-height bottom sheet. Desktop: centered modal (560px).

**Elements:**
1. **Header:** title "Add entry", close button. Below: **tracker selector** (dropdown chip showing selected tracker; preselected when opened from a tracker or a dashboard card). Next to it, the auto entry label preview: "Day 13" or "Attempt 4" (non-editable).
2. **Notes field:** large multiline text area, placeholder "What did you do today?". Character counter if needed. Beneath it, a text button **"Improve my writing"** (pen icon) that rewrites the note into a clearer post (shows result with Accept / Undo).
3. **Attachments row:** three icon buttons: Photo, Video, Link. Selected media shows as thumbnails with remove "x". A link attachment shows a preview card (title, domain).
4. **"Publish to community" switch:** off by default means "Keep in my tracker only". When on, a caption appears: "Visible to followers and the community". If the tracker is Private, the switch is disabled with a lock icon and a short explanation.
5. **Optional small title field** (collapsed under "Additional options"), plus date selector if needed (default today).
6. **Primary button "Save entry"** full width, disabled until notes or media exist.

**After saving:** the sheet closes; the dashboard card flips to "Done today", the calendar circle appears with a soft pop, and the streak number increments with a small count-up. A small toast "Entry added. 13-day streak!".

**Edit mode:** same sheet prefilled with "Save changes" and a "Delete entry" text button in `--danger` (confirmation dialog).

---

## SCREEN 6: Create Tracker

**Purpose:** Create a tracker in about a minute. Two-stage layout: essentials first, extras hidden.

**Layout:** single column card (max 560px); on mobile a full page with sticky bottom button.

**First view (essentials only):**
1. **Title** input ("e.g. Learn Flutter in 3 months").
2. **Category:** selector opening a sheet with main categories; choosing one reveals sub-categories (e.g. Sports → Football, Running, Gym).
3. **Type:** two large selectable cards side by side (stacked on mobile):
   - **Daily:** icon, name, line "Document your journey every day. Entries become Day 1, Day 2..."
   - **Flexible:** icon, name, line "For habits, sessions, and attempts. You decide when."

**If Flexible is selected (expands smoothly below):**
- **Counter label:** segmented control: Attempt / Session / Update, with live example "Entries will show as: Attempt 1".
- **Target (optional):** three radio cards: *No target* ("Just a counter, no streak"), *Specific days* (weekday pills Sat Sun Mon Tue Wed Thu Fri to toggle), *X times per week* (stepper 1 to 7). A one-line explanation of how the streak counts for the chosen option.

**"Additional options" (collapsed accordion):**
- Cover image upload (drag and drop, crop).
- Description (multiline).
- Deadline (date picker, optional).
- Visibility: segmented control Public (default) / Private, with small explanation of each.

**Footer:** primary button "Create tracker". After creation, navigate to the new tracker page with a gentle prompt "Add your first entry".

**Validation:** only title, category, and type are required.

---

## SCREEN 7: Tracker Page

**Purpose:** The full story of one tracker. The same layout serves owners and visitors; actions differ.

**Header block:**
- Cover image (3:1) with soft bottom fade; fallback is a `--primary-soft` block with category icon.
- Title (H1), category and sub-category chips, type tag (Daily / Flexible with label), visibility icon (lock if private).
- **Owner row:** avatar, name (links to profile).
- **Stats row:** streak chip (current), "Best streak", total entries, started date, deadline with countdown or "Completed" gold badge.
- Description (collapsible after 3 lines).
- **Actions:**
  - *Visitor:* primary **Follow** / **Following** button, share button, overflow menu (Report).
  - *Owner:* primary **Add entry**, Edit tracker, overflow menu (Extend deadline, Mark as achieved, Change visibility, Delete).

**View switcher:** segmented control: **Calendar | Posts** (sticky below the header).

**Calendar view:**
- Month grid with navigation arrows and month/year title (week starts per language).
- Days with entries have a filled green circle. For the owner, days with only private entries show a hollow ring; a legend explains: filled = published, ring = private only. Visitors see only published days (no legend needed).
- Today is underlined; future days are muted.
- For Flexible trackers with specific weekdays, scheduled days show a tiny dot beneath the number.
- **Tapping a day:** opens a bottom sheet (mobile) or side panel (desktop) listing that day's entries as compact post cards (entry label, notes, media, time). Owner sees edit/delete icons and the private/published tag on each.
- Under the calendar: a monthly summary line ("9 active days this month").

**Posts view:** chronological (newest first) list of entry cards with infinite scroll; same card style as the feed. Owner can filter All / Published / Private. Includes reactions and comments on published entries.

**States:**
- **Completed tracker:** gold badge with check, subtle gold tint on header, "Add entry" replaced by "Reopen / Extend deadline" for the owner. Calendar remains viewable.
- **Private tracker (owner view):** lock icon and a banner "Only you can see this tracker".
- **Private tracker (visitor):** not accessible; show a simple "This tracker is private" page.
- **Empty tracker:** message "No entries yet" with Add entry button (owner) or "Nothing shared yet" (visitor).

**Desktop:** two columns: left = header + view content, right = sticky info card (stats, deadline, owner, similar trackers).

---

## SCREEN 8: Community (Following | Discover)

**Purpose:** Browse the community. One page, two tabs.

**Top:** page title "Community", search field (searches trackers and people), category filter chips (horizontal scroll), and a tab switcher: **Following | Discover**.

### Following tab (Feed)
- Vertical feed of **post cards** from trackers the user follows (column 640px centered on desktop).
- Post card (see 2.6) includes: avatar + owner name + streak chip (current and best), tracker name (tappable link to the Tracker page), entry label badge, small title, body, media (image full-width with rounded corners; video with play overlay; link as preview card), footer with reaction button (long press/hover for picker, shows top reaction icons and total count), comment button with count, share, and a "Follow tracker" / "Following" small button.
- Tapping the post opens Post Detail (Screen 9).
- Empty state: "Follow trackers to see their progress here" with 3 suggested tracker cards.

### Discover tab
- Sections stacked: **Trending trackers** (horizontal cards), **Similar to yours** (based on the user's categories), **New journeys**, and **Browse by category** (grid of category tiles with icons).
- **Tracker discovery card:** cover, title, owner, category chip, streak chip, followers count, entries count, Follow button.
- Filters: category, tracker type, language, "Active only" toggle.
- Search results show trackers first, then people.

**Desktop:** feed center column; right sidebar with "Trackers to follow" and category shortcuts.

---

## SCREEN 9: Post Detail (with comments)

**Purpose:** Read a single post and its discussion.

**Layout:** page (or modal over the feed on desktop).
- Back button, post card at full size (full media, full text).
- **Reaction summary bar:** top 3 reaction icons with total; tap opens a list of who reacted by type (tabs).
- **Comment input** sticky at the bottom (mobile): avatar, field "Write a comment...", send button.
- **Comments list:** avatar, name, time, text, reaction/like icon, "Reply" link; replies are indented (mirrored in RTL) one level deep. Owner's comments carry a small "Owner" tag. Long press / overflow: Report, Delete (own).
- A "View tracker" card at the bottom linking to the tracker page with its streak and Follow button.

---

## SCREEN 10: Profile

**Purpose:** A person's identity and journeys.

**Header:** avatar (large), name, @username, bio, joined date, language, counts (public trackers, followers of their trackers, total entries). Buttons: *own profile:* Edit profile; *others:* Report/Block in menu.

**Content tabs:**
1. **Trackers (default):** grid/list of the person's trackers (public only for visitors; all for the owner with lock icons). Sections: Active, Completed. Each card is the Tracker card with streak.
2. **Posts:** their published entries in feed-card style.
3. **Achievements** (own profile or public): simple badges (e.g. "First entry", "7-day streak", "Completed a goal"). Gold/amber styling, no clutter.

**Own profile extras:** shortcut to Settings, "Following" list (trackers they follow).

---

## SCREEN 11: Notifications

**Purpose:** Keep users coming back and aware.

**Layout:** list grouped by Today / This week / Earlier. Each item: avatar or icon, sentence with bold names, small thumbnail of the related post or tracker, time, unread dot (`--primary`).

**Notification types:** reaction on my post, comment/reply, new follower on my tracker, tracker deadline approaching, tracker auto-completed, streak at risk ("Add today's entry to keep your 6-day streak"), monthly recap ready, someone I follow posted.

**Controls:** "Mark all as read", filter chips (All / Interactions / Reminders). Settings link for notification preferences. Empty state: "You're all caught up".

---

## SCREEN 12: Insights (AI Progress, Recap, Analysis)

**Purpose:** Reflect on progress and get guidance. Free users see a limited version; Premium unlocks everything.

**Layout:** top tabs: **Recap | Analysis | Recommended**, tracker selector on top (All trackers or a specific one).

### Recap tab (Monthly summary)
- Month selector.
- Summary card in plain language: "This month you added 12 entries, completed 5 topics, and built 2 small projects."
- 3 to 4 simple stat tiles (entries, active days, best streak, most active tracker) with a **small bar chart** or a mini calendar (green circles).
- "Highlights" list: 2 to 3 notable entries (thumbnails linking to posts).
- Premium: download as PDF.

### Analysis tab (Progress analysis)
- Tracker selector, then a card: **"What you've achieved"** (list with check icons) and **"What to focus on next"** (list of 2 to 3 suggestions, each a small card with a short reason).
- "Regenerate" text button (limited for free users).

### Recommended tab
- Similar trackers and people to follow, in tracker discovery cards, with a one-line reason ("Also learning Laravel").

**Premium gating:** locked sections show blurred (simple blur is fine here) preview with a clear "Upgrade to Premium" button; free users still see a short sample so the value is clear. Use a pen/notebook/chart icon set; **no sparkles or robot visuals**.

---

## SCREEN 13: Settings

**Layout:** left list of sections (desktop) or stacked menu (mobile).

**Sections:**
- **Account:** name, username, email, password, delete account.
- **Profile:** avatar, bio.
- **Language and appearance:** Arabic / English, theme (Light / Dark / System), week start day.
- **Privacy:** default visibility for new trackers (Public/Private), who can comment (everyone / followers of the tracker), blocked users list.
- **Notifications:** toggles per type, daily reminder time, email vs push.
- **Subscription:** current plan, upgrade/manage (Screen 14).
- **Timezone:** auto-detected with manual override (explain it defines when a "day" starts).
- **Data:** export my data.

Use grouped cards, toggle switches (primary green), and clear destructive actions in `--danger` with confirmation dialogs.

---

## SCREEN 14: Premium / Upgrade

**Purpose:** Clear, honest upgrade page.

**Layout:** header with title and monthly/yearly toggle (show yearly saving). Two plan cards side by side (stacked on mobile): **Free** and **Premium** (Premium card highlighted with a green top border and "Most popular" chip).

**Free:** unlimited trackers and entries, streaks and calendar, community features, limited AI usage.
**Premium:** advanced progress analytics, AI coaching and full progress analysis, detailed monthly reports (PDF), personalized recommendations, streak freeze days, more customization (themes, covers).

Below: feature comparison table, FAQ accordion, "Cancel anytime" note, primary button "Upgrade". Keep it calm; no countdown timers or pressure tactics.

---

## SCREEN 15: Extend Deadline / Mark as Achieved (modals)

- **Extend deadline:** small modal with date picker, shows current deadline, primary "Extend", result returns tracker to Active.
- **Mark as achieved:** confirmation modal with a short celebratory line ("Well done. Mark this goal as achieved?"), then the tracker shows the gold Completed badge. Optional prompt to share a final post: "Share your result with the community" (opens Add Entry with publish on).
- **Auto-completed notice:** when a deadline passes, owner sees a banner on the tracker page and a notification: "Your tracker 'Learn Flutter' has completed. Extend the deadline or celebrate it."

---

## SCREEN 16: Report, Block, and Delete Dialogs

- **Report modal:** reason list (Spam, Inappropriate, Harassment, Other) as radio options, optional details field, submit button, confirmation toast.
- **Block user:** confirmation dialog with explanation.
- **Delete (entry/tracker/comment/account):** clear destructive dialog, describing what will be lost, red confirm button, secondary cancel. For trackers, mention that its streak and entries will be removed.

---

# PART 4: GLOBAL NAVIGATION AND SHARED STATES

## 4.1 Navigation

**Mobile:** bottom bar with 5 items: **Home, Community, + (center floating add button), Notifications, Profile**. The center "+" opens the Add Entry sheet.

**Desktop:** left sidebar (right in RTL) with logo, nav items (Home, Community, Insights, Notifications, Profile), a prominent "Add entry" primary button, and the user mini-profile at the bottom. Top bar contains search, language switcher, and notification bell.

Active nav item uses `--primary-soft` background with `--primary-strong` icon and label.

## 4.2 Shared states for every screen

- **Loading:** skeleton cards (soft beige shimmer, very subtle), never a full-page spinner.
- **Empty:** short friendly sentence plus one clear action. No big illustrations.
- **Error:** inline message with a "Try again" button; network error banner at top.
- **Offline/slow upload:** progress bar on media upload with cancel option.
- **Success:** small toast at the bottom center (top on desktop) auto-dismissing after 3 seconds.
- **Permissions:** private content shows a lock icon and clear text.

## 4.3 Responsive behavior summary

| Element | Mobile | Desktop |
|---|---|---|
| Navigation | Bottom bar + floating add | Left/right sidebar |
| Add Entry | Bottom sheet | Centered modal |
| Day detail (calendar) | Bottom sheet | Side panel |
| Home | Single column | 2 columns + sidebar |
| Feed | Full width | 640px center + sidebar |

---

# PART 5: OUTPUT INSTRUCTIONS FOR THE DESIGN AI

When generating any screen from this file:

1. Deliver **mobile (390px)** and **desktop (1440px)** versions, in **English (LTR)** and **Arabic (RTL)**, **light and dark** if the tool allows.
2. Use only the colors, fonts (Tajawal + Plus Jakarta Sans), radii, and components defined in Part 2.
3. Use realistic sample content: names such as Ahmad, Sara, Omar, Lina; trackers such as "Learn Flutter in 3 Months", "Break my 5K record", "Daily English Practice", "Gym 4x a week"; realistic streak numbers; Arabic samples must be genuine Arabic, not placeholder text.
4. Show the relevant **states** (empty, loading, completed, private, owner vs visitor) where the screen has them.
5. Keep layouts uncluttered. If something is not listed in the brief, do not add it.
6. Follow the avoid-list in 2.10.
7. After generating a screen, list the components it used so they can be reused consistently in the next screen.
