const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const menuBtn = $("#menuBtn");
const navMenu = $("#navMenu");
menuBtn.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.textContent = open ? "×" : "☰";
});
$$(".nav-menu a").forEach(link => link.addEventListener("click", () => {
  navMenu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.textContent = "☰";
}));

let currentLang = "ar";
const langBtn = $("#langBtn");
function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.classList.toggle("english", lang === "en");
  $$("[data-ar][data-en]").forEach(el => {
    const value = el.dataset[lang];
    if (value !== undefined) el.innerHTML = value;
  });
  $$("[data-placeholder-ar][data-placeholder-en]").forEach(el => {
    el.placeholder = el.dataset[`placeholder${lang.toUpperCase()}`];
  });
  langBtn.textContent = lang === "ar" ? "EN" : "ع";
    document.title = lang === "ar" ? "المهندس عبدالله الريح  | مهندس مدني" : "ABDALLAH ALRAYAH | Civil Engineer"; 
}
langBtn.addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));

const themeBtn = $("#themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
});

$$(".filter").forEach(button => {
  button.addEventListener("click", () => {
    $$(".filter").forEach(item => item.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;
    $$(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.category !== filter);
    });
  });
});

const modal = $("#projectModal");
const modalImage = $("#modalImage");
$$(".project-open").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".project-card");
    modalImage.src = $("img", button).src;
    modalImage.alt = $("img", button).alt;
    $("#modalTitle").textContent = card.dataset[`title${currentLang.toUpperCase()}`];
    $("#modalDescription").textContent = card.dataset[`description${currentLang.toUpperCase()}`];
    $("#modalMeta").textContent = card.dataset[`meta${currentLang.toUpperCase()}`];
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});
function closeModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
$$("[data-close]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

$("#contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const recipient = "abdallahmokhtar.998@gmail.com"; // استبدل ببريد المهندس
  const subject = encodeURIComponent(data.get("subject"));
  const body = encodeURIComponent(
    `الاسم: ${data.get("name")}\nالبريد: ${data.get("email")}\n\nالرسالة:\n${data.get("message")}`
  );
  window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
});

const progressBar = $("#progressBar");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
}, { passive: true });

const year = new Date().getFullYear();
$$(".footer-inner p").forEach(el => {
  el.innerHTML = el.innerHTML.replace("<YEAR>", year);
});
