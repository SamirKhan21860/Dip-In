// Scroll reveal using IntersectionObserver
const revealEls = document.querySelectorAll("[data-reveal]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("active");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
revealEls.forEach((el) => observer.observe(el));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document
      .querySelector(link.getAttribute("href"))
      .scrollIntoView({ behavior: "smooth" });
  });
});

const modeToggle = document.getElementById("modeToggle");
const themeIcon = document.getElementById("themeIcon");

const sunPath = `<path d="M12 4.75a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm0 12.5a.75.75 0 01.75.75v1a.75.75 0 01-1.5 0v-1a.75.75 0 01.75-.75zm7.25-5.5a.75.75 0 010 1.5h-1a.75.75 0 010-1.5h1zM5.75 12a.75.75 0 010 1.5h-1a.75.75 0 010-1.5h1zM17.03 7.03a.75.75 0 011.06 1.06l-.707.707a.75.75 0 01-1.06-1.06l.707-.707zM6.64 17.36a.75.75 0 011.06 1.06l-.707.707a.75.75 0 01-1.06-1.06l.707-.707zM6.64 6.64a.75.75 0 10-1.06 1.06l.707.707a.75.75 0 101.06-1.06L6.64 6.64zm10.39 10.39a.75.75 0 10-1.06 1.06l.707.707a.75.75 0 101.06-1.06l-.707-.707zM12 7a5 5 0 100 10 5 5 0 000-10z"/>`;

const moonPath = `<path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"/>`;

// On toggle click:
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const isLight = document.body.classList.contains("light");
  themeIcon.innerHTML = isLight ? sunPath : moonPath;
  localStorage.setItem("dipMode", isLight ? "light" : "dark");
});

// On load:
if (localStorage.getItem("dipMode") === "light") {
  document.body.classList.add("light");
  themeIcon.innerHTML = sunPath;
} else {
  themeIcon.innerHTML = moonPath;
}

// Contact Form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = name.value.trim(),
    email = email.value.trim(),
    msg = message.value.trim();
  const response = formResponse;
  if (!name || !email || !msg) {
    response.textContent = "Please complete all fields.";
    response.style.color = "#f87171";
  } else {
    response.textContent = "Thanks! We'll reach out soon.";
    response.style.color = "#00e5ff";
    contactForm.reset();
  }
});

// Button hover ripple effect
document.querySelectorAll("button").forEach((btn) => {
  btn.addEventListener("mouseenter", (e) => {
    const circle = document.createElement("span");
    const d = Math.max(btn.clientWidth, btn.clientHeight);
    circle.style.width = circle.style.height = `${d}px`;
    circle.style.left = `${e.clientX - btn.offsetLeft - d / 2}px`;
    circle.style.top = `${e.clientY - btn.offsetTop - d / 2}px`;
    circle.classList.add("ripple");
    btn.appendChild(circle);
    setTimeout(() => circle.remove(), 600);
  });
});
