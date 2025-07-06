/* Madrazo Gang – site-wide JS
   Handles: burger nav, active link, scroll fades, gallery modal */
document.addEventListener("DOMContentLoaded", () => {
  // ========= MOBILE BURGER =========
  const burger = document.querySelector(".burger");
  const navList = document.querySelector("nav ul");
  if (burger) {
    burger.addEventListener("click", () => navList.classList.toggle("open"));
  }

  // ========= ACTIVE NAV LINK =========
  const current = location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll("nav a")
    .forEach(a => (a.href.endsWith(current) ? a.classList.add("active") : null));

  // ========= SCROLL‑FADE ANIMATIONS =========
  const faders = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    faders.forEach(el => io.observe(el));
  } else {
    // Fallback: just show everything
    faders.forEach(el => el.classList.add("visible"));
  }

  // ========= GALLERY MODAL =========
  const galleryImgs = document.querySelectorAll(".member-card img");
  if (galleryImgs.length) {
    // Create modal once
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = '<img src="" alt="zoom"><!--click close-->';
    document.body.appendChild(modal);

    modal.addEventListener("click", () => modal.classList.remove("open"));

    galleryImgs.forEach(img => {
      img.addEventListener("click", e => {
        modal.querySelector("img").src = e.target.src;
        modal.classList.add("open");
      });
    });
  }

  // ========= ANONYMOUS TIPS (optional) =========
  const tipForm = document.querySelector("form[data-tips]");
  if (tipForm) {
    tipForm.addEventListener("submit", e => {
      e.preventDefault();
      const msg = tipForm.querySelector("textarea").value.trim();
      if (!msg) return alert("Say something first, snitch 🤨");
      // Store locally – in real life you'd POST this.
      const tips = JSON.parse(localStorage.getItem("madrazoTips") || "[]");
      tips.push({ msg, at: Date.now() });
      localStorage.setItem("madrazoTips", JSON.stringify(tips));
      alert("Tip delivered. We’ll be in touch… maybe.");
      tipForm.reset();
    });
  }
});
