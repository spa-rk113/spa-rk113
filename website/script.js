
const folders = {
  projects: [
    ["▣","WebXtract","Website resource inspection project."],
    ["▣","Future Projects","More creations coming soon."]
  ],

  experiments: [
    ["◇","Web Experiments","Prototypes and coding experiments."],
    ["◇","New Ideas","Ideas waiting to be explored."]
  ],

  tools: [
    ["⌘","Developer Tools","Utilities and scripts."]
  ],

  anime: [
    ["✦","Solo Leveling","Sung Jinwoo"],
    ["✦","Mushoku Tensei","Rudeus Greyrat"],
    ["✦","No Longer Allowed in Another World","Sensei"],
    ["✦","KonoSuba","Kazuma Satou and Darkness"],
    ["✦","Tsukimichi","Makoto, Tomoe and Mio"]
  ],

  about: [
    ["◎","GitHub","https://github.com/spa-rk113"],
    ["◎","Instagram","https://instagram.com/spa_rk113"]
  ]
};

const title = document.getElementById("windowTitle");
const list = document.getElementById("fileList");

function openFolder(name, button) {
  title.textContent = name.toUpperCase();
  list.replaceChildren();

  document.querySelectorAll(".folder").forEach(folder => {
    folder.classList.remove("active");
  });

  button.classList.add("active");

  folders[name].forEach(([icon, file, description], index) => {
    const item = document.createElement("div");
    item.className = "file-item";
    item.style.animationDelay = `${index * 70}ms`;

    const heading = document.createElement("div");
    const symbol = document.createElement("span");

    symbol.textContent = icon;
    heading.append(symbol, document.createTextNode(file));
    item.append(heading);

    if (description) {
      const small = document.createElement("small");
      small.textContent = description;
      item.append(small);
    }

    list.append(item);
  });
}

document.querySelectorAll(".folder").forEach(button => {
  button.addEventListener("click", () => {
    openFolder(button.dataset.folder, button);
  });
});

document.getElementById("closeWindow").addEventListener("click", () => {
  title.textContent = "Select a folder";
  list.innerHTML = '<p class="empty">Select a holographic folder to explore.</p>';

  document.querySelectorAll(".folder").forEach(folder => {
    folder.classList.remove("active");
  });
});

