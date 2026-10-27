const service = window.MessagesService;
const t = (key, values = {}) => {
  const dictionary = translations[currentLanguage] || translations.en;
  let result = dictionary[key] || translations.en[key] || key;
  Object.entries(values).forEach(([name, value]) => { result = result.replaceAll(`{${name}}`, value); });
  return result;
};

const translations = {
  en: {
    inboxLabel: "YOUR COMMUNITY", messagesTitle: "Messages", newMessage: "New message", searchMessages: "Search people", searchPeople: "Search people", selectConversation: "Select a conversation", selectConversationHint: "Choose a conversation or start a new one.", startConversation: "Start a conversation", loadError: "Couldn't load messages", tryAgain: "Try again", backToConversations: "Back to conversations", loadingOlder: "Loading earlier messages…", writeMessage: "Write a message…", send: "Send", startSomething: "START SOMETHING", cancel: "Cancel", confirm: "Confirm", today: "Today", yesterday: "Yesterday", seen: "Seen", seenAt: "Seen {time}", retry: "Retry", sentPhoto: "Sent a photo", sharedTracker: "Shared a tracker", sharedPost: "Shared a post", viewTracker: "View tracker", viewPost: "View post", day: "Day {number}", days: "{number} days", mute: "Mute conversation", unmute: "Unmute conversation", block: "Block user", unblock: "Unblock", report: "Report", deleteConversation: "Delete conversation", confirmBlockTitle: "Block {name}?", confirmBlockBody: "They won't be able to message you, and you won't be able to message them.", confirmDeleteTitle: "Delete this conversation?", confirmDeleteBody: "This conversation and its messages will be removed from this browser.", confirmReportTitle: "Report this conversation?", confirmReportBody: "We'll flag the latest message in this demo for review.", youCantMessage: "You can't message this person.", unblockHint: "Unblock them to send a message.", restrictedEveryone: "This person is not accepting messages right now.", restrictedFollowing: "This person only accepts messages from people they follow.", blockedYou: "This person has blocked you", youBlocked: "You blocked this person", noMessages: "This person does not accept messages", followingOnly: "Only people they follow can message them", noConversationsTitle: "No conversations yet", noConversations: "Say hello to someone from your community to get started.", noSearchResults: "No conversations match your search.", noPeopleResults: "No people found.", noMessagesYet: "Send the first message to start the conversation.", messageFailed: "Message not sent", photoTooLarge: "Choose an image smaller than 5 MB.", imageOnly: "Please choose an image file.", messageFailedSend: "The message could not be sent. Try again.", messageSent: "Message sent", muted: "Conversation muted", unmuted: "Conversation unmuted", blockedSuccess: "User blocked", unblockedSuccess: "User unblocked", deletedSuccess: "Conversation deleted", reportedSuccess: "Message reported", online: "Taqaddomi member", conversationDeleted: "This conversation is no longer available.", errorTryAgain: "Try again to load this conversation.", chars: "{count} / 2000", people: "People", newMessageHint: "Find someone to start a conversation.", profile: "Open profile", attachPhoto: "Attach photo", removePhoto: "Remove attached photo", close: "Close", english: "EN", arabic: "العربية", more: "More actions", you: "You", sending: "Sending…", openPhoto: "Open photo", sharedPhoto: "Shared photo", tracker: "Tracker", trackerProgress: "Tracker progress", loading: "Loading…", dashboard: "Dashboard", community: "Community", trackers: "Trackers", profileNav: "Profile", insights: "Insights & Recap", notifications: "Notifications", settings: "Settings", addEntry: "Add Entry", trackerSearch: "Search trackers, habits, streaks…", mobileNav: "Mobile navigation", conversationList: "Conversation list", chatRegion: "Chat", messagesRegion: "Messages", mainNav: "Main navigation"
  },
  ar: {
    inboxLabel: "مجتمعك", messagesTitle: "الرسائل", newMessage: "رسالة جديدة", searchMessages: "ابحث عن أشخاص", searchPeople: "ابحث عن أشخاص", selectConversation: "اختر محادثة", selectConversationHint: "اختر محادثة أو ابدأ محادثة جديدة.", startConversation: "ابدأ محادثة", loadError: "تعذّر تحميل الرسائل", tryAgain: "حاول مرة أخرى", backToConversations: "العودة إلى المحادثات", loadingOlder: "جارٍ تحميل الرسائل السابقة…", writeMessage: "اكتب رسالة…", send: "إرسال", startSomething: "ابدأ الآن", cancel: "إلغاء", confirm: "تأكيد", today: "اليوم", yesterday: "أمس", seen: "تمت المشاهدة", seenAt: "تمت المشاهدة {time}", retry: "إعادة المحاولة", sentPhoto: "أرسل صورة", sharedTracker: "شارك متتبعًا", sharedPost: "شارك منشورًا", viewTracker: "عرض المتتبع", viewPost: "عرض المنشور", day: "اليوم {number}", days: "{number} يومًا", mute: "كتم المحادثة", unmute: "إلغاء كتم المحادثة", block: "حظر المستخدم", unblock: "إلغاء الحظر", report: "إبلاغ", deleteConversation: "حذف المحادثة", confirmBlockTitle: "حظر {name}؟", confirmBlockBody: "لن يتمكن من مراسلتك، ولن تتمكن من مراسلته.", confirmDeleteTitle: "حذف هذه المحادثة؟", confirmDeleteBody: "ستُحذف المحادثة ورسائلها من هذا المتصفح.", confirmReportTitle: "الإبلاغ عن هذه المحادثة؟", confirmReportBody: "سنضع علامة للمراجعة على أحدث رسالة في هذه النسخة التجريبية.", youCantMessage: "لا يمكنك مراسلة هذا الشخص.", unblockHint: "ألغِ الحظر لتتمكن من إرسال رسالة.", restrictedEveryone: "هذا الشخص لا يستقبل الرسائل حاليًا.", restrictedFollowing: "هذا الشخص يستقبل الرسائل ممن يتابعهم فقط.", blockedYou: "قام هذا الشخص بحظرك", youBlocked: "قمت بحظر هذا الشخص", noMessages: "هذا الشخص لا يستقبل الرسائل", followingOnly: "الأشخاص الذين يتابعهم فقط يمكنهم مراسلته", noConversationsTitle: "لا توجد محادثات بعد", noConversations: "ابدأ محادثة مع أحد أفراد مجتمعك.", noSearchResults: "لا توجد محادثات تطابق بحثك.", noPeopleResults: "لم يتم العثور على أشخاص.", noMessagesYet: "أرسل أول رسالة لبدء المحادثة.", messageFailed: "لم تُرسل الرسالة", photoTooLarge: "اختر صورة أصغر من 5 ميغابايت.", imageOnly: "الرجاء اختيار ملف صورة.", messageFailedSend: "تعذّر إرسال الرسالة. حاول مرة أخرى.", messageSent: "تم إرسال الرسالة", muted: "تم كتم المحادثة", unmuted: "تم إلغاء كتم المحادثة", blockedSuccess: "تم حظر المستخدم", unblockedSuccess: "تم إلغاء الحظر", deletedSuccess: "تم حذف المحادثة", reportedSuccess: "تم الإبلاغ عن الرسالة", online: "عضو في تقدّمي", conversationDeleted: "لم تعد هذه المحادثة متاحة.", errorTryAgain: "حاول مرة أخرى لتحميل هذه المحادثة.", chars: "{count} / 2000", people: "الأشخاص", newMessageHint: "ابحث عن شخص لبدء محادثة.", profile: "فتح الملف الشخصي", attachPhoto: "إرفاق صورة", removePhoto: "إزالة الصورة المرفقة", close: "إغلاق", english: "EN", arabic: "العربية", more: "خيارات إضافية", you: "أنت", sending: "جارٍ الإرسال…", openPhoto: "فتح الصورة", sharedPhoto: "صورة مشتركة", tracker: "متتبع", trackerProgress: "تقدم المتتبع", loading: "جارٍ التحميل…", dashboard: "لوحة التحكم", community: "المجتمع", trackers: "المتتبعات", profileNav: "الملف الشخصي", insights: "الملخص والتحليلات", notifications: "الإشعارات", settings: "الإعدادات", addEntry: "إضافة إدخال", trackerSearch: "ابحث عن المتتبعات والعادات…", mobileNav: "التنقل على الهاتف", conversationList: "قائمة المحادثات", chatRegion: "المحادثة", messagesRegion: "الرسائل", mainNav: "التنقل الرئيسي"
  }
};

let currentLanguage = localStorage.getItem("taqaddomi-language") || document.documentElement.lang || "en";
currentLanguage = currentLanguage.startsWith("ar") ? "ar" : "en";
let allConversations = [];
let selectedConversation = null;
let currentMessages = [];
let hasMoreMessages = false;
let searchText = "";
let pendingPhoto = null;
let pendingAction = "";
let toastTimer = 0;
let isLoadingOlder = false;
let replyScheduled = false;
let selectedFromUrl = false;
let listScrollPosition = 0;

const elements = {
  body: document.body,
  conversationList: document.getElementById("conversation-list"),
  conversationContent: document.getElementById("conversation-content"),
  skeleton: document.getElementById("conversation-skeleton"),
  listEmpty: document.getElementById("list-empty"),
  search: document.getElementById("conversation-search"),
  chatPlaceholder: document.getElementById("chat-placeholder"),
  chatError: document.getElementById("chat-error"),
  chatView: document.getElementById("chat-view"),
  chatName: document.getElementById("chat-name-link"),
  chatHandle: document.getElementById("chat-handle-link"),
  chatAvatar: document.getElementById("chat-avatar"),
  chatAvatarLink: document.getElementById("chat-avatar-link"),
  messageLog: document.getElementById("message-log"),
  messageItems: document.getElementById("message-items"),
  messageSkeleton: document.getElementById("message-skeleton"),
  olderLoading: document.getElementById("older-loading"),
  messageForm: document.getElementById("message-form"),
  messageInput: document.getElementById("message-input"),
  sendButton: document.getElementById("send-message"),
  photoInput: document.getElementById("photo-input"),
  attachmentPreview: document.getElementById("attachment-preview"),
  previewImage: document.getElementById("attachment-preview-image"),
  characterCount: document.getElementById("character-count"),
  restriction: document.getElementById("chat-restriction"),
  newDialog: document.getElementById("new-message-dialog"),
  userSearch: document.getElementById("user-search"),
  userResults: document.getElementById("user-search-results"),
  actionDialog: document.getElementById("action-dialog"),
  actionTitle: document.getElementById("action-title"),
  actionDescription: document.getElementById("action-description"),
  confirmAction: document.getElementById("confirm-action"),
  imageDialog: document.getElementById("image-dialog"),
  largeImage: document.getElementById("large-image"),
  toast: document.getElementById("messages-toast"),
  incomingAnnouncement: document.getElementById("incoming-announcement")
};

function applyTranslations() {
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => { node.placeholder = t(node.dataset.i18nPlaceholder); });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => { node.setAttribute("aria-label", t(node.dataset.i18nAria)); });
  document.querySelectorAll("[data-close-dialog]").forEach((button) => button.setAttribute("aria-label", t("close")));
  document.getElementById("photo-input").setAttribute("aria-label", t("attachPhoto"));
  document.getElementById("remove-attachment").setAttribute("aria-label", t("removePhoto"));
  document.getElementById("chat-avatar-link").setAttribute("aria-label", t("profile"));
  document.querySelector(".chat-more-menu summary").setAttribute("aria-label", t("more"));
  document.querySelector(".chat-more-menu summary").setAttribute("title", t("more"));
  document.querySelector(".messages-page").setAttribute("aria-label", t("messagesRegion"));
  document.querySelector(".conversation-pane").setAttribute("aria-label", t("conversationList"));
  document.querySelector(".chat-pane").setAttribute("aria-label", t("chatRegion"));
  document.querySelector(".bottom-nav").setAttribute("aria-label", t("mobileNav"));
  document.querySelector(".navigation").setAttribute("aria-label", t("mainNav"));
  document.getElementById("message-log").setAttribute("aria-label", t("messagesRegion"));
  document.getElementById("user-search-results").setAttribute("aria-label", t("people"));
  document.querySelector(".sidebar-add span:last-child").textContent = t("addEntry");
  const trackerSearch = document.querySelector(".topbar .search input");
  if (trackerSearch) { trackerSearch.placeholder = t("trackerSearch"); trackerSearch.setAttribute("aria-label", t("trackerSearch")); }
  const notificationButton = document.querySelector(".topbar .notice");
  if (notificationButton) { notificationButton.title = t("notifications"); notificationButton.setAttribute("aria-label", t("notifications")); }
  elements.messageInput.setAttribute("aria-label", t("writeMessage"));
  elements.imageDialog.setAttribute("aria-label", t("sharedPhoto"));
  document.title = `${t("messagesTitle")} | Taqaddomi`;
  const languageButton = document.querySelector(".topbar .language");
  if (languageButton) languageButton.querySelector("span:last-child").textContent = currentLanguage === "ar" ? "العربية / EN" : "EN / العربية";
  document.querySelectorAll("[data-more-action]").forEach((button) => {
    const labels = { mute: "mute", block: "block", report: "report", delete: "deleteConversation" };
    const action = button.dataset.moreAction;
    button.textContent = action === "mute" && selectedConversation?.muted ? t("unmute") : t(labels[action]);
  });
  const navLabels = { dashboard: "dashboard", "community-feed": "community", messages: "messagesTitle", "my-trackers": "trackers" };
  document.querySelectorAll(".navigation [data-path]").forEach((link) => {
    const label = link.querySelector(".nav-label");
    const key = navLabels[link.dataset.path] || link.dataset.path;
    if (label && (navLabels[link.dataset.path] || ["insights-and-recap", "notifications", "settings"].includes(link.dataset.path))) {
      const translatedKey = { "insights-and-recap": "insights", notifications: "notifications", settings: "settings" }[link.dataset.path] || key;
      label.lastChild.textContent = t(translatedKey);
    }
  });
  const mobileLabels = { dashboard: "dashboard", "community-feed": "community", messages: "messagesTitle", "my-trackers": "trackers", profile: "profileNav" };
  document.querySelectorAll(".bottom-nav [data-mobile-path]").forEach((link) => {
    const label = link.children[1];
    if (label && mobileLabels[link.dataset.mobilePath]) label.textContent = t(mobileLabels[link.dataset.mobilePath]);
  });
  renderConversations();
  if (selectedConversation) renderMessages();
}

function setLanguage(language) {
  currentLanguage = language === "ar" ? "ar" : "en";
  localStorage.setItem("taqaddomi-language", currentLanguage);
  applyTranslations();
}

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function formatRelative(dateValue) {
  const date = new Date(dateValue);
  const minutes = Math.max(0, Math.floor((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return currentLanguage === "ar" ? "الآن" : "now";
  if (minutes < 60) return currentLanguage === "ar" ? `${new Intl.NumberFormat("ar").format(minutes)} د` : `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return currentLanguage === "ar" ? `${new Intl.NumberFormat("ar").format(hours)} س` : `${hours}h`;
  if (hours < 48) return t("yesterday");
  if (hours < 168) return new Intl.DateTimeFormat(currentLanguage, { weekday: "short" }).format(date);
  return new Intl.DateTimeFormat(currentLanguage, { day: "numeric", month: "short" }).format(date);
}

function formatTime(dateValue) {
  return new Intl.DateTimeFormat(currentLanguage, { hour: "numeric", minute: "2-digit" }).format(new Date(dateValue));
}

function dateLabel(dateValue) {
  const date = new Date(dateValue);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thatDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const days = Math.round((today - thatDay) / 86400000);
  if (days === 0) return t("today");
  if (days === 1) return t("yesterday");
  return new Intl.DateTimeFormat(currentLanguage, { weekday: "long", month: "long", day: "numeric", year: "numeric" }).format(date);
}

function makeAvatar(user, className = "person-avatar") {
  const avatar = element("span", className);
  if (user.avatarImage) {
    const image = element("img");
    image.src = user.avatarImage;
    image.alt = "";
    avatar.append(image);
  } else avatar.textContent = user.avatar || (user.name || "?").trim().charAt(0).toUpperCase();
  return avatar;
}

function lastPreview(conversation) {
  const last = conversation.lastMessage;
  if (!last) return t("noMessagesYet");
  if (last.type === "tracker") return t("sharedTracker");
  if (last.type === "post") return t("sharedPost");
  if (last.type === "image") return t("sentPhoto");
  return last.text || t("noMessagesYet");
}

async function loadConversations() {
  elements.skeleton.hidden = false;
  try {
    allConversations = await service.getConversations();
    elements.skeleton.hidden = true;
    renderConversations();
  } catch {
    elements.skeleton.hidden = true;
    showLoadError();
  }
}

function renderConversations() {
  if (!elements.conversationList) return;
  const scrollTop = elements.conversationContent.scrollTop;
  if (!elements.skeleton.hidden) {
    elements.listEmpty.hidden = true;
    return;
  }
  elements.conversationList.replaceChildren();
  const normalized = searchText.trim().toLowerCase();
  const filtered = allConversations.filter((conversation) => `${conversation.user?.name || ""} ${conversation.user?.username || ""}`.toLowerCase().includes(normalized));
  elements.listEmpty.replaceChildren();
  elements.listEmpty.hidden = filtered.length > 0;
  if (filtered.length === 0) {
    const title = element("strong", "", allConversations.length === 0 && !normalized ? t("noConversationsTitle") : "");
    const message = element("span", "", normalized ? t("noSearchResults") : t("noConversations"));
    elements.listEmpty.append(title, message);
    if (!normalized) {
      const start = element("button", "btn-tactile-green", t("startConversation"));
      start.type = "button";
      start.addEventListener("click", openNewMessage);
      elements.listEmpty.append(start);
    }
    if (allConversations.length > 0 || normalized) elements.listEmpty.replaceChildren(message);
  }

  filtered.forEach((conversation) => {
    if (!conversation.user) return;
    const row = element("button", `conversation-row${conversation.unreadCount ? " has-unread" : ""}${selectedConversation?.id === conversation.id ? " is-selected" : ""}`);
    row.type = "button";
    row.setAttribute("role", "listitem");
    row.setAttribute("aria-current", selectedConversation?.id === conversation.id ? "true" : "false");
    row.addEventListener("click", () => selectConversation(conversation.id));
    row.append(makeAvatar(conversation.user));

    const copy = element("span", "conversation-copy");
    const top = element("span", "conversation-row-top");
    top.append(element("span", "conversation-name", conversation.user.name));
    if (conversation.muted) top.append(element("span", "icon muted-indicator", "notifications_off"));
    top.append(element("span", "conversation-time", formatRelative(conversation.lastMessageAt)));
    const preview = element("span", "conversation-preview-line");
    preview.append(element("span", "conversation-preview", lastPreview(conversation)));
    if (conversation.unreadCount > 0) preview.append(element("span", "unread-pill", conversation.unreadCount > 99 ? "99+" : String(conversation.unreadCount)));
    copy.append(top, preview);
    row.append(copy);
    elements.conversationList.append(row);
  });
  elements.conversationContent.scrollTop = scrollTop || listScrollPosition;
}

function showLoadError() {
  elements.chatPlaceholder.hidden = true;
  elements.chatView.hidden = true;
  elements.chatError.hidden = false;
}

function setUrlConversation(conversationId, mode = "push") {
  const url = new URL(window.location.href);
  url.searchParams.delete("to");
  if (conversationId && !conversationId.startsWith("draft-")) url.searchParams.set("c", conversationId);
  else url.searchParams.delete("c");
  try {
    if (mode === "replace") history.replaceState({ messagesConversation: conversationId || null }, "", url);
    else history.pushState({ messagesConversation: conversationId || null }, "", url);
  } catch {
    // Some browsers restrict URL history updates for file:// pages; the chat still opens.
  }
}

function showMobileChat(show) {
  if (show && window.matchMedia("(max-width: 680px)").matches) listScrollPosition = elements.conversationContent.scrollTop;
  document.body.classList.toggle("messages-chat-open", Boolean(show));
  if (!show) listScrollPosition = elements.conversationContent.scrollTop;
}

async function selectConversation(conversationId, { updateUrl = true, draftUser = null } = {}) {
  const existing = allConversations.find((conversation) => conversation.id === conversationId);
  selectedConversation = existing || (draftUser ? { id: `draft-${draftUser.id}`, userId: draftUser.id, user: draftUser, unreadCount: 0, muted: false, blockedByMe: false, blockedMe: false, draft: true, lastMessageAt: new Date().toISOString() } : null);
  if (!selectedConversation) return;
  selectedFromUrl = true;
  if (updateUrl) setUrlConversation(selectedConversation.id);
  showMobileChat(true);
  renderConversations();
  renderChatHeader();
  elements.chatPlaceholder.hidden = true;
  elements.chatError.hidden = true;
  elements.chatView.hidden = false;
  elements.messageSkeleton.hidden = false;
  elements.messageItems.replaceChildren();
  currentMessages = [];
  elements.messageLog.scrollTop = elements.messageLog.scrollHeight;
  updateComposerState();

  const isErrorDemo = new URLSearchParams(window.location.search).get("error") === "1";
  if (isErrorDemo) {
    elements.chatView.hidden = true;
    showLoadError();
    return;
  }

  try {
    if (!selectedConversation.draft) {
      selectedConversation = await service.markAsRead(selectedConversation.id);
      allConversations = await service.getConversations();
    }
    const result = await service.getMessages(selectedConversation.id, { limit: 30 });
    currentMessages = result.messages;
    hasMoreMessages = result.hasMore;
    elements.messageSkeleton.hidden = true;
    renderConversations();
    renderMessages();
    requestAnimationFrame(() => { elements.messageLog.scrollTop = elements.messageLog.scrollHeight; });
    updateComposerState();
  } catch {
    elements.chatView.hidden = true;
    showLoadError();
  }
}

function renderChatHeader() {
  const user = selectedConversation.user;
  elements.chatName.textContent = user.name;
  elements.chatHandle.textContent = `@${user.username}`;
  const profileUrl = `../profile/index.html?user=${encodeURIComponent(user.id)}`;
  elements.chatName.href = profileUrl;
  elements.chatHandle.href = profileUrl;
  elements.chatAvatarLink.href = profileUrl;
  elements.chatAvatar.replaceChildren();
  if (user.avatarImage) {
    const image = element("img");
    image.src = user.avatarImage;
    image.alt = "";
    elements.chatAvatar.append(image);
  } else elements.chatAvatar.textContent = user.avatar || (user.name || "?").trim().charAt(0).toUpperCase();
  document.querySelectorAll("[data-more-action]").forEach((button) => {
    const action = button.dataset.moreAction;
    const labels = { mute: selectedConversation.muted ? "unmute" : "mute", block: selectedConversation.blockedByMe ? "unblock" : "block", report: "report", delete: "deleteConversation" };
    button.textContent = t(labels[action]);
    button.hidden = Boolean(selectedConversation.draft && action !== "block");
  });
  document.querySelector(".chat-more-menu").open = false;
}

function renderMessages() {
  elements.messageItems.replaceChildren();
  if (currentMessages.length === 0) {
    elements.messageItems.append(element("p", "no-messages-yet", t("noMessagesYet")));
    return;
  }
  let previousDate = "";
  currentMessages.forEach((message, index) => {
    const dayKey = new Date(message.createdAt).toLocaleDateString("en-CA");
    if (dayKey !== previousDate) {
      elements.messageItems.append(element("div", "date-separator", dateLabel(message.createdAt)));
      previousDate = dayKey;
    }
    const isOutgoing = message.sender === "me";
    const next = currentMessages[index + 1];
    const isLastInGroup = !next || next.sender !== message.sender || new Date(next.createdAt).toDateString() !== new Date(message.createdAt).toDateString();
    const row = element("article", `message-row ${isOutgoing ? "is-outgoing" : "is-incoming"}${isLastInGroup ? " is-group-end" : ""}`);
    row.dataset.messageId = message.id;
    row.dataset.sender = message.sender;
    row.setAttribute("aria-label", `${isOutgoing ? t("you") : selectedConversation.user.name}: ${message.text || t(message.type === "image" ? "sentPhoto" : message.type === "tracker" ? "sharedTracker" : "sharedPost")}`);

    if (message.type === "text") {
      const bubble = element("div", "message-bubble", message.text);
      bubble.dir = "auto";
      row.append(bubble);
    } else if (message.type === "image") {
      const imageButton = element("button", "image-message");
      imageButton.type = "button";
      imageButton.setAttribute("aria-label", t("openPhoto"));
      const image = element("img");
      image.src = message.imageUrl;
      image.alt = t("sharedPhoto");
      imageButton.append(image);
      imageButton.addEventListener("click", () => {
        elements.largeImage.src = message.imageUrl;
        elements.largeImage.alt = t("sharedPhoto");
        elements.imageDialog.showModal();
      });
      row.append(imageButton);
    } else if (message.type === "tracker") row.append(renderTrackerCard(message));
    else if (message.type === "post") row.append(renderPostCard(message));

    const meta = element("div", "message-meta");
    if (message.status === "failed") {
      meta.append(element("span", "icon message-failed", "error"), element("span", "message-failed", t("messageFailed")));
      const retry = element("button", "", t("retry"));
      retry.type = "button";
      retry.dataset.retryMessage = message.id;
      retry.addEventListener("click", () => retryMessage(message.id));
      meta.append(retry);
    } else if (message.status === "sending") meta.append(element("span", "", t("sending")));
    else if (isLastInGroup) {
      const seen = isOutgoing && isMessageSeen(message) && isLastOutgoing(message);
      if (seen) meta.append(element("span", "seen-status", t("seenAt", { time: formatTime(selectedConversation.readAt) })));
      meta.append(element("time", "", formatTime(message.createdAt)));
    }
    if (meta.childNodes.length) row.append(meta);
    elements.messageItems.append(row);
  });
}

function isMessageSeen(message) {
  const readAt = selectedConversation?.seenAt;
  return Boolean(readAt && new Date(readAt) >= new Date(message.createdAt));
}

function isLastOutgoing(message) {
  const last = [...currentMessages].reverse().find((item) => item.sender === "me");
  return last?.id === message.id;
}

function renderTrackerCard(message) {
  const card = element("article", "shared-card");
  card.append(element("span", "shared-label", t("sharedTracker")));
  card.append(element("h3", "", message.trackerTitle || t("tracker")));
  const chips = element("div", "shared-chips");
  chips.append(element("span", "shared-chip", t("day", { number: message.day || 1 })));
  chips.append(element("span", "shared-chip", t("days", { number: message.streak || 1 })));
  card.append(chips);
  const progress = element("progress", "shared-progress");
  progress.max = 100;
  progress.value = Math.min(100, Number(message.progress) || 0);
  progress.setAttribute("aria-label", t("trackerProgress"));
  card.append(progress);
  const link = element("a", "", t("viewTracker"));
  link.href = `../tracker-details/index.html?id=${encodeURIComponent(message.trackerId || "")}`;
  card.append(link);
  return card;
}

function renderPostCard(message) {
  const card = element("article", "shared-card");
  card.append(element("span", "shared-label", t("sharedPost")));
  card.append(element("p", "shared-post-title", message.postTitle || message.text || ""));
  const link = element("a", "", t("viewPost"));
  link.href = `../community-feed/index.html#${encodeURIComponent(message.postId || "")}`;
  card.append(link);
  return card;
}

function updateComposerState() {
  const user = selectedConversation?.user;
  let reason = "";
  if (selectedConversation?.blockedMe || user?.disabledReason === "blockedYou") reason = "blocked";
  else if (selectedConversation?.blockedByMe) reason = "blockedByMe";
  else if (user?.disabledReason === "noMessages") reason = "restrictedEveryone";
  else if (user?.disabledReason === "followingOnly") reason = "restrictedFollowing";
  elements.messageForm.hidden = Boolean(reason);
  elements.restriction.hidden = !reason;
  elements.restriction.replaceChildren();
  if (reason === "blockedByMe") {
    elements.restriction.append(document.createTextNode(`${t("youCantMessage")} `));
    elements.restriction.append(document.createTextNode(t("unblockHint")));
    const unblock = element("button", "", t("unblock"));
    unblock.type = "button";
    unblock.addEventListener("click", async () => {
      selectedConversation = await service.unblockUser(user.id) || { ...selectedConversation, blockedByMe: false, user: { ...user, disabledReason: "", canMessage: true } };
      allConversations = await service.getConversations();
      renderChatHeader(); renderConversations(); updateComposerState();
      showToast(t("unblockedSuccess"));
    });
    elements.restriction.append(unblock);
  } else if (reason === "blocked") elements.restriction.textContent = t("youCantMessage");
  else if (reason) elements.restriction.textContent = t(reason);
  updateSendButton();
}

function updateSendButton() {
  elements.sendButton.disabled = !selectedConversation || elements.messageForm.hidden || (!elements.messageInput.value.trim() && !pendingPhoto);
}

function resizeComposer() {
  const textarea = elements.messageInput;
  textarea.setAttribute("rows", "1");
  const lineHeight = Number.parseFloat(getComputedStyle(textarea).lineHeight) || 18;
  const rows = Math.min(5, Math.max(1, Math.ceil((textarea.scrollHeight - 22) / lineHeight)));
  textarea.setAttribute("rows", String(rows));
  const count = textarea.value.length;
  elements.characterCount.hidden = count < 1750;
  elements.characterCount.textContent = t("chars", { count: new Intl.NumberFormat(currentLanguage).format(count) });
  elements.characterCount.classList.toggle("is-near-limit", count >= 1950);
  updateSendButton();
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2400);
}

function nearBottom() {
  return elements.messageLog.scrollHeight - elements.messageLog.scrollTop - elements.messageLog.clientHeight < 130;
}

async function loadOlderMessages() {
  if (isLoadingOlder || !hasMoreMessages || !selectedConversation || currentMessages.length === 0) return;
  isLoadingOlder = true;
  elements.olderLoading.hidden = false;
  const oldHeight = elements.messageLog.scrollHeight;
  const oldestId = currentMessages[0].id;
  try {
    const older = await service.getMessages(selectedConversation.id, { before: oldestId, limit: 30 });
    currentMessages = [...older.messages, ...currentMessages];
    hasMoreMessages = older.hasMore;
    renderMessages();
    elements.messageLog.scrollTop = elements.messageLog.scrollHeight - oldHeight;
  } catch { showToast(t("errorTryAgain")); }
  elements.olderLoading.hidden = true;
  isLoadingOlder = false;
}

async function submitMessage(event) {
  event.preventDefault();
  const text = elements.messageInput.value.trim();
  if (!text && !pendingPhoto) return;
  if (!selectedConversation || elements.messageForm.hidden) return;
  const wasNearBottom = nearBottom();
  const recipient = selectedConversation.user;
  const now = new Date().toISOString();
  const optimisticMessage = { id: `out-${Date.now()}`, sender: "me", type: pendingPhoto ? "image" : "text", text, imageUrl: pendingPhoto?.dataUrl, createdAt: now, status: "sending" };
  currentMessages.push(optimisticMessage);
  if (currentMessages.length > 30 && !hasMoreMessages) currentMessages = currentMessages.slice(-30);
  elements.messageInput.value = "";
  clearPendingPhoto();
  resizeComposer();
  renderMessages();
  if (wasNearBottom) requestAnimationFrame(() => { elements.messageLog.scrollTop = elements.messageLog.scrollHeight; });

  const previousId = selectedConversation.id;
  try {
    const result = await service.sendMessage(previousId, optimisticMessage, selectedConversation.draft ? recipient : null);
    selectedConversation = result.conversation;
    const local = currentMessages.find((message) => message.id === optimisticMessage.id);
    if (local) local.status = result.message.status;
    if (previousId !== result.conversation.id) {
      selectedConversation.draft = false;
      setUrlConversation(result.conversation.id, "replace");
    }
    allConversations = await service.getConversations();
    renderChatHeader(); renderMessages(); renderConversations();
    if (result.message.status === "failed") showToast(t("messageFailedSend"));
    if (wasNearBottom) requestAnimationFrame(() => { elements.messageLog.scrollTop = elements.messageLog.scrollHeight; });
    if (recipient.id === "lina-haddad" && !replyScheduled) scheduleDemoReply(result.conversation.id);
  } catch {
    const local = currentMessages.find((message) => message.id === optimisticMessage.id);
    if (local) local.status = "failed";
    renderMessages();
    showToast(t("messageFailedSend"));
  }
}

function scheduleDemoReply(conversationId) {
  replyScheduled = true;
  window.setTimeout(async () => {
    const keepAtBottom = selectedConversation?.id === conversationId && nearBottom();
    const incoming = await service.addIncomingMessage(conversationId, "I love seeing your progress! Keep going 🌱");
    allConversations = await service.getConversations();
    renderConversations();
    if (selectedConversation?.id === conversationId) {
      currentMessages.push(incoming);
      renderMessages();
      elements.incomingAnnouncement.textContent = `${selectedConversation.user.name}: ${incoming.text}`;
      if (keepAtBottom) requestAnimationFrame(() => { elements.messageLog.scrollTop = elements.messageLog.scrollHeight; });
    }
  }, 3500);
}

async function retryMessage(messageId) {
  const message = currentMessages.find((item) => item.id === messageId);
  if (!message) return;
  message.status = "sending";
  renderMessages();
  try {
    const result = await service.sendMessage(selectedConversation.id, message);
    message.status = result.message.status;
    selectedConversation = result.conversation;
    allConversations = await service.getConversations();
    renderMessages(); renderConversations();
  } catch {
    message.status = "failed";
    renderMessages();
  }
}

function clearPendingPhoto() {
  pendingPhoto = null;
  elements.photoInput.value = "";
  elements.attachmentPreview.hidden = true;
  elements.previewImage.removeAttribute("src");
  updateSendButton();
}

function onPhotoSelected() {
  const file = elements.photoInput.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) { showToast(t("imageOnly")); elements.photoInput.value = ""; return; }
  if (file.size > 5 * 1024 * 1024) { showToast(t("photoTooLarge")); elements.photoInput.value = ""; return; }
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    pendingPhoto = { type: file.type, name: file.name, dataUrl: String(reader.result) };
    elements.previewImage.src = pendingPhoto.dataUrl;
    elements.previewImage.alt = file.name;
    elements.attachmentPreview.hidden = false;
    updateSendButton();
  });
  reader.readAsDataURL(file);
}

function openNewMessage() {
  elements.newDialog.showModal();
  elements.userSearch.value = "";
  searchUserResults("");
  elements.userSearch.focus();
}

let userSearchTimer = 0;
async function searchUserResults(query) {
  elements.userResults.replaceChildren(element("p", "user-search-empty", t("loading")));
  const results = await service.searchUsers(query);
  elements.userResults.replaceChildren();
  const currentId = await service.getCurrentUserId();
  const people = results.filter((user) => user.id !== currentId);
  if (people.length === 0) { elements.userResults.append(element("p", "user-search-empty", t("noPeopleResults"))); return; }
  people.forEach((user) => {
    const button = element("button", "user-result");
    button.type = "button";
    button.setAttribute("role", "option");
    button.disabled = Boolean(user.disabledReason);
    button.append(makeAvatar(user));
    const copy = element("span", "user-result-copy");
    copy.append(element("strong", "", user.name), element("small", "", `@${user.username}`));
    button.append(copy);
    if (user.disabledReason) button.append(element("span", "user-result-reason", t(user.disabledReason)));
    else button.addEventListener("click", () => startConversationWith(user));
    elements.userResults.append(button);
  });
}

async function startConversationWith(user) {
  elements.newDialog.close();
  const existing = allConversations.find((conversation) => conversation.userId === user.id);
  if (existing) await selectConversation(existing.id);
  else await selectConversation(`draft-${user.id}`, { draftUser: user });
}

function askForAction(action) {
  pendingAction = action;
  const name = selectedConversation?.user?.name || "";
  const titleKeys = { block: "confirmBlockTitle", delete: "confirmDeleteTitle", report: "confirmReportTitle" };
  const bodyKeys = { block: "confirmBlockBody", delete: "confirmDeleteBody", report: "confirmReportBody" };
  elements.actionTitle.textContent = t(titleKeys[action], { name });
  elements.actionDescription.textContent = t(bodyKeys[action]);
  elements.confirmAction.textContent = t(action === "delete" ? "deleteConversation" : action === "block" ? "block" : "report");
  elements.actionDialog.showModal();
}

async function confirmPendingAction() {
  const conversationId = selectedConversation?.id;
  const userId = selectedConversation?.userId;
  if (!conversationId) return;
  try {
    if (pendingAction === "delete") {
      await service.deleteConversation(conversationId);
      allConversations = await service.getConversations();
      currentMessages = [];
      selectedConversation = null;
      elements.chatView.hidden = true; elements.chatPlaceholder.hidden = false;
      showMobileChat(false); setUrlConversation(null, "replace"); renderConversations();
      showToast(t("deletedSuccess"));
    } else if (pendingAction === "block") {
      selectedConversation = await service.blockUser(userId) || { ...selectedConversation, blockedByMe: true, user: { ...selectedConversation.user, disabledReason: "youBlocked", canMessage: false } };
      allConversations = await service.getConversations();
      renderChatHeader(); renderConversations(); updateComposerState();
      showToast(t("blockedSuccess"));
    } else if (pendingAction === "report") {
      const latest = currentMessages[currentMessages.length - 1];
      if (latest) await service.reportMessage(latest.id);
      showToast(t("reportedSuccess"));
    }
  } catch { showToast(t("errorTryAgain")); }
  elements.actionDialog.close();
  pendingAction = "";
}

async function onMoreAction(event) {
  const button = event.target.closest("[data-more-action]");
  if (!button || !selectedConversation) return;
  const action = button.dataset.moreAction;
  document.querySelector(".chat-more-menu").open = false;
  if (action === "mute") {
    selectedConversation = await service.setMuted(selectedConversation.id, !selectedConversation.muted);
    allConversations = await service.getConversations();
    renderChatHeader(); renderConversations();
    showToast(t(selectedConversation.muted ? "muted" : "unmuted"));
  } else if (action === "block" && selectedConversation.blockedByMe) {
    selectedConversation = await service.unblockUser(selectedConversation.userId) || { ...selectedConversation, blockedByMe: false, user: { ...selectedConversation.user, disabledReason: "", canMessage: true } };
    allConversations = await service.getConversations();
    renderChatHeader(); renderConversations(); updateComposerState(); showToast(t("unblockedSuccess"));
  } else askForAction(action);
}

function closeDialog(id) {
  const dialog = document.getElementById(id);
  if (dialog?.open) dialog.close();
}

function onPopState() {
  const params = new URLSearchParams(window.location.search);
  const conversationId = params.get("c");
  if (conversationId && conversationId !== selectedConversation?.id) selectConversation(conversationId, { updateUrl: false });
  else if (!conversationId) {
    selectedConversation = null;
    currentMessages = [];
    elements.chatView.hidden = true;
    elements.chatError.hidden = true;
    elements.chatPlaceholder.hidden = false;
    showMobileChat(false);
    renderConversations();
  }
}

function bindEvents() {
  elements.search.addEventListener("input", () => { searchText = elements.search.value; renderConversations(); });
  document.getElementById("new-message-button").addEventListener("click", openNewMessage);
  document.getElementById("placeholder-new-message").addEventListener("click", openNewMessage);
  document.getElementById("back-to-list").addEventListener("click", () => {
    selectedConversation = null;
    currentMessages = [];
    elements.chatView.hidden = true;
    elements.chatPlaceholder.hidden = false;
    showMobileChat(false);
    setUrlConversation(null);
    renderConversations();
  });
  document.getElementById("retry-load").addEventListener("click", () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("error");
    history.replaceState(history.state, "", url);
    const id = url.searchParams.get("c");
    if (id) selectConversation(id, { updateUrl: false });
    else {
      loadConversations();
      elements.chatError.hidden = true;
      elements.chatPlaceholder.hidden = false;
    }
  });
  document.getElementById("attach-photo").addEventListener("click", () => elements.photoInput.click());
  document.getElementById("remove-attachment").addEventListener("click", clearPendingPhoto);
  elements.photoInput.addEventListener("change", onPhotoSelected);
  elements.messageInput.addEventListener("input", resizeComposer);
  elements.messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); elements.messageForm.requestSubmit(); }
  });
  elements.messageForm.addEventListener("submit", submitMessage);
  elements.messageLog.addEventListener("scroll", () => { if (elements.messageLog.scrollTop < 25) loadOlderMessages(); });
  document.querySelector(".chat-more-menu").addEventListener("click", onMoreAction);
  elements.userSearch.addEventListener("input", () => {
    window.clearTimeout(userSearchTimer);
    userSearchTimer = window.setTimeout(() => searchUserResults(elements.userSearch.value), 180);
  });
  document.querySelectorAll("[data-close-dialog]").forEach((button) => button.addEventListener("click", () => closeDialog(button.dataset.closeDialog)));
  document.getElementById("confirm-action").addEventListener("click", confirmPendingAction);
  document.querySelector(".topbar .language")?.addEventListener("click", () => setLanguage(currentLanguage === "en" ? "ar" : "en"));
  window.addEventListener("popstate", onPopState);
}

async function initMessages() {
  applyTranslations();
  bindEvents();
  await loadConversations();
  if (new URLSearchParams(window.location.search).get("error") === "1") {
    elements.skeleton.hidden = true;
    showLoadError();
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const conversationId = params.get("c");
  const recipientId = params.get("to");
  if (conversationId) await selectConversation(conversationId, { updateUrl: false });
  else if (recipientId) {
    const user = (await service.searchUsers("" )).find((person) => person.id === recipientId);
    if (user) {
      const existing = allConversations.find((conversation) => conversation.userId === user.id);
      await selectConversation(existing?.id || `draft-${user.id}`, { updateUrl: false, draftUser: existing ? null : user });
    }
  } else {
    selectedConversation = null;
    elements.chatPlaceholder.hidden = false;
  }
}

initMessages();
