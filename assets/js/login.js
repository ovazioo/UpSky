function initLoginPage() {
    const loginForm = document.getElementById("login-form");
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    // Troca entre login e registro
    if (showRegister && showLogin && loginCard && registerCard) {
        showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginCard.classList.add('hidden');
            registerCard.classList.remove('hidden');
        });
        showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerCard.classList.add('hidden');
            loginCard.classList.remove('hidden');
        });
    }

    // Login via fetch sem sair da SPA
    if (!loginForm) return;

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // impede o submit tradicional

        const formData = new FormData(loginForm);

        try {
            const res = await fetch("login.php", {
                method: "POST",
                body: formData
            });
            const data = await res.json(); // login.php deve retornar JSON

            if (data.success) {
                alert("Login realizado com sucesso!");
                loadPage("aulasYT"); // substitui a página dentro da SPA
            } else {
                alert(data.message || "Email ou senha incorretos.");
            }
        } catch (err) {
            console.error(err);
            alert("Erro ao tentar logar.");
        }
    });
}

// Executa assim que o script da página é carregado
initLoginPage();
