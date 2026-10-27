// Shared sidebar and top navigation for app pages.
const sidebar = document.getElementById("app-sidebar");
const header = document.getElementById("app-header");

if (sidebar && header) {
  const activePage = sidebar.dataset.activePage;

  sidebar.innerHTML = `
    <aside class="sidebar">
      <div class="sidebar-top">
        <a class="brand" href="../my-trackers/index.html" aria-label="Taqaddomi home">
          <span class="brand-icon icon">verified</span>
          <span><strong>Taqaddomi</strong></span>
        </a>
        <div class="sidebar-add-wrap">
          <button class="sidebar-add btn-tactile-green" type="button" data-open-entry>
            <span class="icon">add_circle</span><span>Add Entry</span>
          </button>
        </div>
        <nav class="navigation" aria-label="Main navigation">
          <a data-path="dashboard" href="../dashboard/index.html"><span class="nav-label"><i class="icon">space_dashboard</i>Dashboard</span></a>
          <a data-path="community-feed" href="../community-feed/index.html"><span class="nav-label"><i class="icon">explore</i>Community &amp; Discover</span></a>
          <a data-path="messages" href="../messages/index.html"><span class="nav-label"><i class="icon">chat</i>Messages</span><b class="messages-unread-badge" data-message-count hidden>0</b></a>
          <a data-path="my-trackers" href="../my-trackers/index.html"><span class="nav-label"><i class="icon">track_changes</i>My Trackers</span><i class="active-dot"></i></a>
          <a data-path="insights-and-recap" href="#"><span class="nav-label"><i class="icon">insights</i>Insights &amp; Recap</span></a>
          <a data-path="notifications" href="#"><span class="nav-label"><i class="icon">notifications</i>Notifications</span><b>3</b></a>
          <a data-path="settings" href="#"><span class="nav-label"><i class="icon">settings</i>Settings</span></a>
        </nav>
      </div>
      <a class="profile" href="../profile/index.html" aria-label="Open your profile">
        <span class="avatar" data-profile-avatar>🌱</span>
        <span class="profile-copy"><strong data-profile-name>Kareem Zaid</strong><small data-profile-username>@kareemz • Lvl 8 🔥 14d</small></span>
        <i class="icon profile-arrow">expand_more</i>
      </a>
    </aside>`;

  header.innerHTML = `
    <header class="topbar">
      <label class="search">
        <span class="icon">search</span>
        <input type="search" placeholder="Search trackers, habits, streaks..." aria-label="Search trackers, habits, and streaks">
      </label>
      <div class="top-actions">
        <button class="top-button language" type="button" title="Switch Language"><span class="icon">translate</span><span>العربية / EN</span></button>
        <button class="top-button icon-button" type="button" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false" title="Switch to dark mode"><span class="icon sun-icon" data-theme-icon>wb_sunny</span></button>
        <button class="top-button icon-button notice" type="button" title="View Notifications"><span class="icon">notifications</span></button>
        <a class="small-avatar" href="../profile/index.html" data-profile-initial aria-label="Open your profile">K</a>
      </div>
    </header>
    <nav class="bottom-nav" aria-label="Mobile navigation">
      <a data-mobile-path="dashboard" href="../dashboard/index.html"><span class="icon">space_dashboard</span><span>Home</span></a>
      <a data-mobile-path="community-feed" href="../community-feed/index.html"><span class="icon">explore</span><span>Community</span></a>
      <a data-mobile-path="messages" href="../messages/index.html"><span class="icon">chat</span><span>Messages</span><b class="messages-unread-badge" data-message-count hidden>0</b></a>
      <a data-mobile-path="my-trackers" href="../my-trackers/index.html"><span class="icon">track_changes</span><span>Trackers</span></a>
      <a data-mobile-path="profile" href="../profile/index.html"><span class="icon">person</span><span>Profile</span></a>
    </nav>`;

  sidebar.querySelectorAll("[data-path]").forEach((link) => {
    if (link.dataset.path === activePage) {
      link.classList.add("selected");
      link.setAttribute("aria-current", "page");
    }
  });
  header.querySelectorAll("[data-mobile-path]").forEach((link) => {
    if (link.dataset.mobilePath === activePage) {
      link.classList.add("selected");
      link.setAttribute("aria-current", "page");
    }
  });
  if (activePage === "profile") sidebar.querySelector(".profile").classList.add("is-current");

  try {
    const profile = JSON.parse(localStorage.getItem("taqaddomi-profile") || "{}");
    if (profile.name) sidebar.querySelector("[data-profile-name]").textContent = profile.name;
    if (profile.username) sidebar.querySelector("[data-profile-username]").textContent = `@${profile.username}`;
    const sidebarAvatar = sidebar.querySelector("[data-profile-avatar]");
    if (profile.avatarImage) {
      sidebarAvatar.textContent = "";
      sidebarAvatar.style.backgroundImage = `url("${profile.avatarImage}")`;
      sidebarAvatar.style.backgroundPosition = "center";
      sidebarAvatar.style.backgroundSize = "cover";
    } else if (profile.avatar) sidebarAvatar.textContent = profile.avatar;
    const initial = header.querySelector("[data-profile-initial]");
    if (initial && profile.avatarImage) {
      initial.textContent = "";
      initial.style.backgroundImage = `url("${profile.avatarImage}")`;
      initial.style.backgroundPosition = "center";
      initial.style.backgroundSize = "cover";
    } else if (initial && profile.name) initial.textContent = profile.name.trim().charAt(0).toUpperCase();
  } catch {
    // Keep the default profile details when saved profile data is unavailable.
  }

  sidebar.querySelector("[data-open-entry]").addEventListener("click", () => {
    if (document.getElementById("entry-dialog")) {
      window.dispatchEvent(new CustomEvent("taqaddomi:open-entry"));
      return;
    }
    window.location.href = "../my-trackers/index.html?open-entry=1";
  });

  const updateMessageBadges = () => {
    let unread = 0;
    try {
      const conversations = JSON.parse(localStorage.getItem("taqaddomi-messages-conversations") || "[]");
      unread = conversations.reduce((total, conversation) => total + (conversation.muted ? 0 : Number(conversation.unreadCount) || 0), 0);
    } catch {
      unread = 0;
    }
    [...sidebar.querySelectorAll("[data-message-count]"), ...header.querySelectorAll("[data-message-count]")].forEach((badge) => {
      badge.textContent = unread > 99 ? "99+" : String(unread);
      badge.hidden = unread === 0;
    });
  };

  updateMessageBadges();
  window.addEventListener("taqaddomi:messages-updated", updateMessageBadges);
}
