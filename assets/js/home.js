document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const toggle = document.getElementById("theme-toggle");
  const menu = document.getElementById("theme-menu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Fecha ao clicar fora
  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  // Captura seleção de tema
  menu.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      console.log("Tema selecionado:", theme);
      menu.classList.add("hidden");
      // Aqui depois você pode aplicar lógica de trocar tema
    });
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.remove("-translate-y-full");
      header.classList.add("translate-y-0");
    } else {
      header.classList.add("-translate-y-full");
      header.classList.remove("translate-y-0");
    }
  });
});
