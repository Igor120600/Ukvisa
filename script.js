// ---------------------------------------------------------------
// ЕДИНСТВЕННОЕ МЕСТО ДЛЯ НАСТРОЙКИ: номер WhatsApp в международном
// формате, без "+", без пробелов. Например для +44 7700 900123
// нужно указать "447700900123".
// ---------------------------------------------------------------
const WHATSAPP_NUMBER = "000000000000"; // TODO: заменить на реальный номер

document.addEventListener("DOMContentLoaded", () => {

  // apply the configured number to any direct WhatsApp links on the page
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
    a.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  });

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

  // lead form -> WhatsApp handoff
  const form = document.getElementById("leadForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const visaType = document.getElementById("visaType").value;
      const message = document.getElementById("message").value.trim();

      let text = `Здравствуйте! Меня зовут ${name || "—"}.`;
      text += `\nИнтересует: ${visaType}.`;
      if (message) text += `\n\n${message}`;

      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    });
  }
});
