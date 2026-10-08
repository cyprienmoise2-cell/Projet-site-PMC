
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // 1. Meni navigasyon pou telefòn
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    function closeMenu() {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Ouvrir le menu");
    }

    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fermer le menu" : "Ouvrir le menu"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // 2. Animasyon lè eleman yo antre nan ekran an
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealElements.forEach((element, index) => {
      element.style.transitionDelay = `${(index % 3) * 90}ms`;
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 3. Ba ki montre pwogrè moun nan pandan l ap desann
  const scrollProgress = document.getElementById("scrollProgress");

  if (scrollProgress) {
    let ticking = false;

    function updateScrollProgress() {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        scrollableHeight > 0
          ? (window.scrollY / scrollableHeight) * 100
          : 0;

      scrollProgress.style.width = `${Math.min(progress, 100)}%`;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateScrollProgress);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateScrollProgress();
  }

  // 4. Mete ane aktyèl la otomatikman nan pye paj la
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // 5. Prepare mesaj WhatsApp pou chak sèvis
  const serviceLinks = document.querySelectorAll("[data-service]");

  serviceLinks.forEach((link) => {
    const serviceName = link.dataset.service;

    const message =
      `Bonjour PMC Service Digital ! Je souhaite en savoir plus ` +
      `sur votre service : ${serviceName}. ` +
      `Pouvez-vous me renseigner et me proposer un devis ?`;

    link.href =
      `https://wa.me/50944813936?text=${encodeURIComponent(message)}`;

    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  // 6. Respekte preferans moun ki pa vle anpil animasyon
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  );

  if (reducedMotion.matches) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }
});
    
