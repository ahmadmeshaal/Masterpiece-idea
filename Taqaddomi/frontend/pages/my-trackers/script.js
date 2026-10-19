const emptyState = document.getElementById("empty-state");
const noResults = document.getElementById("no-results");
const trackerGrid = document.getElementById("tracker-grid");
const trackerDialog = document.getElementById("tracker-dialog");
const trackerForm = document.getElementById("tracker-form");
const trackerName = document.getElementById("tracker-name");
const trackerCategory = document.getElementById("tracker-category");
const trackerFormat = document.getElementById("tracker-format");
const trackerPrivacy = document.getElementById("tracker-privacy");
const openTrackerForm = document.getElementById("open-tracker-form");
const closeTrackerForm = document.getElementById("close-tracker-form");
const cancelTrackerForm = document.getElementById("cancel-tracker-form");
const titleCount = document.getElementById("title-count");
const counterOptions = document.getElementById("counter-options");
const trackerPicture = document.getElementById("tracker-picture");
const uploadPreview = document.getElementById("upload-preview");
const uploadPlaceholder = document.getElementById("upload-placeholder");
const uploadChangeLabel = document.getElementById("upload-change-label");
const uploadError = document.getElementById("upload-error");
const entryDialog = document.getElementById("entry-dialog");
const deleteDialog = document.getElementById("delete-dialog");
const deleteDialogMessage = document.getElementById("delete-dialog-message");
const entryForm = document.getElementById("entry-form");
const entryTrackerToggle = document.getElementById("entry-tracker-toggle");
const entryTrackerLabel = document.getElementById("entry-tracker-label");
const entryTrackerMenu = document.getElementById("entry-tracker-menu");
const entryDay = document.getElementById("entry-day");
const entryNotes = document.getElementById("entry-notes");
const entryAttachmentList = document.getElementById("entry-attachment-list");
const entryCommunityToggle = document.getElementById("entry-community-toggle");
const entryPhotoInput = document.getElementById("entry-photo-input");
const entryVideoInput = document.getElementById("entry-video-input");
const storageKey = "taqaddomi-my-trackers";

const categoryIcons = {
  Programming: "code",
  Fitness: "directions_run",
  Languages: "translate",
  Reading: "menu_book",
  Habits: "spa",
  Creative: "palette",
  Learning: "menu_book",
  Wellness: "spa",
  "Personal Growth": "track_changes",
  Other: "flag"
};

let trackers = [];
let trackerPictureData = "";

try {
  trackers = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (!Array.isArray(trackers)) trackers = [];
} catch {
  trackers = [];
}

trackers.forEach((tracker, index) => {
  if (!tracker.id) tracker.id = `tracker-${Date.now()}-${index}`;
  if (!Array.isArray(tracker.entries)) tracker.entries = [];
  if (!tracker.status) tracker.status = "active";
});

let activeEntryTrackerId = "";
let entryAttachments = [];
let pendingDeleteTrackerId = "";
let activeFilter = "all";

function makeTrackerCard(tracker) {
  const card = document.createElement("article");
  card.className = "tracker-card";

  const cover = document.createElement("div");
  cover.className = "tracker-card-cover";
  if (tracker.picture) {
    cover.style.backgroundImage = `linear-gradient(#1b1c1720, #1b1c1740), url("${tracker.picture}")`;
    cover.style.backgroundSize = "cover";
    cover.style.backgroundPosition = "center";
  }

  const icon = document.createElement("span");
  icon.className = "icon";
  icon.textContent = categoryIcons[tracker.category] || categoryIcons.Other;
  if (tracker.picture) icon.hidden = true;
  cover.append(icon);

  const content = document.createElement("div");
  content.className = "tracker-card-content";

  const category = document.createElement("span");
  category.className = "tracker-card-category";
  category.textContent = tracker.category;

  const title = document.createElement("h2");
  title.textContent = tracker.name;

  const description = document.createElement("p");
  description.textContent = "Your new habit starts today.";

  const statusButton = document.createElement("button");
  const isCompleted = tracker.status === "completed";
  statusButton.className = `tracker-status-button${isCompleted ? " is-completed" : ""}`;
  statusButton.type = "button";
  statusButton.dataset.toggleStatus = tracker.id;
  statusButton.innerHTML = isCompleted
    ? '<span class="icon">check_circle</span><span>Completed · Reactivate</span>'
    : '<span class="icon">radio_button_unchecked</span><span>Mark complete</span>';

  content.append(category, title, description, statusButton);

  const actions = document.createElement("div");
  actions.className = "tracker-card-actions";

  const addEntryButton = document.createElement("button");
  addEntryButton.className = "btn-tactile-green tracker-card-add-entry";
  addEntryButton.type = "button";
  addEntryButton.dataset.addEntry = tracker.id;
  addEntryButton.innerHTML = '<span class="icon">add</span><span>Add Entry</span>';

  const deleteButton = document.createElement("button");
  deleteButton.className = "btn-tactile-white tracker-card-delete";
  deleteButton.type = "button";
  deleteButton.dataset.deleteTracker = tracker.id;
  deleteButton.setAttribute("aria-label", `Delete ${tracker.name}`);
  deleteButton.title = "Delete tracker";
  deleteButton.innerHTML = '<span class="icon">delete</span>';
  actions.append(addEntryButton, deleteButton);
  content.append(actions);

  const footer = document.createElement("div");
  footer.className = "tracker-card-footer";
  const entryCount = tracker.entries.length;
  const progress = document.createElement("span");
  if (entryCount === 0) {
    progress.textContent = "Day 1 · No entries yet";
  } else {
    const unit = tracker.format === "Flexible" ? (tracker.counterUnit || "Session") : "Day";
    progress.textContent = `${unit} ${entryCount} · ${entryCount} ${entryCount === 1 ? "entry" : "entries"}`;
  }

  const detailsLink = document.createElement("a");
  detailsLink.className = "tracker-view-details";
  detailsLink.href = `../tracker-details/index.html?id=${encodeURIComponent(tracker.id)}`;
  detailsLink.innerHTML = '<span>View Details</span><span class="icon">arrow_forward</span>';

  footer.append(progress, detailsLink);
  card.append(cover, content, footer);
  return card;
}

function renderTrackers() {
  const activeCount = trackers.filter((tracker) => tracker.status !== "completed").length;
  const completedCount = trackers.length - activeCount;
  const entriesCount = trackers.reduce((sum, tracker) => sum + tracker.entries.length, 0);
  document.getElementById("count-all").textContent = trackers.length;
  document.getElementById("count-active").textContent = activeCount;
  document.getElementById("count-completed").textContent = completedCount;
  document.getElementById("stat-total").textContent = trackers.length;
  document.getElementById("stat-active").textContent = activeCount;
  document.getElementById("stat-completed").textContent = completedCount;
  document.getElementById("stat-entries").textContent = entriesCount;

  const visibleTrackers = trackers.filter((tracker) => {
    if (activeFilter === "active") return tracker.status !== "completed";
    if (activeFilter === "completed") return tracker.status === "completed";
    return true;
  });
  trackerGrid.replaceChildren(...visibleTrackers.map(makeTrackerCard));
  emptyState.hidden = trackers.length > 0;
  noResults.hidden = trackers.length === 0 || visibleTrackers.length > 0;
  trackerGrid.hidden = visibleTrackers.length === 0;
}

function saveTrackers() {
  localStorage.setItem(storageKey, JSON.stringify(trackers));
}

function openDialog() {
  trackerDialog.showModal();
  trackerName.focus();
}

function closeDialog() {
  trackerDialog.close();
  trackerForm.reset();
  trackerPictureData = "";
  uploadPreview.removeAttribute("src");
  uploadPreview.hidden = true;
  uploadPlaceholder.hidden = false;
  uploadChangeLabel.hidden = true;
  uploadError.hidden = true;
  uploadError.textContent = "";
  trackerCategory.value = "Programming";
  trackerFormat.value = "Daily";
  trackerPrivacy.value = "Private";
  titleCount.textContent = "0 / 80";
  counterOptions.hidden = true;
  document.querySelectorAll(".choice-chip").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.category === "Programming");
  });
  document.querySelectorAll(".format-card[data-format]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.format === "Daily");
  });
  document.querySelectorAll(".format-card[data-privacy]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.privacy === "Private");
  });
}

openTrackerForm.addEventListener("click", openDialog);
closeTrackerForm.addEventListener("click", closeDialog);
cancelTrackerForm.addEventListener("click", closeDialog);

document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle("is-active", selected);
      tab.setAttribute("aria-pressed", String(selected));
    });
    renderTrackers();
  });
});

document.getElementById("show-all-trackers").addEventListener("click", () => {
  document.querySelector('[data-filter="all"]').click();
});

trackerName.addEventListener("input", () => {
  titleCount.textContent = `${trackerName.value.length} / 80`;
});

document.querySelectorAll(".choice-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".choice-chip").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    trackerCategory.value = button.dataset.category;
  });
});

document.querySelectorAll(".format-card[data-format]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".format-card[data-format]").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    trackerFormat.value = button.dataset.format;
    counterOptions.hidden = button.dataset.format !== "Flexible";
  });
});

document.querySelectorAll(".format-card[data-privacy]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".format-card[data-privacy]").forEach((item) => item.classList.remove("is-selected"));
    button.classList.add("is-selected");
    trackerPrivacy.value = button.dataset.privacy;
  });
});

function compressTrackerPicture(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read this picture."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("This picture could not be opened."));
      image.onload = () => {
        const maxSide = 900;
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read this file."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(file);
  });
}

trackerPicture.addEventListener("change", async () => {
  const file = trackerPicture.files[0];
  uploadError.hidden = true;
  uploadError.textContent = "";
  if (!file) return;
  if (!["image/png", "image/jpeg"].includes(file.type)) {
    trackerPicture.value = "";
    uploadError.textContent = "Choose a PNG or JPG image.";
    uploadError.hidden = false;
    return;
  }
  if (file.size > 5 * 1024 * 1024) {
    trackerPicture.value = "";
    uploadError.textContent = "The image must be 5MB or smaller.";
    uploadError.hidden = false;
    return;
  }
  try {
    trackerPictureData = await compressTrackerPicture(file);
    uploadPreview.src = trackerPictureData;
    uploadPreview.hidden = false;
    uploadPlaceholder.hidden = true;
    uploadChangeLabel.hidden = false;
  } catch (error) {
    uploadError.textContent = error.message;
    uploadError.hidden = false;
  }
});

trackerDialog.addEventListener("click", (event) => {
  if (event.target === trackerDialog) closeDialog();
});

trackerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(trackerForm);
  const tracker = {
    id: `tracker-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: String(formData.get("name")).trim(),
    category: String(formData.get("category")),
    format: String(formData.get("format")),
    privacy: String(formData.get("privacy")),
    status: "active",
    intention: String(formData.get("intention") || ""),
    counterUnit: String(formData.get("counterUnit") || "Session"),
    startDate: String(formData.get("startDate") || ""),
    targetDate: String(formData.get("targetDate") || ""),
    picture: trackerPictureData,
    entries: [],
    createdAt: new Date().toISOString()
  };

  if (!tracker.name) return;

  trackers.push(tracker);
  saveTrackers();
  renderTrackers();
  closeDialog();
});

function updateEntryTrackerDisplay(tracker) {
  activeEntryTrackerId = tracker.id;
  entryTrackerLabel.textContent = tracker.name;
  const count = tracker.entries.length;
  const unit = tracker.format === "Flexible" ? (tracker.counterUnit || "Session") : "Day";
  entryDay.textContent = `${unit} ${count + 1}`;
}

function openEntryDialog(trackerId) {
  const tracker = trackers.find((item) => item.id === trackerId) || trackers[0];
  if (!tracker) return;

  updateEntryTrackerDisplay(tracker);
  entryTrackerMenu.replaceChildren();
  trackers.forEach((item) => {
    const option = document.createElement("button");
    option.type = "button";
    option.dataset.trackerId = item.id;
    const dot = document.createElement("span");
    dot.className = "tracker-dot";
    const name = document.createTextNode(item.name);
    const day = document.createElement("small");
    day.textContent = `${item.format === "Flexible" ? (item.counterUnit || "Session") : "Day"} ${item.entries.length + 1}`;
    option.append(dot, name, day);
    entryTrackerMenu.append(option);
  });

  entryAttachments = [];
  renderEntryAttachments();
  entryForm.reset();
  entryCommunityToggle.checked = tracker.privacy !== "Private";
  entryDialog.showModal();
  entryNotes.focus();
}

function closeEntryDialog() {
  if (entryDialog.open) entryDialog.close();
  entryForm.reset();
  entryAttachments = [];
  renderEntryAttachments();
  entryTrackerMenu.hidden = true;
  entryTrackerToggle.setAttribute("aria-expanded", "false");
}

function renderEntryAttachments() {
  entryAttachmentList.replaceChildren();
  entryAttachments.forEach((attachment, index) => {
    const chip = document.createElement("div");
    chip.className = "attachment-chip";
    const icon = document.createElement("span");
    icon.className = "image-preview";
    icon.textContent = attachment.type === "link" ? "🔗" : attachment.type === "video" ? "🎬" : "🖼️";
    const label = document.createElement("span");
    label.textContent = attachment.name;
    const remove = document.createElement("button");
    remove.type = "button";
    remove.setAttribute("aria-label", `Remove ${attachment.name}`);
    remove.innerHTML = '<span class="icon">close</span>';
    remove.addEventListener("click", () => {
      entryAttachments.splice(index, 1);
      renderEntryAttachments();
    });
    chip.append(icon, label, remove);
    entryAttachmentList.append(chip);
  });
}

trackerGrid.addEventListener("click", (event) => {
  const statusButton = event.target.closest("[data-toggle-status]");
  if (statusButton) {
    const tracker = trackers.find((item) => item.id === statusButton.dataset.toggleStatus);
    if (!tracker) return;
    tracker.status = tracker.status === "completed" ? "active" : "completed";
    saveTrackers();
    renderTrackers();
    return;
  }

  const addButton = event.target.closest("[data-add-entry]");
  if (addButton) {
    openEntryDialog(addButton.dataset.addEntry);
    return;
  }

  const deleteButton = event.target.closest("[data-delete-tracker]");
  if (!deleteButton) return;

  const tracker = trackers.find((item) => item.id === deleteButton.dataset.deleteTracker);
  if (!tracker) return;
  pendingDeleteTrackerId = tracker.id;
  deleteDialogMessage.textContent = `“${tracker.name}” and its saved entries will be deleted.`;
  deleteDialog.showModal();
});

document.getElementById("cancel-delete").addEventListener("click", () => deleteDialog.close());
deleteDialog.addEventListener("click", (event) => {
  if (event.target === deleteDialog) deleteDialog.close();
});
deleteDialog.addEventListener("close", () => {
  pendingDeleteTrackerId = "";
});
document.getElementById("confirm-delete").addEventListener("click", () => {
  if (!pendingDeleteTrackerId) return;
  trackers = trackers.filter((item) => item.id !== pendingDeleteTrackerId);
  saveTrackers();
  renderTrackers();
  deleteDialog.close();
});

entryTrackerToggle.addEventListener("click", () => {
  const isOpen = entryTrackerToggle.getAttribute("aria-expanded") === "true";
  entryTrackerToggle.setAttribute("aria-expanded", String(!isOpen));
  entryTrackerMenu.hidden = isOpen;
});

entryTrackerMenu.addEventListener("click", (event) => {
  const option = event.target.closest("[data-tracker-id]");
  if (!option) return;
  const tracker = trackers.find((item) => item.id === option.dataset.trackerId);
  if (tracker) updateEntryTrackerDisplay(tracker);
  entryTrackerMenu.hidden = true;
  entryTrackerToggle.setAttribute("aria-expanded", "false");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".tracker-picker")) {
    entryTrackerMenu.hidden = true;
    entryTrackerToggle.setAttribute("aria-expanded", "false");
  }
});

document.getElementById("close-entry-dialog").addEventListener("click", closeEntryDialog);
document.getElementById("cancel-entry-dialog").addEventListener("click", closeEntryDialog);
entryDialog.addEventListener("click", (event) => {
  if (event.target === entryDialog) closeEntryDialog();
});

document.querySelectorAll("[data-attachment]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.attachment === "image") entryPhotoInput.click();
    if (button.dataset.attachment === "video") entryVideoInput.click();
    if (button.dataset.attachment === "link") {
      const url = window.prompt("Paste a link to attach:");
      if (url && url.trim()) {
        entryAttachments.push({ type: "link", name: url.trim() });
        renderEntryAttachments();
      }
    }
  });
});

entryPhotoInput.addEventListener("change", async () => {
  for (const file of Array.from(entryPhotoInput.files)) {
    if (file.size > 10 * 1024 * 1024) {
      window.alert(`${file.name} is too large. Choose a photo under 10MB.`);
      continue;
    }
    try {
      const dataUrl = await compressTrackerPicture(file);
      entryAttachments.push({ type: "image", name: file.name, dataUrl });
    } catch (error) {
      window.alert(error.message);
    }
  }
  entryPhotoInput.value = "";
  renderEntryAttachments();
});
entryVideoInput.addEventListener("change", async () => {
  for (const file of Array.from(entryVideoInput.files)) {
    if (file.size > 1024 * 1024) {
      window.alert(`${file.name} is too large. Choose a video under 1MB so it can be saved with the tracker.`);
      continue;
    }
    try {
      const dataUrl = await readFileAsDataUrl(file);
      entryAttachments.push({ type: "video", name: file.name, dataUrl });
    } catch (error) {
      window.alert(error.message);
    }
  }
  entryVideoInput.value = "";
  renderEntryAttachments();
});

document.getElementById("polish-entry").addEventListener("click", () => {
  const text = entryNotes.value.trim();
  if (!text) return;
  entryNotes.value = text.charAt(0).toUpperCase() + text.slice(1).replace(/[.!?]*$/, ".");
  entryNotes.focus();
});

entryForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const tracker = trackers.find((item) => item.id === activeEntryTrackerId);
  const description = entryNotes.value.trim();
  if (!tracker || !description) return;

  tracker.entries.push({
    description,
    published: entryCommunityToggle.checked,
    attachments: entryAttachments.map((item) => ({ ...item })),
    createdAt: new Date().toISOString()
  });
  saveTrackers();
  renderTrackers();
  closeEntryDialog();
});

window.addEventListener("taqaddomi:open-entry", (event) => {
  if (trackers.length) openEntryDialog(event.detail?.trackerId || trackers[0].id);
  else openDialog();
});

window.addEventListener("taqaddomi:open-create-tracker", openDialog);

renderTrackers();
saveTrackers();

const pageParams = new URLSearchParams(window.location.search);
if (pageParams.has("open-entry")) {
  const trackerId = pageParams.get("tracker-id");
  window.setTimeout(() => window.dispatchEvent(new CustomEvent("taqaddomi:open-entry", { detail: { trackerId } })), 0);
  window.history.replaceState({}, "", window.location.pathname);
} else if (pageParams.has("open-create")) {
  window.setTimeout(() => window.dispatchEvent(new CustomEvent("taqaddomi:open-create-tracker")), 0);
  window.history.replaceState({}, "", window.location.pathname);
}
