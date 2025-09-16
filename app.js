const app = document.getElementById("app");
let currentScript = null;

// Função para carregar qualquer página
async function loadPage(pageName) {
  try {
    const res = await fetch(`./pages/${pageName}.html`);
    if (!res.ok) throw new Error(`Não foi possível carregar ${pageName}.html`);
    const html = await res.text();
    app.innerHTML = html;
    
    if (currentScript) {
      currentScript.remove();
      currentScript = null;
    }
    
    const script = document.createElement("script");
    script.src = `\assets\js\${pageName} .js`;
    script.type = "module"; // útil se usar import/export
    document.body.appendChild(script);
    currentScript = script;
    
  } catch (error) {
    console.error("Erro ao carregar página:", error);
    app.innerHTML = `<h2>Erro ao carregar a página "${pageName}"</h2>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPage("home");
  document.body.addEventListener("click", (e) => {
    if (e.target.dataset.page) {
      loadPage(e.target.dataset.page);
    }
  });
});
