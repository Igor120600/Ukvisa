// ---------------------------------------------------------------
// Контакты заданы напрямую в HTML (email и Telegram-ссылки в
// contacts.html и в футере каждой страницы). Если понадобится их
// сменить — ищите caminovisas@gmail.com и t.me/+79770816573 по файлам.
// ---------------------------------------------------------------
const CONTACT_EMAIL = "caminovisas@gmail.com";

document.addEventListener("DOMContentLoaded", () => {

  // mobile nav toggle
  const burger = document.getElementById("burgerBtn");
  const nav = document.getElementById("siteNav");
  if (burger && nav) {
    burger.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach(link =>
      link.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(item => {
    const q = item.querySelector(".faq-q");
    const a = item.querySelector(".faq-a");
    if (!q || !a) return;
    q.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(other => {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add("open");
        a.style.maxHeight = a.scrollHeight + "px";
      }
    });
  });

  // lead form -> email handoff
  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const visaType = document.getElementById("visaType").value;
      const message = document.getElementById("message").value.trim();

      const subject = `Заявка с сайта: ${visaType}`;
      let body = `Здравствуйте! Меня зовут ${name || "—"}.`;
      body += `\nИнтересует: ${visaType}.`;
      if (message) body += `\n\n${message}`;

      const url = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = url;
    });
  }
});
