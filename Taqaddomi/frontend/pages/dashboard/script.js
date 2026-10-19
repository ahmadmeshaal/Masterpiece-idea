const trackersKey = "taqaddomi-my-trackers";
let trackers = [];
let profile = { name: "Kareem Zaid" };
try {
  trackers = JSON.parse(localStorage.getItem(trackersKey) || "[]");
  if (!Array.isArray(trackers)) trackers = [];
} catch {
  trackers = [];
}
try {
  profile = { ...profile, ...JSON.parse(localStorage.getItem("taqaddomi-profile") || "{}") };
} catch {
  // Keep the default greeting when profile data is unavailable.
}

function localDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getEntriesForDate(date) {
  const key = localDateKey(date);
  return trackers.flatMap((tracker) => (Array.isArray(tracker.entries) ? tracker.entries : [])
    .filter((entry) => {
      const created = new Date(entry.createdAt);
      return !Number.isNaN(created.getTime()) && localDateKey(created) === key;
    })
    .map((entry) => ({ tracker, entry })));
}

function renderWelcome() {
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  document.getElementById("greeting").textContent = greeting;
  document.getElementById("greeting-name").textContent = (profile.name || "friend").trim().split(/\s+/)[0];
  document.getElementById("today-date").textContent = new Intl.DateTimeFormat("en", { weekday: "long", month: "long", day: "numeric" }).format(now);
}

function renderWeek() {
  const strip = document.getElementById("week-strip");
  strip.replaceChildren();
  const now = new Date();
  const mondayOffset = (now.getDay() + 6) % 7;
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - mondayOffset);
  let activeDays = 0;

  for (let index = 0; index < 7; index += 1) {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + index);
    const logged = getEntriesForDate(date).length > 0;
    if (logged) activeDays += 1;
    const tile = document.createElement("div");
    tile.className = `week-day${localDateKey(date) === localDateKey(now) ? " is-today" : ""}${logged ? " has-activity" : ""}`;
    const name = document.createElement("span");
    name.className = "week-day-name";
    name.textContent = new Intl.DateTimeFormat("en", { weekday: "short" }).format(date);
    const number = document.createElement("span");
    number.className = "week-day-number";
    number.textContent = date.getDate();
    const indicator = document.createElement("span");
    indicator.className = "week-day-check";
    indicator.textContent = logged ? "✓" : "";
    tile.append(name, number, indicator);
    strip.append(tile);
  }
  document.getElementById("week-summary").textContent = `${activeDays} ${activeDays === 1 ? "day" : "days"} logged this week`;
}

function renderTodayFocus() {
  const list = document.getElementById("today-tracker-list");
  list.replaceChildren();
  const today = new Date();
  const activeTrackers = trackers.filter((tracker) => tracker.status !== "completed");
  const todayTrackerIds = new Set(getEntriesForDate(today).map(({ tracker }) => tracker.id));
  const completedToday = activeTrackers.filter((tracker) => todayTrackerIds.has(tracker.id)).length;
  document.getElementById("today-progress-badge").textContent = `${completedToday} / ${activeTrackers.length}`;
  document.getElementById("today-progress-bar").style.width = activeTrackers.length
    ? `${Math.round((completedToday / activeTrackers.length) * 100)}%`
    : "0%";

  if (!activeTrackers.length) {
    const empty = document.createElement("div");
    empty.className = "today-empty";
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = "spa";
    const title = document.createElement("h3");
    title.textContent = trackers.length ? "All your trackers are complete" : "Nothing on your list yet";
    const message = document.createElement("p");
    message.textContent = trackers.length ? "Enjoy the progress you’ve made, or start a new goal when you’re ready." : "Create your first tracker and it will appear here as a daily focus.";
    const link = document.createElement("a");
    link.className = "btn-tactile-green";
    link.href = "../my-trackers/index.html?open-create=1";
    link.innerHTML = 'Create a tracker <span class="icon">arrow_forward</span>';
    empty.append(icon, title, message, link);
    list.append(empty);
    return;
  }

  activeTrackers.forEach((tracker) => {
    const done = todayTrackerIds.has(tracker.id);
    const row = document.createElement("article");
    row.className = "today-tracker-row";
    const icon = document.createElement("span");
    icon.className = "today-tracker-icon icon";
    const icons = { Programming: "code", Fitness: "directions_run", Languages: "translate", Reading: "menu_book", Habits: "spa", Creative: "palette" };
    icon.textContent = icons[tracker.category] || "track_changes";
    const copy = document.createElement("div");
    copy.className = "today-tracker-copy";
    const name = document.createElement("strong");
    name.textContent = tracker.name || "Untitled tracker";
    const detail = document.createElement("small");
    detail.textContent = `${tracker.category || "Tracker"} · ${done ? "You checked in today" : "A small step is waiting"}`;
    copy.append(name, detail);
    const action = document.createElement("a");
    action.className = `today-tracker-action${done ? " is-done" : ""}`;
    action.innerHTML = done ? '<span class="icon">check_circle</span>Done today' : '<span class="icon">add</span>Add entry';
    if (done) {
      action.setAttribute("aria-disabled", "true");
    } else {
      action.href = `../my-trackers/index.html?open-entry=1&tracker-id=${encodeURIComponent(tracker.id)}`;
    }
    row.append(icon, copy, action);
    list.append(row);
  });
}

renderWelcome();
renderWeek();
renderTodayFocus();
