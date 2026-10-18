const storageKey = "taqaddomi-my-trackers";
const detailsView = document.getElementById("tracker-details-view");
const notFound = document.getElementById("tracker-not-found");

function formatDate(value) {
  if (!value) return "Not set";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not set";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function addFact(container, label, value) {
  const item = document.createElement("article");
  item.className = "information-item";
  const name = document.createElement("span");
  name.textContent = label;
  const detail = document.createElement("strong");
  detail.textContent = value || "Not set";
  item.append(name, detail);
  container.append(item);
}

function showEntry(entry) {
  const item = document.createElement("article");
  item.className = "entry-history-item";

  const header = document.createElement("div");
  header.className = "entry-history-top";
  const date = document.createElement("time");
  date.textContent = formatDate(entry.createdAt);
  const visibility = document.createElement("span");
  visibility.className = "entry-visibility";
  const visibilityIcon = document.createElement("span");
  visibilityIcon.className = "icon";
  visibilityIcon.textContent = entry.published ? "public" : "lock";
  const visibilityText = document.createElement("span");
  visibilityText.textContent = entry.published ? "Published to community" : "Private entry";
  visibility.append(visibilityIcon, visibilityText);
  header.append(date, visibility);

  const description = document.createElement("p");
  description.textContent = entry.description || "No description provided.";
  item.append(header, description);

  if (Array.isArray(entry.attachments) && entry.attachments.length) {
    const attachments = document.createElement("div");
    attachments.className = "entry-attachment-names";
    entry.attachments.forEach((attachment) => {
      const name = document.createElement("span");
      name.textContent = attachment.name;
      attachments.append(name);
    });
    item.append(attachments);
  }

  return item;
}

let trackers = [];
try {
  trackers = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (!Array.isArray(trackers)) trackers = [];
} catch {
  trackers = [];
}

const trackerId = new URLSearchParams(window.location.search).get("id");
const tracker = trackers.find((item) => item.id === trackerId);

if (!tracker) {
  detailsView.hidden = true;
  notFound.hidden = false;
} else {
  const entries = Array.isArray(tracker.entries) ? tracker.entries : [];
  const category = tracker.category || "Other";
  const isCompleted = tracker.status === "completed";
  const format = tracker.format === "Flexible" ? "Flexible Cadence" : "Daily Rhythm";
  const unit = tracker.format === "Flexible" ? (tracker.counterUnit || "Session") : "Day";
  const cover = document.getElementById("tracker-cover");

  document.title = `${tracker.name} | Taqaddomi`;
  document.getElementById("tracker-title").textContent = tracker.name;
  document.getElementById("tracker-subtitle").textContent = tracker.intention || "Your habit journey and progress at a glance.";
  document.getElementById("tracker-category").textContent = category;

  const status = document.getElementById("tracker-status");
  status.textContent = isCompleted ? "Completed" : "Active";
  if (isCompleted) status.classList.add("is-completed");

  const coverIcon = document.getElementById("tracker-cover-icon");
  const categoryIcons = { Programming: "code", Fitness: "directions_run", Languages: "translate", Reading: "menu_book", Habits: "spa", Creative: "palette", Other: "track_changes" };
  coverIcon.textContent = categoryIcons[category] || "track_changes";
  if (tracker.picture) {
    cover.style.backgroundImage = `url("${tracker.picture}")`;
    cover.style.backgroundSize = "cover";
    cover.style.backgroundPosition = "center";
    coverIcon.hidden = true;
  }

  document.getElementById("entry-total").textContent = entries.length;
  document.getElementById("format-summary").textContent = format;
  document.getElementById("privacy-summary").textContent = tracker.privacy || "Private";

  const facts = document.getElementById("details-facts");
  addFact(facts, "Category", category);
  addFact(facts, "Status", isCompleted ? "Completed" : "Active");
  addFact(facts, "Tracking format", format);
  addFact(facts, "Visibility", tracker.privacy || "Private");
  addFact(facts, "Start date", formatDate(tracker.startDate));
  addFact(facts, "Target date", formatDate(tracker.targetDate));
  addFact(facts, "Created", formatDate(tracker.createdAt));

  if (tracker.format === "Flexible") {
    document.getElementById("counter-unit-item").hidden = false;
    document.getElementById("info-counter-unit").textContent = tracker.counterUnit || "Session";
  }

  if (tracker.intention) {
    document.getElementById("intention-panel").hidden = false;
    document.getElementById("tracker-intention").textContent = tracker.intention;
  }

  document.getElementById("entry-count-badge").textContent = `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`;
  const history = document.getElementById("entry-history");
  if (entries.length) {
    entries.slice().reverse().forEach((entry) => history.append(showEntry(entry)));
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty-entry-history";
    emptyMessage.textContent = `No entries yet. Your first ${unit.toLowerCase()} will appear here.`;
    history.append(emptyMessage);
  }
}
