# Frontend structure

- `pages/` contains one folder per screen. Each page keeps its HTML, page CSS, and small page-specific JavaScript together.
- `components/app-shell.js` renders the shared sidebar and top navigation. Each page includes an `#app-sidebar` element with a `data-active-page` value to mark its selected navigation item.
- `components/public-navbar.js` renders one shared navbar for the landing, login, and create-account pages. Those pages include a `#public-navbar` placeholder with a `data-page` value.
- `styles/theme.css` contains shared colors and basic styles.
- `styles/components.css` contains the shared sidebar and top navigation styled after the My Trackers reference.
- `styles/buttons.css` is the single source for shared button colors, rounded corners, hover, and press effects. Green primary actions use `btn-tactile-green`, `tactile-button-green`, or the `primary-button` alias; white and orange buttons use their matching tactile classes.

The app includes `pages/my-trackers/` and `pages/tracker-details/`. Each tracker card links to its full details page. Add Entry is a reusable card component in `components/add-entry-card.css`, shown in a popup from each tracker card. My Trackers saves trackers and their entries in local storage.

The landing page links its sign-in action to pages/login/ and its sign-up calls to pages/create-account/. The account pages link to each other and back to the landing page.
