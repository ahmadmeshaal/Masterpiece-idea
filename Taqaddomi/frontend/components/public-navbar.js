// One public navbar shared by the landing, login, and create-account pages.
const navbarPlaceholder = document.getElementById("public-navbar");

if (navbarPlaceholder) {
  const currentPage = navbarPlaceholder.dataset.page;
  const landingPage = currentPage === "landing" ? "./index.html" : "../landing-page/index.html";

  navbarPlaceholder.outerHTML = `
    <header class="public-navbar sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#ECE6D9]">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
        <a class="flex items-center gap-3 group shrink-0" href="${landingPage}" aria-label="Taqaddomi home">
          <div class="w-10 h-10 rounded-2xl bg-[#58cc02] flex items-center justify-center text-white border-2 border-[#46a302] border-b-4 border-b-[#347a01] shadow-sm group-hover:scale-105 transition-transform">
            <span class="material-symbols-outlined text-2xl font-black">bolt</span>
          </div>
          <span class="text-xl font-black text-[#22221b] tracking-tight">Taqaddomi</span>
        </a>
        <nav class="hidden md:flex items-center gap-1.5 text-sm font-bold text-[#525046]" aria-label="Main navigation">
          <a class="px-4 py-1.5 rounded-full hover:text-[#22221b] hover:bg-[#ede7d8]/60 transition-all" href="${landingPage}#tracker-types">Features</a>
          <a class="px-4 py-1.5 rounded-full hover:text-[#22221b] hover:bg-[#ede7d8]/60 transition-all" href="${landingPage}#community-feed">Community</a>
          <a class="px-4 py-1.5 rounded-full hover:text-[#22221b] hover:bg-[#ede7d8]/60 transition-all" href="${landingPage}#pricing-faq">Pricing</a>
          <a class="px-4 py-1.5 rounded-full hover:text-[#22221b] hover:bg-[#ede7d8]/60 transition-all" href="${landingPage}#faq">FAQ</a>
        </nav>
        <div class="flex items-center gap-3 shrink-0">
          <button class="theme-toggle-public" type="button" data-theme-toggle aria-label="Switch to dark mode" aria-pressed="false" title="Switch to dark mode"><span class="material-symbols-outlined" data-theme-icon>wb_sunny</span></button>
          <div class="hidden sm:flex items-center bg-[#ede7d8] rounded-full p-1 border border-[#dfd7c4]">
            <button class="px-3 py-1 rounded-full text-xs font-black bg-white text-[#2b2b24] shadow-sm border border-[#ded5c2]" type="button">EN</button>
            <button class="px-3 py-1 rounded-full text-xs font-black text-[#757264] hover:text-[#2b2b24] transition-colors" type="button">العربية</button>
          </div>
          <a class="hidden sm:inline-block text-xs font-bold text-[#525046] hover:text-[#22221b] px-3 py-2 transition-colors" href="../login/index.html">Sign In</a>
          <a class="btn-tactile-green font-black px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 cursor-pointer shadow-sm" href="../create-account/index.html">
            <span>Start Free</span>
            <span class="material-symbols-outlined text-base font-black">arrow_forward</span>
          </a>
        </div>
      </div>
    </header>`;
}
