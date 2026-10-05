# Taqaddomi: Project Description

## 1. Overview

**Taqaddomi** (Arabic: تقدّمي, "my progress") is a bilingual (Arabic and English) web platform for setting personal goals and documenting progress toward them, inside a community of people doing the same.

The platform combines four things:

**Goal Tracking + Progress Documentation + Community + AI**

Most goal-tracking apps are private checklists or number counters. Taqaddomi treats progress as a story: a user creates a **tracker** for a goal, then keeps adding **entries** (notes, photos, videos, links) about what they did. Entries can stay private or be shared as posts. Other people can follow the tracker, react, and comment. AI uses the documented progress to analyze, summarize, and recommend.

**Example:** a student creates a tracker called "Learn Flutter in 3 Months". Every day they add an entry with a screenshot and a short note. Their streak grows, a calendar fills with colored circles, and other Flutter learners follow the tracker and comment.

## 2. Target Audience

- Students
- People learning new skills (programming, languages, instruments)
- Athletes and fitness users
- People building habits
- Anyone who wants to document and share their progress

## 3. Design Principles

1. **Simplicity first.** Creating a tracker or adding an entry must take under a minute. Show only what is essential; hide everything else behind an "Additional options" control.
2. **Progress should feel visible and rewarding.** Streaks, calendar circles, and a clear completed state.
3. **Private by default is always possible.** Sharing is a choice, never forced.
4. **Bilingual from day one.** Full Arabic (RTL) and English (LTR) support in the UI.
5. **Consistent theme.** One theme color is used across the site (calendar circles, highlights, buttons).

## 4. Core Concepts

| Concept | Meaning |
|---|---|
| **Tracker** | A goal or journey the user documents (e.g. "Learn Flutter", "Break my 5K record"). |
| **Entry** | A single progress update inside a tracker: notes plus optional photo, video, or link. |
| **Streak** | A count of consecutive successful periods for a tracker. Belongs to the tracker, not the account. |
| **Post** | An entry the user chose to publish to the community feed. |
| **Category** | Main category with sub-categories (e.g. Sports → Football, Running, Gym). |
| **Follow** | Following a specific tracker (not a whole account). |

## 5. Tracker Types

There are exactly **two** tracker types. The user chooses one at creation.

### 5.1 Daily

For documenting a journey day by day.

- Expectation: one or more entries every day.
- Entries are automatically numbered: "Day 1", "Day 2", "Day 3"...
- Streak counts **consecutive days** with at least one entry.
- Missing a day resets the current streak to zero. The max streak is always kept.

### 5.2 Flexible

For habits, attempts, sessions, or anything that is not strictly daily (for example, trying to break a personal record, going to the gym 3 times per week, or practicing on certain days).

- The user picks a **counter label**: **Attempt**, **Session**, or **Update**. Entries are then numbered automatically ("Attempt 3", "Session 5", "Update 2").
- The user may choose an **optional target**:
  - **No target:** just a counter, with no streak. Suited to record-breaking attempts or occasional documentation.
  - **Specific days:** e.g. Saturday, Monday, Wednesday. Streak counts consecutive scheduled days completed. Non-scheduled days never break the streak.
  - **X times per week:** e.g. 3 times per week. Streak counts consecutive **weeks** in which the target was met.

The entry number (Day N, Attempt N, Session N) is calculated automatically from the number of entries. The user never types it.

## 6. Creating a Tracker

The creation flow must feel light.

**First screen (essential only):**
1. **Title**
2. **Category** (main category, with sub-category selection when applicable)
3. **Type:** two large cards, **Daily** or **Flexible**, each with a one-line explanation

**If Flexible is chosen**, two extra choices appear:
- Counter label: Attempt / Session / Update
- Target (optional): none / specific days / X times per week

**Under an "Additional options" control (collapsed by default):**
- Cover image
- Description
- Sub-category
- Deadline (optional)
- Visibility: **Public** (default) or **Private**

A user should be able to create a complete tracker in about a minute and fill in details later.

## 7. Privacy

- A **Private** tracker is visible only to its owner: the tracker, its calendar, and all of its entries. Nothing from it appears anywhere in the community.
- A **Public** tracker has a visible page. Visitors see the tracker's details, streaks, and **published** entries only.
- The user can change a tracker's visibility later.

## 8. Deadlines and Completion

- A deadline is optional.
- When the deadline passes, the tracker **automatically becomes "Completed"** and its appearance changes (a visible completed state) so it is clear it has finished.
- The owner can **extend the deadline at any time**, which returns the tracker to "Active". Deadlines are never static.
- The owner can also press **"I achieved my goal"** to complete the tracker manually.
- A completed tracker and its entries remain viewable.

## 9. Entries (Daily Check-in)

Each time the user opens their account, they are prompted to add an update for their active trackers.

**An entry can include:**
- Notes (text)
- An image, a video, or a link (optional attachments)
- A small title (optional)
- A switch: **"Publish to community"** (post) or **keep it only in my tracker** (private entry)

**Rules:**
- Multiple entries per day per tracker are allowed.
- Entries can be **edited and deleted** by the owner.
- The **first entry of the day** activates the streak automatically. Additional entries the same day do not increase it.
- If the last remaining entry of a day is deleted, the streak is recalculated from the entry history.
- Which "day" an entry belongs to follows the user's own timezone.
- A private entry can be published later, and a published entry can be set back to private.
- Entries on private trackers cannot be published (the tracker is private).

## 10. Streaks

- The streak belongs to the **tracker**, not the whole account.
- Each tracker stores a **current streak** and a **max streak**.
- Streak unit depends on tracker type:

| Tracker setup | Streak unit |
|---|---|
| Daily | Consecutive days |
| Flexible with specific days | Consecutive scheduled days completed |
| Flexible with X times per week | Consecutive weeks where the target was met |
| Flexible with no target | No streak, counter only |

- A post shows the tracker's current streak and max streak.

## 11. Tracker Page and Calendar

The tracker page lets visitors and the owner browse progress in **two switchable views**:

**Calendar view**
- A monthly calendar where days with entries are marked with a **circle in the site's theme color**.
- Clicking a day shows that day's content (the entries from that day).
- Visitors see circles only for days with **published** entries.
- The owner sees all days that have entries, with private-only days shown in a **different style**.

**Posts view**
- The same content as a chronological list of entry posts.

The tracker page also shows: title, description, category, owner, cover image, streaks, deadline and status, and a **Follow** button.

## 12. Community and Feed

### 12.1 Post anatomy (what the community sees)

When an entry is published as a post, the feed shows:
- The **owner's name** (and avatar)
- The **current streak** and **max streak** of that tracker
- The **tracker name**, clickable, which opens the full tracker page and its calendar
- The **entry label** (e.g. "Day 12" or "Attempt 3")
- A short title (if provided)
- The text body, with or without an image/video/link
- Reaction, comment, and follow controls

### 12.2 Interactions

- **Reactions:** multiple types (for example Like, Love, Sad, and more). A user has **one reaction per post** and can change or remove it.
- **Comments:** on posts, with replies.
- **Follow:** follows a **tracker**. The user's feed shows posts from followed trackers.
- To see someone's other trackers, the visitor opens the owner's profile, which lists their public trackers.

### 12.3 Discovery

- Browse and search trackers by category and sub-category.
- Discover similar trackers and goals.
- Recommendations (see AI features).

### 12.4 Safety

- Report button on posts, comments, and trackers.
- Ability to block users.
- Moderation tools for admins.

## 13. AI Features

AI works on the data users create (trackers, entries, notes). All AI calls happen server-side, with usage limits on the free plan.

1. **AI Post Assistant.** The user writes a rough or unfinished update, and AI turns it into a clearer, well-organized post. Fixes wording and structure without changing the facts.
2. **Monthly Progress Summary.** At the end of each month, AI generates a summary. Example: "This month you created 12 progress posts, completed 5 Flutter topics, and built 2 small projects." Summaries are generated in the background and saved.
3. **AI Progress Analysis.** AI reads a tracker's goal and entries, identifies what has been achieved, and suggests what to focus on next. Example: "You completed the basic Flutter concepts. Your next step could be API integration and state management."
4. **Personalized Recommendations.** Suggests useful content, similar trackers, and other users based on interests and progress. Example: someone learning Laravel is shown other people building Laravel projects.

**Recommended build order:** Post Assistant, then Monthly Summary, then Progress Analysis, then Recommendations (which needs the most data).

## 14. Monetization

A **Premium Subscription** model.

**Free:** basic goal tracking, entries, streaks, calendar, and community features, plus limited AI use.

**Premium:**
- Advanced progress analytics
- AI coaching
- Detailed monthly reports
- Personalized recommendations
- More customization options
- Streak protection (for example, freeze days)

## 15. Localization

- Interface languages: **Arabic (RTL)** and **English (LTR)**.
- Category names exist in both languages.
- User-generated content (titles, notes, comments) is not translated automatically.

## 16. Suggested Build Phases

1. **MVP (personal):** Authentication, create tracker (both types), entries, streaks, calendar, profile. No social features yet.
2. **Social:** Publish entries as posts, feed, follow trackers, reactions, comments, reporting and blocking.
3. **Discovery:** Categories browsing, search, similar trackers.
4. **AI:** Post Assistant, Monthly Summary, Progress Analysis, Recommendations.
5. **Premium:** Subscription, advanced analytics, freeze days, extra customization.

## 17. Technical Stack (context only)

- **Frontend:** React
- **Backend:** Laravel (PHP), API-based
- **Database:** MySQL

## 18. Value Proposition

Taqaddomi turns personal progress into something **interactive and shared**. Instead of recording a number or ticking a task, users document a real journey, get motivation from a streak and calendar, and learn from people with similar goals, with AI helping them reflect, summarize, and decide what to do next.
