(function () {
  const STORAGE_KEY = "cakes-lang";
  const i18n = window.I18N || { defaultLang: "en", languages: {} };
  const config = window.SITE_CONFIG || {};
  const number = String(config.whatsappNumber || "").replace(/\D/g, "");

  const panels = Array.from(document.querySelectorAll("[data-panel]"));
  const navLinks = Array.from(document.querySelectorAll("[data-tab]"));
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const langSwitch = document.getElementById("lang-switch");
  const whatsappLink = document.getElementById("whatsapp-link");
  const footerWhatsapp = document.getElementById("footer-whatsapp");

  function getSavedLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && i18n.languages[saved]) return saved;
    return i18n.defaultLang || "en";
  }

  function t(lang, key) {
    const pack = i18n.languages[lang] || i18n.languages.en || {};
    return pack[key] ?? key;
  }

  function applyWhatsApp(lang) {
    const message = encodeURIComponent(t(lang, "whatsappMessage"));
    const waUrl = `https://wa.me/${number}?text=${message}`;
    const waSimple = `https://wa.me/${number}`;
    if (whatsappLink) whatsappLink.href = waUrl;
    if (footerWhatsapp) footerWhatsapp.href = waSimple;
  }

  function applyLanguage(lang) {
    const pack = i18n.languages[lang] || i18n.languages.en;
    if (!pack) return;

    document.documentElement.lang = lang;
    document.documentElement.dir = pack.dir || "ltr";
    document.title = pack.metaTitle || document.title;

    const meta = document.querySelector('meta[name="description"]');
    if (meta && pack.metaDescription) meta.setAttribute("content", pack.metaDescription);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (key && pack[key] != null) el.textContent = pack[key];
    });

    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      const key = el.getAttribute("data-i18n-alt");
      if (key && pack[key] != null) el.setAttribute("alt", pack[key]);
    });

    document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria");
      if (key && pack[key] != null) el.setAttribute("aria-label", pack[key]);
    });

    document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
      const key = el.getAttribute("data-i18n-aria-label");
      if (key && pack[key] != null) el.setAttribute("aria-label", pack[key]);
    });

    applyWhatsApp(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function showTab(tabId) {
    panels.forEach((panel) => {
      const active = panel.dataset.panel === tabId;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("is-active", link.dataset.tab === tabId);
    });

    if (nav) nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");

    history.replaceState(null, "", `#${tabId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navLinks.forEach((el) => {
    el.addEventListener("click", (event) => {
      const tabId = el.dataset.tab;
      if (!tabId) return;
      event.preventDefault();
      showTab(tabId);
    });
  });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  if (langSwitch) {
    langSwitch.addEventListener("click", () => {
      const current = document.documentElement.lang || getSavedLang();
      const next = (i18n.languages[current] && i18n.languages[current].otherLang) || "he";
      applyLanguage(next);
    });
  }

  applyLanguage(getSavedLang());

  const initial = (location.hash || "#home").slice(1);
  const valid = panels.some((panel) => panel.dataset.panel === initial);
  showTab(valid ? initial : "home");
})();
