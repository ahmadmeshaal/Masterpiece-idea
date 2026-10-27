const profileStorageKey = "taqaddomi-profile";
const followingStorageKey = "taqaddomi-following";
const followersStorageKey = "taqaddomi-followers";
const trackersStorageKey = "taqaddomi-my-trackers";

const suggestedPeople = [
  { id: "lina-haddad", name: "Lina Haddad", username: "linagrows", avatar: "🌷", bio: "Small steps, steady growth." },
  { id: "omar-saleh", name: "Omar Saleh", username: "omarfocus", avatar: "🏃", bio: "Building stronger routines every week." },
  { id: "maya-khalil", name: "Maya Khalil", username: "mayareads", avatar: "📚", bio: "A little reading every day." },
  { id: "adam-nasser", name: "Adam Nasser", username: "adamcodes", avatar: "💻", bio: "Learning by making things." }
];

function readArray(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}

function readProfile() {
  const defaults = { name: "Kareem Zaid", username: "kareemz", bio: "Building better habits, one day at a time.", avatar: "🌱" };
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(profileStorageKey) || "{}") };
  } catch {
    return defaults;
  }
}

let profile = readProfile();
let following = readArray(followingStorageKey);
let followers = readArray(followersStorageKey);
let trackers = readArray(trackersStorageKey);
let activePeopleTab = "following";

const profileEditor = document.getElementById("profile-editor");
const profileForm = document.getElementById("profile-form");
const peopleList = document.getElementById("people-list");

function renderProfile() {
  const avatar = document.getElementById("profile-avatar");
  avatar.textContent = profile.avatarImage ? "" : (profile.avatar || "🌱");
  avatar.style.backgroundImage = profile.avatarImage ? `url("${profile.avatarImage}")` : "none";
  document.getElementById("profile-cover").style.backgroundImage = profile.coverImage
    ? `linear-gradient(0deg, #17221125, transparent 45%), url("${profile.coverImage}")`
    : "";
  document.getElementById("profile-name").textContent = profile.name || "Taqaddomi member";
  document.getElementById("profile-handle").textContent = `@${profile.username || "member"}`;
  document.getElementById("profile-bio").textContent = profile.bio || "Add a little introduction to your profile.";

  const entries = trackers.flatMap((tracker) => (Array.isArray(tracker.entries) ? tracker.entries : []).map((entry) => ({ entry, tracker })));
  const publishedCount = entries.filter(({ entry }) => entry.published).length;
  const activeCount = trackers.filter((tracker) => tracker.status !== "completed").length;
  document.getElementById("profile-tracker-count").textContent = trackers.length;
  document.getElementById("profile-entry-count").textContent = entries.length;
  document.getElementById("profile-post-count").textContent = publishedCount;
  document.getElementById("following-count").textContent = following.length;
  document.getElementById("followers-count").textContent = followers.length;
  document.getElementById("following-tab-count").textContent = following.length;
  document.getElementById("followers-tab-count").textContent = followers.length;
  document.getElementById("active-tracker-count").textContent = `${activeCount} active ${activeCount === 1 ? "tracker" : "trackers"}`;
  document.getElementById("progress-summary-text").textContent = trackers.length
    ? `You have logged ${entries.length} ${entries.length === 1 ? "entry" : "entries"} across ${trackers.length} ${trackers.length === 1 ? "tracker" : "trackers"}. Keep going!`
    : "Start a tracker to see your progress grow here.";

  renderPeople();
  renderTrackers();
  renderActivity(entries);
}

function makePersonRow(person, isFollowing = false) {
  const row = document.createElement("div");
  row.className = "person-row";
  const avatar = document.createElement("span");
  avatar.className = "person-avatar";
  avatar.textContent = person.avatar || "🙂";
  const copy = document.createElement("div");
  copy.className = "person-copy";
  const name = document.createElement("strong");
  name.textContent = person.name || person.username || "Taqaddomi member";
  const username = document.createElement("small");
  username.textContent = `@${person.username || person.id}`;
  copy.append(name, username);
  row.append(avatar, copy);

  if (person.id && suggestedPeople.some((suggestion) => suggestion.id === person.id)) {
    const messageLink = document.createElement("a");
    messageLink.className = "person-message-button";
    messageLink.href = `../messages/index.html?to=${encodeURIComponent(person.id)}`;
    messageLink.textContent = "Message";
    row.append(messageLink);

    const button = document.createElement("button");
    button.className = `person-follow-button${isFollowing ? " is-following" : ""}`;
    button.type = "button";
    button.dataset.followPerson = person.id;
    button.textContent = isFollowing ? "Following" : "Follow";
    button.setAttribute("aria-pressed", String(isFollowing));
    row.append(button);
  }
  return row;
}

function renderPeople() {
  peopleList.replaceChildren();
  document.querySelectorAll("[data-profile-tab]").forEach((button) => {
    const selected = button.dataset.profileTab === activePeopleTab;
    button.classList.toggle("is-active", selected);
    button.setAttribute(button.getAttribute("role") === "tab" ? "aria-selected" : "aria-pressed", String(selected));
  });

  const people = activePeopleTab === "following" ? following : followers;
  if (people.length) {
    people.forEach((person) => peopleList.append(makePersonRow(person, activePeopleTab === "following")));
  } else {
    const empty = document.createElement("p");
    empty.className = "people-empty";
    empty.textContent = activePeopleTab === "following"
      ? "You are not following anyone yet. Find people who inspire your journey below."
      : "Your followers will show up here as people join and connect with you.";
    peopleList.append(empty);
  }

  if (activePeopleTab === "following") {
    const heading = document.createElement("h3");
    heading.className = "suggestion-heading";
    heading.textContent = "Suggested members";
    peopleList.append(heading);
    const followedIds = new Set(following.map((person) => person.id));
    suggestedPeople.filter((person) => !followedIds.has(person.id)).forEach((person) => peopleList.append(makePersonRow(person)));
    if (followedIds.size === suggestedPeople.length) {
      const note = document.createElement("p");
      note.className = "people-empty";
      note.textContent = "You’re following everyone in this starter list. More members will appear as the community grows.";
      peopleList.append(note);
    }
  }
}

function renderTrackers() {
  const list = document.getElementById("profile-recent-trackers");
  list.replaceChildren();
  const recent = trackers.slice().reverse().slice(0, 3);
  if (!recent.length) {
    const empty = document.createElement("p");
    empty.className = "activity-empty";
    empty.textContent = "No trackers yet. Create one to begin.";
    list.append(empty);
    return;
  }
  recent.forEach((tracker) => {
    const row = document.createElement("div");
    row.className = "recent-tracker";
    const icon = document.createElement("span");
    icon.className = "icon";
    icon.textContent = "track_changes";
    const link = document.createElement("a");
    link.href = `../tracker-details/index.html?id=${encodeURIComponent(tracker.id)}`;
    link.textContent = tracker.name || "Untitled tracker";
    const status = document.createElement("small");
    status.textContent = tracker.status === "completed" ? "Completed" : "Active";
    row.append(icon, link, status);
    list.append(row);
  });
}

function formatActivityDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric" }).format(date);
}

function renderActivity(entries) {
  const list = document.getElementById("profile-activity-list");
  list.replaceChildren();
  const recent = entries.slice().sort((a, b) => new Date(b.entry.createdAt || 0) - new Date(a.entry.createdAt || 0)).slice(0, 5);
  if (!recent.length) {
    const empty = document.createElement("p");
    empty.className = "activity-empty";
    empty.textContent = "Your recent entries will appear here as you log progress.";
    list.append(empty);
    return;
  }
  recent.forEach(({ entry, tracker }) => {
    const row = document.createElement("article");
    row.className = "profile-activity-item";
    const dot = document.createElement("span");
    dot.className = "activity-dot";
    const copy = document.createElement("div");
    copy.className = "activity-copy";
    const description = document.createElement("p");
    description.textContent = entry.description || "Logged progress";
    const trackerLink = document.createElement("a");
    trackerLink.href = `../tracker-details/index.html?id=${encodeURIComponent(tracker.id)}`;
    trackerLink.textContent = tracker.name || "Tracker";
    description.append(document.createTextNode(" · "), trackerLink);
    const time = document.createElement("time");
    time.textContent = formatActivityDate(entry.createdAt);
    copy.append(description, time);
    row.append(dot, copy);
    list.append(row);
  });
}

document.getElementById("open-profile-editor").addEventListener("click", () => {
  profileForm.elements.name.value = profile.name || "";
  profileForm.elements.username.value = profile.username || "";
  profileForm.elements.bio.value = profile.bio || "";
  profileForm.elements.avatar.value = profile.avatar || "";
  profileEditor.showModal();
});

function closeProfileEditor() {
  profileEditor.close();
}
document.getElementById("close-profile-editor").addEventListener("click", closeProfileEditor);
document.getElementById("cancel-profile-editor").addEventListener("click", closeProfileEditor);
profileEditor.addEventListener("click", (event) => {
  if (event.target === profileEditor) closeProfileEditor();
});
profileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const values = new FormData(profileForm);
  const updatedAvatar = String(values.get("avatar") || "🌱").trim() || "🌱";
  const avatarWasChanged = updatedAvatar !== profile.avatar;
  profile = {
    ...profile,
    name: String(values.get("name") || "").trim(),
    username: String(values.get("username") || "").trim().replace(/^@/, ""),
    bio: String(values.get("bio") || "").trim(),
    avatar: updatedAvatar,
    ...(avatarWasChanged ? { avatarImage: "" } : {})
  };
  localStorage.setItem(profileStorageKey, JSON.stringify(profile));
  renderProfile();
  closeProfileEditor();
  const shellName = document.querySelector("[data-profile-name]");
  const shellUsername = document.querySelector("[data-profile-username]");
  const shellAvatar = document.querySelector("[data-profile-avatar]");
  if (shellName) shellName.textContent = profile.name;
  if (shellUsername) shellUsername.textContent = `@${profile.username}`;
  if (shellAvatar) {
    shellAvatar.textContent = profile.avatarImage ? "" : profile.avatar;
    shellAvatar.style.backgroundImage = profile.avatarImage ? `url("${profile.avatarImage}")` : "";
    shellAvatar.style.backgroundPosition = "center";
    shellAvatar.style.backgroundSize = "cover";
  }
  const shellInitial = document.querySelector("[data-profile-initial]");
  if (shellInitial) {
    shellInitial.textContent = profile.avatarImage ? "" : profile.name.trim().charAt(0).toUpperCase();
    shellInitial.style.backgroundImage = profile.avatarImage ? `url("${profile.avatarImage}")` : "";
    shellInitial.style.backgroundPosition = "center";
    shellInitial.style.backgroundSize = "cover";
  }
});

function compressProfileImage(file, kind) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read this image."));
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => reject(new Error("This image could not be opened."));
      image.onload = () => {
        const maxWidth = kind === "cover" ? 1400 : 600;
        const maxHeight = kind === "cover" ? 600 : 600;
        const scale = Math.min(1, maxWidth / image.width, maxHeight / image.height);
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext("2d");
        if (!context) return reject(new Error("Could not process this image."));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  });
}

async function saveProfileImage(input, property, kind) {
  const file = input.files[0];
  input.value = "";
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    window.alert("Choose an image file.");
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    window.alert("Choose an image smaller than 8MB.");
    return;
  }
  try {
    profile[property] = await compressProfileImage(file, kind);
    localStorage.setItem(profileStorageKey, JSON.stringify(profile));
    renderProfile();
    if (property === "avatarImage") {
      const shellAvatar = document.querySelector("[data-profile-avatar]");
      if (shellAvatar) {
        shellAvatar.textContent = "";
        shellAvatar.style.backgroundImage = `url("${profile.avatarImage}")`;
        shellAvatar.style.backgroundPosition = "center";
        shellAvatar.style.backgroundSize = "cover";
      }
      const shellInitial = document.querySelector("[data-profile-initial]");
      if (shellInitial) {
        shellInitial.textContent = "";
        shellInitial.style.backgroundImage = `url("${profile.avatarImage}")`;
        shellInitial.style.backgroundPosition = "center";
        shellInitial.style.backgroundSize = "cover";
      }
    }
  } catch (error) {
    window.alert(error.message);
  }
}

document.getElementById("change-avatar-button").addEventListener("click", () => document.getElementById("avatar-image-input").click());
document.getElementById("change-cover-button").addEventListener("click", () => document.getElementById("cover-image-input").click());
document.getElementById("avatar-image-input").addEventListener("change", (event) => saveProfileImage(event.currentTarget, "avatarImage", "avatar"));
document.getElementById("cover-image-input").addEventListener("change", (event) => saveProfileImage(event.currentTarget, "coverImage", "cover"));

document.querySelectorAll("[data-profile-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    activePeopleTab = button.dataset.profileTab;
    renderPeople();
    document.querySelector(".social-panel").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

peopleList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-follow-person]");
  if (!button) return;
  const personId = button.dataset.followPerson;
  const person = suggestedPeople.find((item) => item.id === personId);
  if (!person) return;
  const existingIndex = following.findIndex((item) => item.id === personId);
  if (existingIndex >= 0) following.splice(existingIndex, 1);
  else following.push(person);
  localStorage.setItem(followingStorageKey, JSON.stringify(following));
  renderProfile();
});

renderProfile();
