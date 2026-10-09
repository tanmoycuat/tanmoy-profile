const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const year = document.querySelector("#year");

year.textContent = new Date().getFullYear();

function closeNavigation() {
  navToggle.setAttribute("aria-expanded", "false");
  siteNav.classList.remove("is-open");
  document.body.style.overflow = "";
}

navToggle.addEventListener("click", () => {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!isOpen));
  siteNav.classList.toggle("is-open", !isOpen);
  document.body.style.overflow = isOpen ? "" : "hidden";
});

navLinks.forEach((link) => link.addEventListener("click", closeNavigation));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeNavigation();
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

// Flip card: toggle on click, then scroll to About.
const flipCard = document.querySelector(".flip-card");
if (flipCard) {
  flipCard.addEventListener("click", () => {
    flipCard.classList.toggle("is-flipped");
    const about = document.querySelector("#about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
  });
}

// Rotating tagline.
const rotator = document.querySelector(".rotator-words");
if (rotator) {
  const words = ["enterprise data platforms", "agentic AI systems", "lakehouse architectures", "automation people trust"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    rotator.textContent = words[0];
  } else {
    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    const type = () => {
      const current = words[wordIndex];
      rotator.textContent = current.slice(0, charIndex);
      if (!deleting && charIndex < current.length) {
        charIndex += 1;
        setTimeout(type, 70);
      } else if (!deleting) {
        deleting = true;
        setTimeout(type, 1600);
      } else if (charIndex > 0) {
        charIndex -= 1;
        setTimeout(type, 35);
      } else {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 250);
      }
    };
    type();
  }
}

/* ------------------------------------------------------------------
   Projects — data-driven.
   To add a project later, add an object to PROJECTS below. Each project's
   `categories` are matched against CATEGORIES; any new category key you use
   that also exists in CATEGORIES automatically gets a filter pill.
   ------------------------------------------------------------------ */
const CATEGORIES = {
  "ai-agents": "AI Agents",
  "data-platform": "Data Platform",
  automation: "Automation",
  documents: "Document Intelligence",
};

const PROJECTS = [
  {
    type: "Enterprise data platform",
    title: "Nordic Advisory Analytics",
    description:
      "Architected a Microsoft Fabric platform spanning Sweden, Finland, and Norway, with governed semantic models and a unified reporting layer.",
    categories: ["data-platform"],
    tags: ["Microsoft Fabric", "Lakehouse", "Power BI"],
  },
  {
    type: "AI-assisted valuation",
    title: "Norway Valuation Model",
    description:
      "Designed a Rent Roll Agent that extracts, validates, and interprets property data from spreadsheets, PDFs, and conversations.",
    categories: ["ai-agents", "documents"],
    tags: ["Azure AI Foundry", "OpenAI", "Python"],
  },
  {
    type: "Financial controls",
    title: "Project Overmind",
    description:
      "Built an AI workflow for accrual validation, VAT compliance, anomaly detection, and actionable month-end insights.",
    categories: ["ai-agents", "automation"],
    tags: ["Agentic AI", "Finance", "Automation"],
  },
  {
    type: "Document intelligence",
    title: "Contract Processing Automation",
    description:
      "Automated clause extraction, risk analysis, summarization, and document generation through secure AI-enabled workflows.",
    categories: ["documents", "automation"],
    tags: ["OpenAI", "Next.js", "REST APIs"],
  },
];

const filtersContainer = document.querySelector(".project-filters");
const projectGrid = document.querySelector(".project-grid");

function renderProjects() {
  if (!projectGrid) return;

  // Only show filter pills for categories actually used by a project.
  const usedCategories = Object.keys(CATEGORIES).filter((key) =>
    PROJECTS.some((project) => project.categories.includes(key))
  );

  if (filtersContainer) {
    const pills = ["all", ...usedCategories]
      .map((key, index) => {
        const label = key === "all" ? "All" : CATEGORIES[key];
        const active = index === 0 ? " is-active" : "";
        return `<button class="filter-pill${active}" type="button" data-filter="${key}">${label}</button>`;
      })
      .join("");
    filtersContainer.innerHTML = pills;
  }

  projectGrid.innerHTML = PROJECTS.map((project) => {
    const chips = project.tags.map((tag) => `<span>${tag}</span>`).join("");
    return `
      <article class="project-card" data-categories="${project.categories.join(" ")}">
        <p class="project-type">${project.type}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="project-chips">${chips}</div>
      </article>`;
  }).join("");
}

function wireProjectFilters() {
  const filterPills = document.querySelectorAll(".filter-pill");
  const projectCards = document.querySelectorAll(".project-card");
  filterPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      filterPills.forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
      const filter = pill.dataset.filter;
      projectCards.forEach((card) => {
        const categories = (card.dataset.categories || "").split(" ");
        const match = filter === "all" || categories.includes(filter);
        card.classList.toggle("is-hidden", !match);
      });
    });
  });
}

renderProjects();
wireProjectFilters();

// Contact form -> opens a pre-filled email (static site, no backend).
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(contactForm);
    const name = (data.get("name") || "").toString().trim();
    const email = (data.get("email") || "").toString().trim();
    const message = (data.get("message") || "").toString().trim();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    const status = contactForm.querySelector(".form-status");
    window.location.href = `mailto:tanmoycuat@gmail.com?subject=${subject}&body=${body}`;
    if (status) status.textContent = "Opening your email app…";
  });
}