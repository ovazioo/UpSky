async function loadPage(url) {
  const container = document.getElementById("app");

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro ao carregar ${url}`);
    const html = await res.text();
    container.innerHTML = html;
    if (url.includes("home")) {
      initHome();
    }

  } catch (err) {
    console.error("Erro no loadPage:", err);
    container.innerHTML = `<p style="color:red;">Falha ao carregar a página.</p>`;
  }
}
function initHome() {
  const header = document.getElementById("main-header");
  const toggle = document.getElementById("theme-toggle");
  const menu = document.getElementById("theme-menu");

  if (!header || !toggle || !menu) return; // Proteção caso os elementos não existam

  toggle.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });

  menu.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      console.log("Tema selecionado:", theme);
      menu.classList.add("hidden");
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
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage("pages/home.html");

  // Aqui você pode colocar listeners para navegação
  // Exemplo de botão para ir pra home:
  // document.getElementById("btn-home").addEventListener("click", () => {
  //   loadPage("pages/home.html");
  // });
});
