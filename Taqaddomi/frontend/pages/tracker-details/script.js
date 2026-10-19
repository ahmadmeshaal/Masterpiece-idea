const storageKey = "taqaddomi-my-trackers";
const detailsView = document.getElementById("tracker-details-view");
const notFound = document.getElementById("tracker-not-found");
const editDialog = document.getElementById("edit-tracker-dialog");
const editForm = document.getElementById("edit-tracker-form");
const editFormat = document.getElementById("edit-tracker-format");
const editCounterUnitField = document.getElementById("edit-counter-unit-field");
let displayedMonth;
let selectedCalendarDate = "";
let entriesByDate = new Map();

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

function dateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderCalendar() {
  const calendar = document.getElementById("activity-calendar");
  const monthLabel = document.getElementById("calendar-month-label");
  calendar.replaceChildren();
  monthLabel.textContent = new Intl.DateTimeFormat("en", { month: "long", year: "numeric" }).format(displayedMonth);

  const firstDay = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), 1).getDay();
  const daysInMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0).getDate();
  const todayKey = dateKey(new Date());

  for (let blank = 0; blank < firstDay; blank += 1) {
    const cell = document.createElement("span");
    cell.className = "calendar-empty-cell";
    cell.setAttribute("role", "gridcell");
    cell.setAttribute("aria-hidden", "true");
    calendar.append(cell);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), day);
    const key = dateKey(date);
    const dayEntries = entriesByDate.get(key) || [];
    const button = document.createElement("button");
    button.className = "calendar-day";
    button.type = "button";
    button.setAttribute("role", "gridcell");
    button.setAttribute("aria-label", `${new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(date)}${dayEntries.length ? `, ${dayEntries.length} ${dayEntries.length === 1 ? "entry" : "entries"}` : ", no entries"}`);
    button.setAttribute("aria-pressed", String(key === selectedCalendarDate));
    button.dataset.date = key;
    if (key === todayKey) button.classList.add("is-today");
    if (dayEntries.length) button.classList.add("has-entries");
    if (key === selectedCalendarDate) button.classList.add("is-selected");

    const number = document.createElement("span");
    number.className = "calendar-day-number";
    number.textContent = day;
    button.append(number);
    if (dayEntries.length > 1) {
      const count = document.createElement("small");
      count.className = "calendar-day-count";
      count.textContent = dayEntries.length;
      button.append(count);
    }
    button.addEventListener("click", () => selectCalendarDay(key));
    calendar.append(button);
  }
}

function selectCalendarDay(key) {
  selectedCalendarDate = key;
  renderCalendar();

  const date = new Date(`${key}T12:00:00`);
  const title = document.getElementById("selected-day-title");
  const results = document.getElementById("selected-day-entries");
  const dayEntries = entriesByDate.get(key) || [];
  title.textContent = new Intl.DateTimeFormat("en", { dateStyle: "full" }).format(date);
  results.replaceChildren();

  if (!dayEntries.length) {
    const empty = document.createElement("p");
    empty.className = "empty-selected-day";
    empty.textContent = "No entries were logged on this day.";
    results.append(empty);
    return;
  }

  dayEntries.forEach((entry) => results.append(showEntry(entry)));
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
  let newestEntryDate = null;
  entries.forEach((entry) => {
    const date = new Date(entry.createdAt);
    if (Number.isNaN(date.getTime())) return;
    const key = dateKey(date);
    if (!entriesByDate.has(key)) entriesByDate.set(key, []);
    entriesByDate.get(key).push(entry);
    if (!newestEntryDate || date > newestEntryDate) newestEntryDate = date;
  });
  const today = new Date();
  const calendarStart = newestEntryDate || today;
  displayedMonth = new Date(calendarStart.getFullYear(), calendarStart.getMonth(), 1);

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
    addFact(facts, "Counter unit", tracker.counterUnit || "Session");
  }

  if (tracker.intention) {
    document.getElementById("intention-panel").hidden = false;
    document.getElementById("tracker-intention").textContent = tracker.intention;
  }

  document.getElementById("entry-count-badge").textContent = `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`;
  renderCalendar();

  function changeMonth(offset) {
    displayedMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + offset, 1);
    selectedCalendarDate = "";
    document.getElementById("selected-day-title").textContent = "Select a day to view its entries";
    document.getElementById("selected-day-entries").replaceChildren();
    renderCalendar();
  }

  document.getElementById("calendar-previous").addEventListener("click", () => changeMonth(-1));
  document.getElementById("calendar-next").addEventListener("click", () => changeMonth(1));

  const editButton = document.getElementById("edit-tracker-button");
  const closeEditDialog = () => editDialog.close();
  editButton.addEventListener("click", () => {
    editForm.elements.name.value = tracker.name || "";
    editForm.elements.category.value = tracker.category || "Other";
    if (![...editForm.elements.category.options].some((option) => option.value === editForm.elements.category.value)) {
      editForm.elements.category.add(new Option(editForm.elements.category.value, editForm.elements.category.value));
    }
    editFormat.value = tracker.format || "Daily";
    editForm.elements.counterUnit.value = tracker.counterUnit || "Session";
    editCounterUnitField.hidden = editFormat.value !== "Flexible";
    editForm.elements.privacy.value = tracker.privacy || "Private";
    editForm.elements.intention.value = tracker.intention || "";
    editForm.elements.startDate.value = tracker.startDate || "";
    editForm.elements.targetDate.value = tracker.targetDate || "";
    editDialog.showModal();
  });
  editFormat.addEventListener("change", () => {
    editCounterUnitField.hidden = editFormat.value !== "Flexible";
  });
  document.getElementById("close-edit-tracker").addEventListener("click", closeEditDialog);
  document.getElementById("cancel-edit-tracker").addEventListener("click", closeEditDialog);
  editDialog.addEventListener("click", (event) => {
    if (event.target === editDialog) closeEditDialog();
  });
  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const values = new FormData(editForm);
    const name = String(values.get("name") || "").trim();
    if (!name) return;
    tracker.name = name;
    tracker.category = String(values.get("category"));
    tracker.format = String(values.get("format"));
    tracker.counterUnit = String(values.get("counterUnit") || "Session");
    tracker.privacy = String(values.get("privacy"));
    tracker.intention = String(values.get("intention") || "").trim();
    tracker.startDate = String(values.get("startDate") || "");
    tracker.targetDate = String(values.get("targetDate") || "");
    localStorage.setItem(storageKey, JSON.stringify(trackers));
    window.location.reload();
  });

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
