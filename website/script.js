
"use strict";

/* =========================================
   SPARK113 — DIGITAL WORKSPACE
   Complete interactive portfolio controller
========================================= */

const folderData = {
  projects: {
    title: "My Projects",
    icon: "📁",
    files: [
      {
        name: "WebXtract",
        type: "Project",
        icon: "🌐",
        description: "A website resource explorer.",
        link: "https://github.com/spa-rk113"
      },
      {
        name: "GitHub Portfolio",
        type: "Website",
        icon: "💻",
        description: "My personal digital portfolio."
      },
      {
        name: "Future Projects",
        type: "Coming Soon",
        icon: "🚀",
        description: "More projects are in development."
      }
    ]
  },

  experiments: {
    title: "Experiments",
    icon: "🧪",
    files: [
      {
        name: "Web Experiments",
        type: "Experiment",
        icon: "🌀",
        description: "Testing creative web technologies."
      },
      {
        name: "Animation Lab",
        type: "Creative Lab",
        icon: "✨",
        description: "Exploring CSS and JavaScript animations."
      },
      {
        name: "Creative Ideas",
        type: "Ideas",
        icon: "💡",
        description: "A collection of future concepts."
      }
    ]
  },

  tools: {
    title: "Developer Tools",
    icon: "🛠️",
    files: [
      {
        name: "WebXtract",
        type: "Web Tool",
        icon: "🔍",
        description: "Explore website resources."
      },
      {
        name: "Developer Utilities",
        type: "Coming Soon",
        icon: "⚙️",
        description: "Useful tools for developers."
      }
    ]
  },

  anime: {
    title: "Anime Collection",
    icon: "🎴",
    files: [
      {
        name: "Solo Leveling",
        type: "Anime World",
        icon: "🌑",
        description: "Sung Jinwoo's world."
      },
      {
        name: "Mushoku Tensei",
        type: "Anime World",
        icon: "🔮",
        description: "The world of Rudeus Greyrat."
      },
      {
        name: "No Longer Allowed in Another World",
        type: "Anime World",
        icon: "📖",
        description: "The world of Sensei."
      },
      {
        name: "KonoSuba",
        type: "Anime World",
        icon: "💥",
        description: "Kazuma Satou and Darkness."
      },
      {
        name: "Tsukimichi: Moonlit Fantasy",
        type: "Anime World",
        icon: "🌙",
        description: "Makoto Misumi, Tomoe and Mio."
      }
    ]
  },

  about: {
    title: "About Me",
    icon: "👤",
    files: [
      {
        name: "GitHub Profile",
        type: "Profile",
        icon: "🐙",
        description: "Explore my GitHub repositories.",
        link: "https://github.com/spa-rk113"
      },
      {
        name: "Instagram",
        type: "Social",
        icon: "📸",
        description: "Find me on Instagram.",
        link: "https://instagram.com/spa_rk113"
      }
    ]
  }
};

/* =========================================
   ELEMENTS
========================================= */

const fileWindow = document.getElementById("file-window");
const folders = document.querySelectorAll(".folder");
const animeCards = document.querySelectorAll(".anime-card");

let activeFolder = null;
let closingTimer = null;

/* =========================================
   SAFE HTML
========================================= */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return entities[character];
  });
}

/* =========================================
   OPEN FOLDER
========================================= */

function openFolder(folderId, clickedFolder) {
  const folder = folderData[folderId];

  if (!folder || !fileWindow) return;

  clearTimeout(closingTimer);

  activeFolder = folderId;

  folders.forEach(item => {
    item.classList.remove("active", "opening");
    item.setAttribute("aria-expanded", "false");
  });

  if (clickedFolder) {
    clickedFolder.classList.add("active", "opening");
    clickedFolder.setAttribute("aria-expanded", "true");
  }

  renderFiles(folderId);

  fileWindow.hidden = false;
  fileWindow.classList.remove("window-closing");

  fileWindow.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

  closingTimer = setTimeout(() => {
    if (clickedFolder) {
      clickedFolder.classList.remove("opening");
    }
  }, 500);
}

/* =========================================
   RENDER FILES
========================================= */

function renderFiles(folderId) {
  const folder = folderData[folderId];

  if (!folder || !fileWindow) return;

  const filesHTML = folder.files.map((file, index) => {
    const action = file.link
      ? `<a class="file-action" href="${escapeHTML(file.link)}"
           target="_blank" rel="noopener noreferrer">
           Open ↗
         </a>`
      : "";

    return `
      <article class="file-item" style="--file-index:${index}">
        <div class="file-icon">${escapeHTML(file.icon)}</div>

        <div class="file-info">
          <h3>${escapeHTML(file.name)}</h3>
          <span>${escapeHTML(file.type)}</span>
          <p>${escapeHTML(file.description)}</p>
        </div>

        ${action}
      </article>
    `;
  }).join("");

  fileWindow.innerHTML = `
    <div class="file-window-header">
      <div>
        <span class="window-label">DIGITAL DIRECTORY</span>
        <h2>${escapeHTML(folder.icon)} ${escapeHTML(folder.title)}</h2>
      </div>

      <button
        class="close-window"
        type="button"
        aria-label="Close folder"
      >✕</button>
    </div>

    <div class="file-search">
      <span>⌕</span>
      <input
        type="search"
        class="file-search-input"
        placeholder="Search files..."
        aria-label="Search files"
      >
    </div>

    <div class="file-list">
      ${filesHTML}
    </div>

    <p class="file-count">
      ${folder.files.length} items in this directory
    </p>
  `;

  const closeButton = fileWindow.querySelector(".close-window");
  const searchInput = fileWindow.querySelector(".file-search-input");

  closeButton.addEventListener("click", closeFolder);
  searchInput.addEventListener("input", filterFiles);
}

/* =========================================
   SEARCH FILES
========================================= */

function filterFiles(event) {
  const query = event.target.value.toLowerCase();
  const items = fileWindow.querySelectorAll(".file-item");

  items.forEach(item => {
    const text = item.textContent.toLowerCase();
    item.hidden = !text.includes(query);
  });
}

/* =========================================
   CLOSE FOLDER
========================================= */

function closeFolder() {
  if (!fileWindow || fileWindow.hidden) return;

  fileWindow.classList.add("window-closing");

  folders.forEach(item => {
    item.classList.remove("active", "opening");
    item.setAttribute("aria-expanded", "false");
  });

  activeFolder = null;

  clearTimeout(closingTimer);

  closingTimer = setTimeout(() => {
    fileWindow.hidden = true;
    fileWindow.classList.remove("window-closing");
  }, 250);
}

/* =========================================
   FOLDER EVENTS
========================================= */

folders.forEach(folder => {
  const folderId = folder.dataset.folder;

  folder.setAttribute("aria-expanded", "false");

  folder.addEventListener("click", () => {
    if (activeFolder === folderId) {
      closeFolder();
    } else {
      openFolder(folderId, folder);
    }
  });

  folder.addEventListener("keydown", event => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      folder.click();
    }
  });
});

/* =========================================
   ANIME SCENE INTERACTIONS
========================================= */

animeCards.forEach(card => {
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");

  function selectScene() {
    animeCards.forEach(other => {
      other.classList.remove("scene-selected");
      other.setAttribute("aria-pressed", "false");
    });

    card.classList.add("scene-selected");
    card.setAttribute("aria-pressed", "true");
  }

  card.addEventListener("click", selectScene);

  card.addEventListener("keydown", event => {
    if (
      event.key === "Enter" ||
      event.key === " "
    ) {
      event.preventDefault();
      selectScene();
    }
  });
});

/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeFolder();

    animeCards.forEach(card => {
      card.classList.remove("scene-selected");
      card.setAttribute("aria-pressed", "false");
    });
  }
});

/* =========================================
   NAVIGATION
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (target) {
      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

/* =========================================
   ANIME GIF LOADER
========================================= */

const animeCharacters = [
  {
    name: "Solo Leveling",
    file: "assets/solo-leveling.gif"
  },
  {
    name: "Mushoku Tensei",
    file: "assets/mushoku-tensei.gif"
  },
  {
    name: "No Longer Allowed in Another World",
    file: "assets/no-longer-allowed.gif"
  },
  {
    name: "KonoSuba",
    file: "assets/konosuba.gif"
  },
  {
    name: "Tsukimichi: Moonlit Fantasy",
    file: "assets/tsukimichi.gif"
  }
];

animeCharacters.forEach(anime => {
  const card = Array.from(animeCards).find(item => {
    return item.dataset.anime === anime.name;
  });

  if (!card) return;

  const image = card.querySelector(".anime-character");
  const placeholder = card.querySelector(".anime-placeholder");

  if (!image) return;

  image.src = anime.file;
  image.alt = anime.name + " animated scene";

  image.addEventListener("error", () => {
    image.style.display = "none";

    if (placeholder) {
      placeholder.style.display = "grid";
    }
  });

  image.addEventListener("load", () => {
    image.style.display = "block";

    if (placeholder) {
      placeholder.style.display = "none";
    }
  });
});

/* =========================================
   INITIAL STATE
========================================= */

if (fileWindow) {
  fileWindow.hidden = true;
}

animeCards.forEach(card => {
  card.setAttribute("aria-pressed", "false");
});

console.log("SPARK113 Digital Workspace loaded successfully.");
