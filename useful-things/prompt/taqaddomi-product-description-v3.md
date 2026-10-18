# Taqaddomi (تَقَدُّمي): Product Description v3

**Direction:** a warm, clean, community-driven progress tracker. There is no gamification: no XP, levels, badges, milestone rewards, streak shields, mascot, leaderboard, or community challenge (all removed in v3).

> This file replaces v1 (`taqaddomi-project-description.md`) and v2. Where they differ, v3 wins.

---

## 1. Vision

Taqaddomi ("My Progress") is a bilingual (Arabic RTL + English LTR) web platform where people set personal goals, document their journey with real proof of work (notes, photos, videos, links), and build lasting routines through streaks and a supportive community. Logging should feel quick and satisfying.

**Formula:** Goal Tracking + Progress Documentation + Community + AI.

**What makes it different:**
- **Documentation, not just ticking boxes:** every day has real content behind it.
- **Quick, tactile logging:** pressed-button feel and a calendar that fills with green circles.
- **Supportive community:** people share authentic proof of work, not vanity numbers.
- **Bilingual by design.**

## 2. Audience and Personas

- **Kareem, 24, the builder:** Flutter developer and runner. Wants a log entry in under 10 seconds, attachments (code screenshots), a visual progress matrix, community cheers. Dislikes sterile or punishing trackers.
- **Layla, 29, the mindful athlete:** half-marathon prep and morning reflection. Needs flexible weekly cadence, journaling, and an inspiring feed without toxic algorithms.
- **Tariq, 33, the scholar:** daily classical reading and language practice. Needs first-class Arabic typography, clear progress markers, distraction-free logging.

## 3. Core Concepts

| Concept | Meaning |
|---|---|
| **Tracker** | A goal or journey (e.g. "Learn Flutter in 90 Days"). |
| **Entry** | A progress update: notes, optional duration, photo/video/link. Private or published as a post. |
| **Streak** | Consecutive successful periods for a tracker (current and best). Belongs to the tracker. |
| **Follow** | Following a specific tracker. |

## 4. Tracker Types (unchanged from v1)

**Daily (Streak Mode):** entries auto-numbered Day 1, Day 2... Streak = consecutive days. Missing a day resets the current streak. Best streak is always kept.

**Flexible (Custom Cadence):** user picks a counter label (**Attempt / Session / Update**) and an optional target:
- No target: counter only, no streak (good for record-breaking attempts).
- Specific weekdays: streak counts scheduled days completed.
- X times per week (or month): streak counts consecutive weeks (or months) where the target was met.

Entry numbers (Day N, Attempt N) are calculated automatically.

## 5. Streaks

- A streak increases when at least one entry is logged on a scheduled day.
- Missing a scheduled day resets the current streak to zero. The best streak is always kept.
- There are no streak shields or freeze days.

## 6. Entries

- Multiple entries per day per tracker; edit and delete allowed.
- The first entry of the day activates the streak.
- Fields: notes (rich text with auto-save), optional duration in minutes, photo/video/link, optional small title.
- **Publish to community** toggle (off = keep only in my tracker). Private trackers cannot publish.
- **Writing helper (AI):** rewrites a rough note into a clearer post; the user accepts or undoes.
- The day belongs to the user's own timezone.
- **Save feedback:** a tactile "Save" button, the calendar circle pops in, and the streak counts up.

## 7. Privacy and Visibility

- **Private tracker:** visible only to the owner, including its calendar.
- **Public tracker:** visitors see details, streaks, and published entries only.
- **Calendar:** filled green circle = day with published entries. For the owner, a hollow ring = day with private entries only.

## 8. Deadlines and Completion

- Optional deadline. When it passes, the tracker becomes **Completed** automatically with a distinct gold label.
- The owner can **extend the deadline** at any time (returns to Active) or press **"I achieved my goal"**.
- Completing a goal prompts an optional celebration post.

## 9. Community (The Commons)

- **Tabs:** Following | Discover (For You). Thematic filters: Tech and Code, Movement and Health, Reading and Intellect, and more.
- **Follow = follow a tracker.** Feed shows posts from followed trackers.
- **Post card:** owner avatar, streak chip (current and best), tracker name (opens full tracker page), entry label (Day 12 / Attempt 3), text, media, reactions, comments.
- **Reactions (multiple, one per user per post):** Cheer 🔥, Applaud 👏, Love ❤️, Idea 💡, Sad 😢.
- **Comments** with replies; **Report and Block** from day one.
- **Discovery sidebar:** Trending Circles and suggested trackers to follow.

## 10. Screens and Navigation

**Persistent shell**
- **Top bar:** search ("Search trackers, habits, people..."), language switcher (AR/EN), light/dark toggle, notifications with badge, profile menu.
- **Left sidebar (right in RTL):** logo, prominent **+ Add Entry** button, nav: Dashboard, Community and Discover, My Trackers, Insights and Recap, Notifications and Settings; profile card with avatar and username.
- **Mobile:** bottom bar (Home, Community, floating +, Notifications, Profile).

**Screens:** Landing, Sign up/Log in, Onboarding, Home Dashboard, Analytics/Insights, My Trackers, Tracker Page (calendar + posts), Create Tracker, Add Entry modal, Community and Discover, Post Detail, Profile, Notifications, Settings, Premium, and dialogs (extend deadline, mark achieved, report, block, delete).

### Home Dashboard (the key screen)
1. **Greeting:** a friendly line such as "How was your day?" with the date.
2. **Today's habits:** pending trackers with a quick **Add entry / Complete and log** button; completed ones show a green check capsule.
3. **Activity calendar:** combined monthly matrix with green circles, today and rest days marked.
4. **My trackers:** active and completed lists, with streaks and deadline countdowns.
5. **Reactions and comments** on my posts.
6. **One recap card** (week in review). Deeper analytics live in Insights.

### Insights (Analytics)
- KPI ribbon: completed sessions, consistency rate, total focus time, and active streaks.
- Weekly completion chart (stacked bars per tracker), and per-tracker consistency bars (30 days).
- Monthly recap, progress analysis, and recommendations (full depth for Premium).

### Tracker Page
- Header metrics (days logged, consistency, reflections), view switcher **Calendar | Posts**, journey log feed, contextual sidebar (cadence progress like 5/7, guiding intention, resource links, fellow trackers).
- Owner actions: Add entry, edit, extend deadline, mark achieved. Visitor actions: Follow, share, report.

## 11. AI Features

1. **Writing helper:** polish a rough entry into a clear post.
2. **Monthly recap:** summary in plain language (entries, topics, projects, streaks).
3. **Progress analysis:** what was achieved and what to focus on next.
4. **Recommendations:** similar trackers and people.

AI is presented with plain names (Writing helper, Month recap), not sparkle or robot visuals. AI calls run server-side with limits on the free plan.

## 12. Monetization

**Free:** unlimited trackers and entries, streaks, calendar, community, limited AI.
**Premium:** advanced analytics, AI coaching, detailed monthly reports (PDF), personalized recommendations, extra customization (themes, covers).

## 13. Visual Direction (summary)

- **Style:** warm and clean. Cream canvas, white cards with thin sand borders, large rounded corners (16 to 24px), **tactile 3D buttons** (solid fill with a darker 3 to 4px bottom border and a pressed animation).
- **Primary green:** `#58CC02`, with button bottom border `#3D8F01`, hover `#4EB302`, soft background `#E2F8C5`, text/link green `#2B6C00`.
- **Streak amber:** `#F59E0B`, soft `#FEF3C7`.
- **Surfaces:** page `#FBF9F2`, cards `#FFFFFF`, borders `#E7E2D2`, text `#1E2522`, muted `#787B6E`.
- **Chart palette (charts and tracker category tags only):** green `#58CC02`, amber `#F59E0B`, sky `#0284C7`, coral `#E4572E`.
- **Type:** Plus Jakarta Sans (English) and Tajawal (Arabic), weights 400/500/700.
- **Motion:** spring on button press, circle pop on the calendar, streak count-up. Keep it quick (150 to 250 ms) and respect reduced-motion.
- **Mobile-first and fully mirrored in RTL.**
- **Contrast:** white text on `#58CC02` has low contrast, so use it only for large bold labels.

## 14. Technical Context

React frontend, Laravel API, MySQL database. Offline-first caching is postponed to the mobile companion phase.

## 15. Success Metrics

- 30-day retention: at least 45% of users keep one active tracker past 30 days.
- Average time to log an entry: under 15 seconds.
- Community engagement: at least 30% of daily active users react, comment, or post.

## 16. Roadmap

1. **MVP:** auth, create tracker (both types), Add Entry, streaks, calendar, dashboard.
2. **Community:** publish entries, feed, follow trackers, reactions, comments, report and block.
3. **Discovery and Insights:** search, categories, trending circles, recap and analysis.
4. **AI and Premium:** writing helper, monthly recap, recommendations, subscription.
5. **Mobile companion app:** iOS and Android, widgets, push reminders, offline cache.

## 17. Decisions Still Open

1. **Follow:** follow a tracker (v1 decision) or a user (current DB draft and Stitch designs)?
2. **Tracker type names:** are Journey / Habit (DB draft) the same as Daily / Flexible?
3. **Default privacy** for a new tracker: Public (design) or Private (DB draft)?
