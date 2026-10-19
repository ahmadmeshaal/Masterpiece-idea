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
        <button class="top-button icon-button" type="button" title="Toggle Appearance"><span class="icon sun-icon">wb_sunny</span></button>
        <button class="top-button icon-button notice" type="button" title="View Notifications"><span class="icon">notifications</span></button>
        <a class="small-avatar" href="../profile/index.html" data-profile-initial aria-label="Open your profile">K</a>
      </div>
    </header>`;

  sidebar.querySelectorAll("[data-path]").forEach((link) => {
    if (link.dataset.path === activePage) {
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
}
