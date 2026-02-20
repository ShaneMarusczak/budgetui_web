(() => {
  "use strict";

  // --- Scroll Reveal ---
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });

  // --- Nav Scroll State ---
  const nav = document.getElementById("nav");

  const updateNav = () => {
    if (window.scrollY > 20) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  // --- Mobile Menu ---
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenuBtn.classList.toggle("active");
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenuBtn.classList.remove("active");
      mobileMenu.classList.remove("open");
    });
  });

  // --- Demo Tabs ---
  const demoTabs = document.querySelectorAll(".demoTab");
  const demoPanels = document.querySelectorAll(".demoPanel");

  demoTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      let targetId = tab.getAttribute("data-tab");

      demoTabs.forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");

      demoPanels.forEach((panel) => {
        panel.classList.remove("active");
      });
      document.getElementById(targetId).classList.add("active");
    });
  });

  // --- Keyboard navigation for demo tabs ---
  const tabList = document.querySelector(".demoTabs");
  if (tabList) {
    tabList.addEventListener("keydown", (e) => {
      let tabs = Array.from(demoTabs);
      let currentIndex = tabs.findIndex((t) => t.classList.contains("active"));
      let newIndex = currentIndex;

      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        newIndex = (currentIndex + 1) % tabs.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      }

      if (newIndex !== currentIndex) {
        tabs[newIndex].click();
        tabs[newIndex].focus();
      }
    });
  }

  // --- Copy Buttons ---
  document.querySelectorAll(".copyBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let text = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 2000);
      }).catch(() => {
        btn.textContent = "Failed";
        setTimeout(() => {
          btn.textContent = "Copy";
        }, 2000);
      });
    });
  });

  // --- Hero Terminal Staggered Reveal ---
  const heroTerminal = document.getElementById("heroTerminalContent");
  if (heroTerminal) {
    let prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion) {
      let elements = heroTerminal.querySelectorAll(".termCards .termCard, .termNetWorth, .termBarRow, .termSection > .termSectionTitle, .termSparkline, .termSparkLabels");
      elements.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(8px)";
        el.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      });

      let delay = 400;
      elements.forEach((el, idx) => {
        setTimeout(() => {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, delay + idx * 80);
      });
    }
  }

  // --- Smooth scroll for anchor links (fallback) ---
  document.querySelectorAll("a[href^=\"#\"]").forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      let href = anchor.getAttribute("href");
      if (href === "#") return;
      let target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
