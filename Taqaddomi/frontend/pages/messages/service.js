// Mock API for Messages. Replace this file when a real messages API is ready.
(() => {
  const conversationKey = "taqaddomi-messages-conversations";
  const messageKey = "taqaddomi-messages-content";
  const userKey = "taqaddomi-messages-users";
  const reportKey = "taqaddomi-messages-reports";
  const wait = (milliseconds = 180) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
  const ago = (days = 0, minutes = 0) => new Date(Date.now() - days * 86400000 - minutes * 60000).toISOString();
  const makeMessage = (id, sender, type, text, time, extra = {}) => ({ id, sender, type, text, createdAt: time, status: "sent", ...extra });

  const demoUsers = [
    { id: "lina-haddad", name: "Lina Haddad", username: "linagrows", avatar: "🌷", privacy: "everyone" },
    { id: "omar-saleh", name: "Omar Saleh", username: "omarfocus", avatar: "🏃", privacy: "everyone" },
    { id: "maya-khalil", name: "Maya Khalil", username: "mayareads", avatar: "📚", privacy: "everyone" },
    { id: "adam-nasser", name: "Adam Nasser", username: "adamcodes", avatar: "💻", privacy: "everyone" },
    { id: "noor-amin", name: "Noor Amin", username: "noorcreates", avatar: "🎨", privacy: "everyone" },
    { id: "sami-yousef", name: "Sami Yousef", username: "samiruns", avatar: "🏅", privacy: "following" },
    { id: "rana-khaled", name: "Rana Khaled", username: "ranareads", avatar: "☕", privacy: "everyone" },
    { id: "yara-mansour", name: "Yara Mansour", username: "yaragrows", avatar: "🌻", privacy: "no-one", blockedMe: true }
  ];

  const demoConversations = [
    { id: "chat-lina", userId: "lina-haddad", unreadCount: 2, muted: false, blockedByMe: false, blockedMe: false, readAt: ago(0, 9), lastMessageAt: ago(0, 2) },
    { id: "chat-omar", userId: "omar-saleh", unreadCount: 3, muted: true, blockedByMe: false, blockedMe: false, readAt: ago(0, 30), lastMessageAt: ago(0, 30) },
    { id: "chat-maya", userId: "maya-khalil", unreadCount: 1, muted: false, blockedByMe: false, blockedMe: false, readAt: ago(0, 50), lastMessageAt: ago(0, 50) },
    { id: "chat-adam", userId: "adam-nasser", unreadCount: 0, muted: false, blockedByMe: false, blockedMe: false, readAt: ago(0, 90), lastMessageAt: ago(0, 90) },
    { id: "chat-noor", userId: "noor-amin", unreadCount: 0, muted: false, blockedByMe: true, blockedMe: false, readAt: ago(1), lastMessageAt: ago(1) },
    { id: "chat-sami", userId: "sami-yousef", unreadCount: 0, muted: false, blockedByMe: false, blockedMe: false, readAt: ago(1, 40), lastMessageAt: ago(1, 40) },
    { id: "chat-rana", userId: "rana-khaled", unreadCount: 0, muted: false, blockedByMe: false, blockedMe: false, readAt: ago(2), seenAt: ago(0), lastMessageAt: ago(2) },
    { id: "chat-yara", userId: "yara-mansour", unreadCount: 0, muted: false, blockedByMe: false, blockedMe: true, readAt: ago(2), lastMessageAt: ago(3) }
  ];

  const placeholderPhoto = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='640' height='440' viewBox='0 0 640 440'%3E%3Crect width='640' height='440' fill='%23e5f2d8'/%3E%3Ccircle cx='320' cy='190' r='95' fill='%2358cc02' opacity='.25'/%3E%3Cpath d='M320 110c-85 72-105 150 0 205 105-55 85-133 0-205Z' fill='%2358cc02'/%3E%3Ctext x='320' y='370' text-anchor='middle' font-family='Arial' font-size='25' fill='%232b6c00'%3EA little progress%3C/text%3E%3C/svg%3E";

  function seedMessages() {
    const trackers = readJson("taqaddomi-my-trackers", []);
    const readingTracker = trackers.find((tracker) => tracker.id === "demo-daily-reading");
    const publicEntries = (readingTracker?.entries || []).filter((entry) => entry.published).sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    const sharedEntry = publicEntries[publicEntries.length - 1];
    const sharedPost = {
      id: sharedEntry ? `${readingTracker.id}-${sharedEntry.createdAt || readingTracker.entries.indexOf(sharedEntry)}` : "demo-post",
      title: sharedEntry?.description || "A small reading win today"
    };
    const result = {
      "chat-lina": [
        makeMessage("lina-1", "them", "text", "Hey Kareem! How is your reading tracker going?", ago(0, 14)),
        makeMessage("lina-2", "me", "text", "Really well! I just finished today's pages.", ago(0, 11)),
        makeMessage("lina-3", "them", "text", "That is awesome. Keep that streak alive!", ago(0, 9)),
        makeMessage("lina-4", "them", "tracker", "", ago(0, 2), { trackerId: "demo-daily-reading", trackerTitle: "Daily Reading", day: 12, streak: 12, progress: 60 })
      ],
      "chat-omar": [
        makeMessage("omar-1", "me", "text", "Nice run this morning!", ago(0, 60)),
        makeMessage("omar-2", "them", "text", "Thanks! Shared my route with the community too.", ago(0, 30), { sharedType: "post", postId: "post-run", postTitle: "Morning miles, clear mind" })
      ],
      "chat-maya": [
        makeMessage("maya-1", "them", "text", "I made a little tracker for my reading corner.", ago(0, 56)),
        makeMessage("maya-2", "them", "image", "", ago(0, 50), { imageUrl: placeholderPhoto })
      ],
      "chat-adam": [
        makeMessage("adam-1", "me", "text", "How is your coding habit coming along?", ago(0, 105)),
        makeMessage("adam-2", "them", "text", "Seven days in a row! Here is my progress.", ago(0, 90)),
        makeMessage("adam-3", "them", "post", "", ago(0, 90), { postId: sharedPost.id, postTitle: sharedPost.title })
      ],
      "chat-noor": [
        makeMessage("noor-1", "them", "text", "I need a little space from messages right now.", ago(1))
      ],
      "chat-sami": [
        makeMessage("sami-1", "them", "text", "Thanks for checking in!", ago(1, 40))
      ],
      "chat-rana": [],
      "chat-yara": [makeMessage("yara-1", "them", "text", "I have paused direct messages for now.", ago(3))]
    };

    const longMessages = result["chat-rana"];
    for (let index = 0; index < 47; index += 1) {
      const sender = index % 2 === 0 ? "them" : "me";
      const day = Math.floor((46 - index) / 10);
      const createdAt = ago(day, (46 - index) % 8 * 17);
      longMessages.push(makeMessage(`rana-${index}`, sender, "text", index === 0 ? "This is the start of our habit planning chat. Scroll up to explore it." : `A small step from our routine chat, message ${index + 1}.`, createdAt));
    }
    longMessages[41].status = "failed";
    demoConversations.find((conversation) => conversation.id === "chat-rana").lastMessageAt = longMessages[longMessages.length - 1].createdAt;
    return result;
  }

  function readJson(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "null");
      return value === null ? fallback : value;
    } catch {
      return fallback;
    }
  }

  function ensureSeeded() {
    if (!localStorage.getItem(messageKey)) localStorage.setItem(messageKey, JSON.stringify(seedMessages()));
    if (!localStorage.getItem(conversationKey)) localStorage.setItem(conversationKey, JSON.stringify(demoConversations));
    if (!localStorage.getItem(userKey)) localStorage.setItem(userKey, JSON.stringify(demoUsers));
  }

  function conversations() { ensureSeeded(); return readJson(conversationKey, []); }
  function messages() { ensureSeeded(); return readJson(messageKey, {}); }
  function users() { ensureSeeded(); return readJson(userKey, demoUsers); }
  function saveConversations(value) { localStorage.setItem(conversationKey, JSON.stringify(value)); publishUnread(); }
  function saveMessages(value) { localStorage.setItem(messageKey, JSON.stringify(value)); }
  function publishUnread() {
    const total = conversations().reduce((count, conversation) => count + (conversation.muted ? 0 : Number(conversation.unreadCount) || 0), 0);
    window.dispatchEvent(new CustomEvent("taqaddomi:messages-updated", { detail: { unread: total } }));
  }
  function reasonFor(user, conversation = null) {
    if (!user) return "";
    if (user.blockedMe) return "blockedYou";
    const blockedByMe = user.blockedByMe || conversation?.blockedByMe;
    if (blockedByMe) return "youBlocked";
    const following = readJson("taqaddomi-following", []);
    const follows = following.some((person) => person.id === user.id || person.username === user.username);
    if (user.privacy === "no-one") return "noMessages";
    if (user.privacy === "following" && !follows) return "followingOnly";
    return "";
  }

  function withUser(conversation) {
    if (!conversation) return null;
    const list = messages()[conversation.id] || [];
    const user = users().find((person) => person.id === conversation.userId) || null;
    const disabledReason = reasonFor(user, conversation);
    return { ...conversation, user: user ? { ...user, disabledReason, canMessage: !disabledReason } : null, lastMessage: list[list.length - 1] || null };
  }

  const api = {
    async getConversations() {
      await wait();
      return conversations().map(withUser).sort((a, b) => new Date(b.lastMessageAt) - new Date(a.lastMessageAt));
    },
    async getConversation(id) {
      await wait(100);
      return withUser(conversations().find((conversation) => conversation.id === id) || null);
    },
    async getMessages(conversationId, { before = null, limit = 30 } = {}) {
      await wait(130);
      const list = messages()[conversationId] || [];
      const endIndex = before ? Math.max(0, list.findIndex((message) => message.id === before)) : list.length;
      const startIndex = Math.max(0, endIndex - limit);
      return { messages: list.slice(startIndex, endIndex), hasMore: startIndex > 0, total: list.length };
    },
    async sendMessage(conversationId, message, recipient = null) {
      ensureSeeded();
      let allConversations = conversations();
      let conversation = allConversations.find((item) => item.id === conversationId);
      if (!conversation && recipient) {
        conversation = { id: `chat-${recipient.id}`, userId: recipient.id, unreadCount: 0, muted: false, blockedByMe: false, blockedMe: false, readAt: new Date().toISOString(), seenAt: null, lastMessageAt: new Date().toISOString() };
        allConversations.push(conversation);
        conversationId = conversation.id;
      }
      if (!conversation) throw new Error("Conversation not found");

      const allMessages = messages();
      allMessages[conversationId] ||= [];
      let saved = allMessages[conversationId].find((item) => item.id === message.id);
      if (saved) saved.status = "sending";
      else {
        saved = { ...message, sender: "me", status: "sending", createdAt: message.createdAt || new Date().toISOString() };
        allMessages[conversationId].push(saved);
      }
      conversation.lastMessageAt = saved.createdAt;
      conversation.unreadCount = 0;
      saveMessages(allMessages);
      saveConversations(allConversations);
      await wait(650 + Math.round(Math.random() * 500));

      const updatedMessages = messages();
      const confirmed = updatedMessages[conversationId].find((item) => item.id === saved.id);
      confirmed.status = Math.random() < 0.1 ? "failed" : "sent";
      saveMessages(updatedMessages);
      publishUnread();
      return { conversation: withUser(conversations().find((item) => item.id === conversationId)), message: confirmed };
    },
    async markAsRead(conversationId) {
      const all = conversations();
      const conversation = all.find((item) => item.id === conversationId);
      if (conversation) { conversation.unreadCount = 0; conversation.readAt = new Date().toISOString(); saveConversations(all); }
      await wait(30);
      return conversation ? withUser(conversation) : null;
    },
    async setMuted(conversationId, muted) {
      const all = conversations();
      const conversation = all.find((item) => item.id === conversationId);
      if (conversation) { conversation.muted = muted; saveConversations(all); }
      return conversation ? withUser(conversation) : null;
    },
    async deleteConversation(conversationId) {
      saveConversations(conversations().filter((item) => item.id !== conversationId));
      const all = messages();
      delete all[conversationId];
      saveMessages(all);
      await wait(80);
    },
    async blockUser(userId, blocked = true) {
      const all = conversations();
      const conversation = all.find((item) => item.userId === userId);
      if (conversation) { conversation.blockedByMe = blocked; saveConversations(all); }
      const updatedUsers = users().map((user) => user.id === userId ? { ...user, blockedByMe: blocked } : user);
      localStorage.setItem(userKey, JSON.stringify(updatedUsers));
      await wait(80);
      return conversation ? withUser(conversation) : null;
    },
    async unblockUser(userId) { return api.blockUser(userId, false); },
    async reportMessage(messageId, reason = "inappropriate") {
      const reports = readJson(reportKey, []);
      reports.push({ messageId, reason, createdAt: new Date().toISOString() });
      localStorage.setItem(reportKey, JSON.stringify(reports));
      await wait(90);
      return { success: true };
    },
    async searchUsers(query = "") {
      await wait(120);
      const normalized = query.trim().toLowerCase();
      return users().filter((user) => !normalized || user.name.toLowerCase().includes(normalized) || user.username.toLowerCase().includes(normalized)).map((user) => {
        const conversation = conversations().find((item) => item.userId === user.id);
        const disabledReason = reasonFor(user, conversation);
        return { ...user, disabledReason, canMessage: !disabledReason };
      });
    },
    async getCurrentUserId() {
      await wait(20);
      return readJson("taqaddomi-profile", {}).id || "current-user";
    },
    async updateUser(user) {
      const updated = users().map((person) => person.id === user.id ? { ...person, ...user } : person);
      localStorage.setItem(userKey, JSON.stringify(updated));
      await wait(60);
    },
    async addIncomingMessage(conversationId, text) {
      const all = messages();
      all[conversationId] ||= [];
      const message = makeMessage(`in-${Date.now()}`, "them", "text", text, new Date().toISOString());
      all[conversationId].push(message);
      saveMessages(all);
      const allConversations = conversations();
      const conversation = allConversations.find((item) => item.id === conversationId);
      if (conversation) {
        conversation.lastMessageAt = message.createdAt;
        if (document.visibilityState !== "visible" || new URLSearchParams(window.location.search).get("c") !== conversationId) conversation.unreadCount = (conversation.unreadCount || 0) + 1;
        else conversation.readAt = message.createdAt;
        saveConversations(allConversations);
      }
      return message;
    }
  };

  ensureSeeded();
  window.MessagesService = api;
})();
