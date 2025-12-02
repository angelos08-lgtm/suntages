// layout_script.js
function initMenu() {
  const menuButton = document.getElementById("menuButton");
  const sideMenu = document.getElementById("sideMenu");
  const closeMenu = document.getElementById("closeMenu");

  if (menuButton && sideMenu) {
    menuButton.addEventListener("click", () => {
      sideMenu.classList.add("open");
    });
  }

  if (closeMenu && sideMenu) {
    closeMenu.addEventListener("click", () => {
      sideMenu.classList.remove("open");
    });
  }

  // κλείσιμο με Esc
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideMenu && sideMenu.classList.contains("open")) {
      sideMenu.classList.remove("open");
    }
  });

  // κλείσιμο όταν κλικάρεις έξω
  document.addEventListener("click", (e) => {
    if (!sideMenu) return;
    if (!sideMenu.contains(e.target) && e.target !== menuButton) {
      sideMenu.classList.remove("open");
    }
  });

  // υπομενού toggles (delegation)
  document.querySelectorAll(".submenu-toggle").forEach(btn => {
    btn.addEventListener("click", () => {
      const submenu = btn.nextElementSibling;
      if (!submenu) return;
      submenu.classList.toggle("open");
      btn.textContent = submenu.classList.contains("open")
        ? btn.textContent.replace("▼", "▲") // αν έχει βελάκι
        : btn.textContent.replace("▲", "▼");
    });
  });
}
