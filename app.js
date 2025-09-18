const app = document.getElementById("app");
let currentScript = null;

async function loadPage(pageName) {
  try {
    // Carrega o HTML da página
    const res = await fetch(`./pages/${pageName}.html`);
    if (!res.ok) throw new Error(`Erro ao carregar ${pageName}.html`);

    const html = await res.text();
    app.innerHTML = html;

    // Remove script anterior para evitar duplicação
    if (currentScript) {
      currentScript.remove();
      currentScript = null;
    }

    // Carrega o JS correspondente à página
    const script = document.createElement("script");
    script.src = `./assets/js/${pageName}.js`;
    script.onload = () => console.log(`${pageName}.js carregado`);
    document.body.appendChild(script);
    currentScript = script;
  } catch (err) {
    console.error(err);
    app.innerHTML = `<h2>Erro ao carregar a página "${pageName}"</h2>`;
  }
}

// Carrega a home por padrão
document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");

  // Se clicar em links com data-page, troca a página
  document.body.addEventListener("click", (e) => {
    if (e.target.dataset.page) {
      loadPage(e.target.dataset.page);
    }
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => console.log('Service Worker registrado', reg)).catch(err => console.log('Falha ao registrar Service Worker', err));
  });
}
