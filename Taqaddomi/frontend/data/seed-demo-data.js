// Load a small local demo account once, without replacing existing browser data.
(function seedTaqaddomiDemoData() {
  const trackerKey = "taqaddomi-my-trackers";
  const profileKey = "taqaddomi-profile";
  const seedFlagKey = "taqaddomi-demo-data-seeded";

  function readArray(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function dateAtOffset(days, hour = 9) {
    const date = new Date();
    date.setDate(date.getDate() + days);
    date.setHours(hour, 0, 0, 0);
    return date;
  }

  function dateString(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function createEntry(trackerId, daysAgo, description, published = true, attachments = []) {
    const createdAt = dateAtOffset(-daysAgo, daysAgo === 0 ? 9 : 10).toISOString();
    return { trackerId, createdAt, description, published, attachments };
  }

  const demoArtwork = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="900" height="520" viewBox="0 0 900 520"><defs><linearGradient id="bg" x2="1" y2="1"><stop stop-color="#dff2c7"/><stop offset="1" stop-color="#fff4d6"/></linearGradient></defs><rect width="900" height="520" fill="url(#bg)"/><circle cx="710" cy="120" r="62" fill="#fff" opacity=".65"/><rect x="295" y="155" width="310" height="220" rx="20" fill="#f7f2df" stroke="#d4c9a8" stroke-width="10" transform="rotate(-7 450 265)"/><rect x="330" y="143" width="290" height="220" rx="20" fill="#fff" stroke="#d8cfb8" stroke-width="8" transform="rotate(5 475 253)"/><path d="M385 205h175M380 245h165M375 285h135" stroke="#91bd65" stroke-width="13" stroke-linecap="round"/><text x="450" y="450" text-anchor="middle" font-family="Arial" font-size="30" font-weight="700" fill="#456b30">A little progress every day</text></svg>')}`;

  const savedTrackers = readArray(trackerKey);
  const shouldSeedTrackers = savedTrackers.length === 0 && localStorage.getItem(seedFlagKey) !== "true";
  if (shouldSeedTrackers) {
    const trackers = [
      {
        id: "demo-daily-reading",
        name: "Daily Reading",
        category: "Reading",
        format: "Daily",
        privacy: "Public",
        status: "active",
        intention: "Make space for a few quiet pages every day.",
        counterUnit: "Session",
        startDate: dateString(dateAtOffset(-14)),
        targetDate: dateString(dateAtOffset(16)),
        picture: demoArtwork,
        entries: [
          createEntry("demo-daily-reading", 3, "Read a chapter before bed and wrote down one idea to remember."),
          createEntry("demo-daily-reading", 2, "Finished the next chapter during my lunch break."),
          createEntry("demo-daily-reading", 1, "Read for 20 minutes this morning. It felt good to slow down."),
          createEntry("demo-daily-reading", 0, "A few pages with my morning coffee to start the day well.", true, [{ type: "image", name: "morning-reading.svg", dataUrl: demoArtwork }])
        ],
        createdAt: dateAtOffset(-14).toISOString()
      },
      {
        id: "demo-movement",
        name: "Move My Body",
        category: "Fitness",
        format: "Daily",
        privacy: "Public",
        status: "active",
        intention: "Feel stronger and have more energy.",
        counterUnit: "Session",
        startDate: dateString(dateAtOffset(-9)),
        targetDate: "",
        picture: "",
        entries: [
          createEntry("demo-movement", 4, "A short walk outside after work."),
          createEntry("demo-movement", 2, "Did a quick stretch and strength session at home."),
          createEntry("demo-movement", 0, "Took the longer walking route today. Small win!", true)
        ],
        createdAt: dateAtOffset(-9).toISOString()
      },
      {
        id: "demo-coding-practice",
        name: "JavaScript Practice",
        category: "Programming",
        format: "Flexible",
        privacy: "Public",
        status: "active",
        intention: "Get more comfortable by building small things.",
        counterUnit: "Session",
        startDate: dateString(dateAtOffset(-7)),
        targetDate: dateString(dateAtOffset(23)),
        picture: "",
        entries: [
          createEntry("demo-coding-practice", 5, "Practiced array methods with a few small exercises."),
          createEntry("demo-coding-practice", 2, "Built a tiny search filter and learned more about event listeners."),
          createEntry("demo-coding-practice", 0, "Spent one focused session learning how to organize reusable functions.", true)
        ],
        createdAt: dateAtOffset(-7).toISOString()
      },
      {
        id: "demo-evening-reflection",
        name: "Evening Reflection",
        category: "Habits",
        format: "Daily",
        privacy: "Private",
        status: "active",
        intention: "Notice what went well and what I want to improve.",
        counterUnit: "Session",
        startDate: dateString(dateAtOffset(-11)),
        targetDate: "",
        picture: "",
        entries: [
          createEntry("demo-evening-reflection", 3, "Wrote down three things I was grateful for.", false),
          createEntry("demo-evening-reflection", 1, "Made a simple plan for tomorrow.", false)
        ],
        createdAt: dateAtOffset(-11).toISOString()
      },
      {
        id: "demo-water-breaks",
        name: "Water Breaks",
        category: "Wellness",
        format: "Daily",
        privacy: "Private",
        status: "completed",
        intention: "Build a steady reminder to take care of myself.",
        counterUnit: "Day",
        startDate: dateString(dateAtOffset(-30)),
        targetDate: dateString(dateAtOffset(-5)),
        picture: "",
        entries: [
          createEntry("demo-water-breaks", 12, "Kept my water bottle close throughout the day.", false),
          createEntry("demo-water-breaks", 9, "Remembered to take water breaks between tasks.", false),
          createEntry("demo-water-breaks", 5, "Finished this tracker goal. Feeling proud of the routine.", false)
        ],
        createdAt: dateAtOffset(-30).toISOString()
      }
    ];

    localStorage.setItem(trackerKey, JSON.stringify(trackers));
    localStorage.setItem(seedFlagKey, "true");

    const readingPostId = `demo-daily-reading-${trackers[0].entries[3].createdAt}`;
    const movementPostId = `demo-movement-${trackers[1].entries[2].createdAt}`;
    if (!localStorage.getItem("taqaddomi-community-comments")) {
      localStorage.setItem("taqaddomi-community-comments", JSON.stringify({
        [readingPostId]: ["Love this calm start to the day!", "Adding a few pages to my morning tomorrow."],
        [movementPostId]: ["Nice work showing up for yourself!", "A walk always helps me reset too."]
      }));
    }
    if (!localStorage.getItem("taqaddomi-community-reactions")) {
      localStorage.setItem("taqaddomi-community-reactions", JSON.stringify({
        [readingPostId]: { counts: { love: 4, celebrate: 2, support: 1 }, mine: {} },
        [movementPostId]: { counts: { love: 2, celebrate: 3, support: 4 }, mine: {} }
      }));
    }
  }

  if (!localStorage.getItem(profileKey)) {
    localStorage.setItem(profileKey, JSON.stringify({
      name: "Kareem Zaid",
      username: "kareemz",
      bio: "Building better habits, one day at a time.",
      avatar: "🌱"
    }));
  }

  if (!localStorage.getItem("taqaddomi-following")) {
    localStorage.setItem("taqaddomi-following", JSON.stringify([
      { id: "lina-haddad", name: "Lina Haddad", username: "linagrows", avatar: "🌷", bio: "Small steps, steady growth." },
      { id: "maya-khalil", name: "Maya Khalil", username: "mayareads", avatar: "📚", bio: "A little reading every day." }
    ]));
  }

  if (!localStorage.getItem("taqaddomi-followers")) {
    localStorage.setItem("taqaddomi-followers", JSON.stringify([
      { id: "sara-amin", name: "Sara Amin", username: "saramoves", avatar: "🌼" },
      { id: "yousef-rami", name: "Yousef Rami", username: "yousefbuilds", avatar: "🪴" },
      { id: "noor-salem", name: "Noor Salem", username: "noorjournals", avatar: "🌙" }
    ]));
  }
})();
