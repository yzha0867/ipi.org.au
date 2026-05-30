(function () {
  const profileTemplate = `
    <div class="profile-card-head">
      <div class="profile-avatar">JD</div>
      <div>
        <strong>Jane Doe</strong>
        <span>IPI-PA-2026-001256</span>
      </div>
    </div>
    <div class="profile-status">
      <span>Current pathway</span>
      <strong>Toddlerhood · 43% complete</strong>
    </div>
    <nav class="profile-links" aria-label="Account menu">
      <a href="index.html">My learning dashboard</a>
      <a href="courses.html">Learning pathway</a>
      <a href="submission.html">Uploaded documents</a>
      <a href="assessment.html">Assessment schedule</a>
      <button type="button">Sign out</button>
    </nav>
  `;

  document.querySelectorAll("[data-profile-selector]").forEach((selector) => {
    const button = selector.querySelector("[data-profile-toggle]");
    const menu = selector.querySelector("[data-profile-menu]");
    if (!button || !menu) return;

    menu.innerHTML = profileTemplate;

    menu.querySelector('button[type="button"]').addEventListener("click", () => {
      localStorage.clear();
      window.location.href = "index.html";
    });

    button.addEventListener("click", () => {
      const isOpen = selector.classList.toggle("open");
      button.setAttribute("aria-expanded", String(isOpen));
    });
  });

  document.addEventListener("click", (event) => {
    document.querySelectorAll("[data-profile-selector].open").forEach((selector) => {
      if (selector.contains(event.target)) return;
      selector.classList.remove("open");
      selector.querySelector("[data-profile-toggle]")?.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    document.querySelectorAll("[data-profile-selector].open").forEach((selector) => {
      selector.classList.remove("open");
      selector.querySelector("[data-profile-toggle]")?.setAttribute("aria-expanded", "false");
    });
  });
})();
