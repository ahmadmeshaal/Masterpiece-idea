# Taqaddomi

Taqaddomi is a habit and progress tracking app concept. Create trackers for routines and goals, record daily entries, and see your activity over time. The project currently contains a static front-end prototype built with HTML, CSS, and vanilla JavaScript.

LIVE URL:https://ahmadmeshaal.github.io/Masterpiece-idea/Taqaddomi/frontend/pages/landing-page/index.html

## Features

- Landing page, login screen, and account creation screen
- Dashboard with a weekly activity view and a checklist of active trackers for today
- Create, edit, complete, and delete trackers
- Add entries with notes and photo or video attachments
- Tracker detail pages with an activity calendar and entry history
- Community feed with search, comments, and reactions
- Profile page with editable profile details, a profile photo, and a cover photo
- Following list and suggested members for the prototype

## Run locally

No package installation is required. Start a local web server from the front-end folder:

You can also open `Taqaddomi/frontend/pages/landing-page/index.html` directly, though a local server gives more consistent browser behavior.

## Project structure

```text
Taqaddomi/
├── db/
│   ├── schema.dbml
│   └── taqaddomi-relationships-en.xlsx
└── frontend/
    ├── components/       # Shared navigation and reusable UI styles
    ├── pages/            # HTML, CSS, and JavaScript for each screen
    └── styles/           # Shared theme, components, and button styles
```

### Front-end pages

- `landing-page/` — public introduction and links to account screens
- `login/` and `create-account/` — account screen designs
- `dashboard/` — today's tracker checklist and weekly activity
- `my-trackers/` — tracker management and entry creation
- `tracker-details/` — tracker information, activity calendar, and entries
- `community-feed/` — published entries, comments, and reactions
- `profile/` — profile information, progress, followers, and following

## Data and prototype status

The front end seeds demo trackers, entries, profile details, followers, following, comments, and reactions the first time an app page opens. It only seeds trackers if the browser has no saved tracker data. All app data is kept in `localStorage`, so it stays in the current browser and is not synced to other users. Login and account creation use demo mode: any valid email and non-empty password can enter, and the account form saves a local profile. There is no real authentication or password storage yet. Real followers and shared community activity will need a backend.

The database folder contains the current relationship diagram and spreadsheet reference. The front end does not connect to a database yet.

To start with a fresh demo dataset, clear this site's local storage in your browser and reopen the app. The demo seed will be created again when no tracker data is saved.

## Future direction

The front end is organized into separate page folders so it can be migrated to React later. A future application can connect these screens to authentication, a database, and shared community features.
