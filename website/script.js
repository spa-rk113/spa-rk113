
/* ==========================================
   SPARK113 — INTERACTIVE DIGITAL WORKSPACE
   ========================================== */

const folderData = {
  projects: {
    title: "Projects",
    icon: "📁",
    files: [
      { name: "WebXtract", type: "Project", icon: "🌐", description: "Website resource explorer." },
      { name: "GitHub Portfolio", type: "Website", icon: "💻", description: "My personal digital portfolio." },
      { name: "Future Projects", type: "Coming Soon", icon: "🚀", description: "More projects are in development." }
    ]
  },

  experiments: {
    title: "Experiments",
    icon: "🧪",
    files: [
      { name: "Web Experiments", type: "Experiment", icon: "⚗️", description: "Testing new web technologies." },
      { name: "Animation Lab", type: "Experiment", icon: "✨", description: "Visual and motion experiments." },
      { name: "Creative Ideas", type: "Notes", icon: "💡", description: "Ideas for future creations." }
    ]
  },

  tools: {
    title: "Tools",
    icon: "🛠️",
    files: [
      { name: "WebXtract", type: "Tool", icon: "🔍", description: "Explore website resources." },
      { name: "Developer Tools", type: "Collection", icon: "⚙️", description: "Useful development tools." }
    ]
  },

  anime: {
    title: "Anime Worlds",
    icon: "🌌",
    files: [
      { name: "Solo Leveling", type: "Anime World", icon: "⚔️", description: "Sung Jinwoo" },
      { name: "Mushoku Tensei", type: "Anime World", icon: "✨", description: "Rudeus Greyrat" },
      { name: "No Longer Allowed in Another World", type: "Anime World", icon: "📖", description: "Sensei" },
      { name: "KonoSuba", type: "Anime World", icon: "🔥", description: "Kazuma Satou and Darkness" },
      { name: "Tsukimichi", type: "Anime World", icon: "🌙", description: "Makoto, Tomoe and Mio" }
    ]
  },

  about: {
    title: "About Me",
    icon: "👤",
    files: [
      { name: "GitHub Profile", type: "Profile", icon: "🐙", description: "Explore my GitHub repositories.", url: "https://github.com/spa-rk113" },
      { name: "Instagram", type: "Social", icon: "📸", description: "Visit my Instagram profile.", url: "https://instagram.com/spa_rk113" }
    ]
  }
};

/* ==========================================
   ELEMENT REFERENCES
   ========================================== */

const fileWindow = document.getElementById("file-window");

let activeFolder = null;

/* ==========================================
   OPEN FOLDER
   ========================================== */

function openFolder(folderId, clickedFolder) {
  const folder = folderData[folderId];

  if (!folder || !fileWindow) return;

  activeFolder = folderId;

  document.querySelectorAll(".folder").forEach(item => {
    item.classList.remove("active", "opening");
  });

  if (clickedFolder) {
    clickedFolder.classList.add("active", "opening");
  }

  renderFiles(folder);

  fileWindow.hidden = false;
  fileWindow.classList.remove("window-closing");

  fileWindow.scrollIntoView({
    behavior: "smooth",
    block: "nearest"
  });

  setTimeout(() => {
    clickedFolder?.classList.remove("opening");
  }, 500);
}

/* ==========================================
   RENDER FILES
   ========================================== */

function renderFiles(folder) {
  fileWindow.innerHTML = `
    <div class="file-window-header">
      <div>
        <h2>${escapeHTML(folder.icon)} ${escapeHTML(folder.title)}</h2>
        <p>${folder.files.length} items available</p>
      </div>

      <button class="close-window" aria-label="Close folder">
        ✕
      </button>
    </div>

    <div class="file-list">
      ${folder.files.map((file, index) => `
        <div class="file-item"
             style="animation-delay:${index * 80}ms">

          <div class="file-item-icon">${escapeHTML(file.icon)}</div>

          <div class="file-item-info">
            <strong>${escapeHTML(file.name)}</strong>
            <span>${escapeHTML(file.description)}</span>
          </div>

          <span class="file-type">${escapeHTML(file.type)}</span>

          ${
            file.url
              ? `<a class="file-open-link"
                    href="${escapeHTML(file.url)}"
                    target="_blank"
                    rel="noopener noreferrer">↗</a>`
              : ""
          }
        </div>
      `).join("")}
    </div>
  `;

  fileWindow.querySelector(".close-window")
    ?.addEventListener("click", closeFolder);
}

/* ==========================================
   CLOSE FOLDER
   ========================================== */

function closeFolder() {
  if (!fileWindow) return;

  fileWindow.classList.add("window-closing");

  setTimeout(() => {
    fileWindow.hidden = true;
    fileWindow.classList.remove("window-closing");

    document.querySelectorAll(".folder").forEach(folder => {
      folder.classList.remove("active", "opening");
    });

    activeFolder = null;
  }, 250);
}

/* ==========================================
   FOLDER CLICK EVENTS
   ========================================== */

document.querySelectorAll(".folder").forEach(folder => {
  folder.addEventListener("click", () => {
    const folderId = folder.dataset.folder;

    if (!folderId) return;

    if (activeFolder === folderId) {
      closeFolder();
    } else {
      openFolder(folderId, folder);
    }
  });

  folder.setAttribute("tabindex", "0");
  folder.setAttribute("role", "button");

  folder.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      folder.click();
    }
  });
});

/* ==========================================
   SAFE HTML TEXT
   ========================================== */

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

/* ==========================================
   ANIME CHARACTER DATA
   Add GIF paths when the GIF files exist.
   ========================================== */

const animeCharacters = [
  {
    anime: "Solo Leveling",
    character: "Sung Jinwoo",
    gif: "assets/solo-leveling.gif"
  },
  {
    anime: "Mushoku Tensei",
    character: "Rudeus Greyrat",
    gif: "assets/mushoku-tensei.gif"
  },
  {
    anime: "No Longer Allowed in Another World",
    character: "Sensei",
    gif: "assets/no-longer-allowed.gif"
  },
  {
    anime: "KonoSuba",
    character: "Kazuma Satou and Darkness",
    gif: "assets/konosuba.gif"
  },
  {
    anime: "Tsukimichi: Moonlit Fantasy",
    character: "Makoto Misumi, Tomoe and Mio",
    gif: "assets/tsukimichi.gif"
  }
];

/* ==========================================
   OPTIONAL ANIME GIF LOADER
   Only activates if an element exists.
   ========================================== */

document.querySelectorAll("[data-anime]").forEach(element => {
  const anime = animeCharacters.find(
    item => item.anime === element.dataset.anime
  );

  if (!anime) return;

  const image = element.querySelector("img");

  if (image) {
    image.src = anime.gif;
    image.alt = anime.character;
    image.loading = "lazy";
  }
});

/* ==========================================
   ESCAPE KEY CLOSES FILE WINDOW
   ========================================== */

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && activeFolder) {
    closeFolder();
  }
});

/* ==========================================
   INITIAL STATE
   ========================================== */

if (fileWindow) {
  fileWindow.hidden = true;
}

console.log("SPARK113 Digital Workspace initialized.");
