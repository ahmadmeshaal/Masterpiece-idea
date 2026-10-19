const storageKey = "taqaddomi-my-trackers";
const reactionStorageKey = "taqaddomi-community-reactions";
const commentStorageKey = "taqaddomi-community-comments";
const postList = document.getElementById("community-post-list");
const emptyState = document.getElementById("feed-empty");
const searchInput = document.getElementById("post-search");
let activeFeed = "explore";
let searchText = "";
let activeCommentPostId = "";

let trackers = [];
let reactions = {};
let comments = {};
let currentProfile = { name: "Kareem Zaid", username: "kareemz", avatar: "🌱" };
try {
  trackers = JSON.parse(localStorage.getItem(storageKey) || "[]");
  if (!Array.isArray(trackers)) trackers = [];
} catch {
  trackers = [];
}
try {
  reactions = JSON.parse(localStorage.getItem(reactionStorageKey) || "{}");
  if (!reactions || Array.isArray(reactions) || typeof reactions !== "object") reactions = {};
} catch {
  reactions = {};
}
try {
  comments = JSON.parse(localStorage.getItem(commentStorageKey) || "{}");
  if (!comments || Array.isArray(comments) || typeof comments !== "object") comments = {};
} catch {
  comments = {};
}
try {
  currentProfile = { ...currentProfile, ...JSON.parse(localStorage.getItem("taqaddomi-profile") || "{}") };
} catch {
  // Use the default profile when saved profile data is unavailable.
}

function formatPostDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(date);
}

function getPosts() {
  return trackers.flatMap((tracker) => {
    const entries = (Array.isArray(tracker.entries) ? tracker.entries : [])
      .map((entry, index) => ({ entry, index }))
      .sort((a, b) => new Date(a.entry.createdAt || 0) - new Date(b.entry.createdAt || 0));
    return entries.map(({ entry, index }, dayIndex) => ({
      ...entry,
      tracker,
      trackerDay: dayIndex + 1,
      postId: `${tracker.id}-${entry.createdAt || index}`
    })).filter((post) => post.published);
  })
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
}

function makePost(post) {
  const article = document.createElement("article");
  article.className = "community-post";
  const header = document.createElement("div");
  header.className = "post-header";
  const avatar = document.createElement("span");
  avatar.className = "post-avatar";
  avatar.textContent = currentProfile.avatarImage ? "" : (currentProfile.avatar || "🌱");
  if (currentProfile.avatarImage) {
    avatar.style.backgroundImage = `url("${currentProfile.avatarImage}")`;
    avatar.style.backgroundPosition = "center";
    avatar.style.backgroundSize = "cover";
  }
  const author = document.createElement("div");
  author.className = "post-author";
  const authorName = document.createElement("strong");
  authorName.textContent = currentProfile.name || "Taqaddomi member";
  const trackerLink = document.createElement("a");
  trackerLink.className = "post-tracker-link";
  trackerLink.href = `../tracker-details/index.html?id=${encodeURIComponent(post.tracker.id)}`;
  trackerLink.setAttribute("aria-label", `Open tracker details for ${post.tracker.name}`);
  trackerLink.innerHTML = '<span class="icon">track_changes</span>';
  const trackerInfo = document.createElement("span");
  trackerInfo.textContent = `${post.tracker.name || "My tracker"} · ${post.tracker.format === "Flexible" ? (post.tracker.counterUnit || "Session") : "Day"} ${post.trackerDay}`;
  trackerLink.append(trackerInfo);
  author.append(authorName, trackerLink);
  const date = document.createElement("time");
  date.className = "post-date";
  date.dateTime = post.createdAt || "";
  date.textContent = formatPostDate(post.createdAt);
  header.append(avatar, author, date);

  const description = document.createElement("p");
  description.className = "post-description";
  description.textContent = post.description || "Made progress today.";
  article.append(header, description);

  if (Array.isArray(post.attachments) && post.attachments.length) {
    const attachments = document.createElement("div");
    attachments.className = "post-media-list";
    post.attachments.forEach((item) => {
      if (item.type === "image" && (item.dataUrl || item.url)) {
        const image = document.createElement("img");
        image.className = "post-media-image";
        image.src = item.dataUrl || item.url;
        image.alt = item.name || "Photo shared in this post";
        attachments.append(image);
      } else if (item.type === "video" && (item.dataUrl || item.url)) {
        const video = document.createElement("video");
        video.className = "post-media-video";
        video.src = item.dataUrl || item.url;
        video.controls = true;
        video.preload = "metadata";
        video.setAttribute("aria-label", item.name || "Video shared in this post");
        attachments.append(video);
      } else {
        const attachment = document.createElement("span");
        attachment.className = "post-attachment-file";
        attachment.textContent = item.type === "link" ? `🔗 ${item.name}` : `${item.type === "video" ? "🎬" : "🖼️"} ${item.name || "Attachment"}`;
        attachments.append(attachment);
      }
    });
    article.append(attachments);
  }

  const footer = document.createElement("div");
  footer.className = "post-footer";
  const categoryTag = document.createElement("span");
  categoryTag.className = "post-category";
  categoryTag.textContent = `#${post.tracker.category || "Progress"}`;
  const reactionBar = document.createElement("div");
  reactionBar.className = "post-reactions";
  const postReactions = reactions[post.postId] || { counts: {}, mine: {} };
  const selectedReaction = Object.keys(postReactions.mine || {}).find((type) => postReactions.mine[type]);
  [
    { type: "love", label: "Love", emoji: "❤️" },
    { type: "celebrate", label: "Celebrate", emoji: "🎉" },
    { type: "support", label: "Support", emoji: "💪" }
  ].forEach((reaction) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `post-reaction${selectedReaction === reaction.type ? " is-selected" : ""}`;
    button.dataset.react = reaction.type;
    button.dataset.postId = post.postId;
    button.setAttribute("aria-pressed", String(selectedReaction === reaction.type));
    button.setAttribute("aria-label", `${reaction.label}, ${postReactions.counts?.[reaction.type] || 0}`);
    button.innerHTML = `<span>${reaction.emoji}</span><small>${postReactions.counts?.[reaction.type] || 0}</small>`;
    reactionBar.append(button);
  });

  const commentButton = document.createElement("button");
  commentButton.className = "post-comments-toggle";
  commentButton.type = "button";
  commentButton.dataset.toggleComments = post.postId;
  commentButton.setAttribute("aria-expanded", String(activeCommentPostId === post.postId));
  commentButton.innerHTML = `<span class="icon">mode_comment</span><span>${(comments[post.postId] || []).length} comments</span>`;
  footer.append(categoryTag, reactionBar, commentButton);
  article.append(footer);

  const commentsSection = document.createElement("section");
  commentsSection.className = "post-comments";
  commentsSection.hidden = activeCommentPostId !== post.postId;
  const commentList = document.createElement("div");
  commentList.className = "post-comment-list";
  (comments[post.postId] || []).forEach((comment) => {
    const commentItem = document.createElement("p");
    commentItem.className = "post-comment";
    const commentAuthor = document.createElement("strong");
    commentAuthor.textContent = `${currentProfile.name || "Taqaddomi member"} `;
    const commentText = document.createElement("span");
    commentText.textContent = comment;
    commentItem.append(commentAuthor, commentText);
    commentList.append(commentItem);
  });
  const commentForm = document.createElement("form");
  commentForm.className = "post-comment-form";
  commentForm.dataset.commentForm = post.postId;
  const commentInput = document.createElement("input");
  commentInput.name = "comment";
  commentInput.type = "text";
  commentInput.maxLength = 300;
  commentInput.placeholder = "Write a comment…";
  commentInput.setAttribute("aria-label", "Write a comment");
  commentInput.required = true;
  const commentSubmit = document.createElement("button");
  commentSubmit.className = "btn-tactile-green";
  commentSubmit.type = "submit";
  commentSubmit.textContent = "Send";
  commentForm.append(commentInput, commentSubmit);
  commentsSection.append(commentList, commentForm);
  article.append(commentsSection);
  return article;
}

function renderFeed() {
  const allPosts = getPosts();
  const visiblePosts = allPosts.filter((post) => {
    const searchContent = `${post.description || ""} ${post.tracker.name || ""} ${post.tracker.category || ""}`.toLowerCase();
    return searchContent.includes(searchText);
  });
  const feedPosts = activeFeed === "following" ? [] : visiblePosts;
  postList.replaceChildren(...feedPosts.map(makePost));
  emptyState.hidden = feedPosts.length > 0;
  if (activeFeed === "following") {
    document.getElementById("empty-feed-title").textContent = "No followed posts yet";
    document.getElementById("empty-feed-message").textContent = "Updates shared by people you follow will appear here. Find people to follow from your profile.";
    const action = document.getElementById("empty-feed-action");
    action.href = "../profile/index.html";
    action.innerHTML = 'Find people <span class="icon">arrow_forward</span>';
  } else if (allPosts.length) {
    document.getElementById("empty-feed-title").textContent = "No updates match your search";
    document.getElementById("empty-feed-message").textContent = "Try a different search to find updates.";
    const action = document.getElementById("empty-feed-action");
    action.href = "../my-trackers/index.html";
    action.innerHTML = 'Go to My Trackers <span class="icon">arrow_forward</span>';
  } else {
    document.getElementById("empty-feed-title").textContent = "The community is warming up";
    document.getElementById("empty-feed-message").textContent = "Public tracker entries will show up here. Share an entry with the community to start the conversation.";
    const action = document.getElementById("empty-feed-action");
    action.href = "../my-trackers/index.html";
    action.innerHTML = 'Go to My Trackers <span class="icon">arrow_forward</span>';
  }
}

document.querySelectorAll("[data-feed]").forEach((button) => {
  button.addEventListener("click", () => {
    activeFeed = button.dataset.feed;
    document.querySelectorAll("[data-feed]").forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle("is-active", selected);
      filter.setAttribute("aria-pressed", String(selected));
    });
    renderFeed();
  });
});

searchInput.addEventListener("input", () => {
  searchText = searchInput.value.trim().toLowerCase();
  renderFeed();
});

postList.addEventListener("click", (event) => {
  const reactionButton = event.target.closest("[data-react]");
  if (reactionButton) {
    const { postId, react: type } = reactionButton.dataset;
    if (!reactions[postId] || typeof reactions[postId] !== "object") reactions[postId] = { counts: {}, mine: {} };
    const postReactions = reactions[postId];
    postReactions.counts ||= {};
    postReactions.mine ||= {};
    const previousType = Object.keys(postReactions.mine).find((reactionType) => postReactions.mine[reactionType]);
    if (previousType === type) {
      postReactions.counts[type] = Math.max(0, (postReactions.counts[type] || 0) - 1);
      postReactions.mine = {};
    } else {
      if (previousType) postReactions.counts[previousType] = Math.max(0, (postReactions.counts[previousType] || 0) - 1);
      postReactions.counts[type] = (postReactions.counts[type] || 0) + 1;
      postReactions.mine = { [type]: true };
    }
    localStorage.setItem(reactionStorageKey, JSON.stringify(reactions));
    renderFeed();
    return;
  }

  const commentToggle = event.target.closest("[data-toggle-comments]");
  if (commentToggle) {
    activeCommentPostId = activeCommentPostId === commentToggle.dataset.toggleComments ? "" : commentToggle.dataset.toggleComments;
    renderFeed();
  }
});

postList.addEventListener("submit", (event) => {
  const form = event.target.closest("[data-comment-form]");
  if (!form) return;
  event.preventDefault();
  const postId = form.dataset.commentForm;
  const text = String(new FormData(form).get("comment") || "").trim();
  if (!text) return;
  if (!Array.isArray(comments[postId])) comments[postId] = [];
  comments[postId].push(text);
  localStorage.setItem(commentStorageKey, JSON.stringify(comments));
  activeCommentPostId = postId;
  renderFeed();
});

renderFeed();
