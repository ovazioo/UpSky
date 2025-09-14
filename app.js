document.addEventListener("DOMContentLoaded", () => {
  loadPage("home"); // página inicial
});

function loadPage(page) {
  const app = document.getElementById("app");

  fetch(`./pages/${page}.html`)
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar " + page);
      return res.text();
    })
    .then(html => {
      // Cria um DOM virtual a partir do HTML carregado
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Injeta só o conteúdo do body
      app.innerHTML = doc.body.innerHTML;

      // --- CSS ---
      doc.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (!document.querySelector(`link[href="${link.getAttribute("href")}"]`)) {
          const newLink = document.createElement("link");
          newLink.rel = "stylesheet";
          newLink.href = link.getAttribute("href");
          document.head.appendChild(newLink);
        }
      });

      // --- JS ---
      doc.querySelectorAll("script").forEach(oldScript => {
        if (oldScript.src) {
          if (!document.querySelector(`script[src="${oldScript.src}"]`)) {
            const newScript = document.createElement("script");
            newScript.src = oldScript.src;
            document.body.appendChild(newScript);
          }
        } else {
          // Script inline sempre recria (pode conter inicializações específicas da página)
          const newScript = document.createElement("script");
          newScript.textContent = oldScript.textContent;
          document.body.appendChild(newScript);
        }
      });
    })
    .catch(err => {
      app.innerHTML = `<p style="color:red">${err.message}</p>`;
    });
}
