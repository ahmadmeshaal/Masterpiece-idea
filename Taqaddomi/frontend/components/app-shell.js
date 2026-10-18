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
          <a data-path="dashboard" href="#"><span class="nav-label"><i class="icon">space_dashboard</i>Dashboard</span></a>
          <a data-path="community-feed" href="#"><span class="nav-label"><i class="icon">explore</i>Community &amp; Discover</span></a>
          <a data-path="my-trackers" href="../my-trackers/index.html"><span class="nav-label"><i class="icon">track_changes</i>My Trackers</span><i class="active-dot"></i></a>
          <a data-path="insights-and-recap" href="#"><span class="nav-label"><i class="icon">insights</i>Insights &amp; Recap</span></a>
          <a data-path="notifications" href="#"><span class="nav-label"><i class="icon">notifications</i>Notifications</span><b>3</b></a>
          <a data-path="settings" href="#"><span class="nav-label"><i class="icon">settings</i>Settings</span></a>
        </nav>
      </div>
      <div class="profile">
        <span class="avatar">🌱</span>
        <span class="profile-copy"><strong>Kareem Zaid</strong><small>@kareemz • Lvl 8 🔥 14d</small></span>
        <i class="icon profile-arrow">expand_more</i>
      </div>
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
        <span class="small-avatar">K</span>
      </div>
    </header>`;

  sidebar.querySelectorAll("[data-path]").forEach((link) => {
    if (link.dataset.path === activePage) {
      link.classList.add("selected");
      link.setAttribute("aria-current", "page");
    }
  });

  sidebar.querySelector("[data-open-entry]").addEventListener("click", () => {
    if (document.getElementById("entry-dialog")) {
      window.dispatchEvent(new CustomEvent("taqaddomi:open-entry"));
      return;
    }
    window.location.href = "../my-trackers/index.html?open-entry=1";
  });
}
