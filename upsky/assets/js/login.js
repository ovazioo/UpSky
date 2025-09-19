function initLoginPage() {
    const loginCard = document.getElementById('login-card');
    const registerCard = document.getElementById('register-card');
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');

    if (!loginCard || !registerCard || !showRegister || !showLogin) return;

    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginCard.classList.add('hidden');
        registerCard.classList.remove('hidden');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerCard.classList.add('hidden');n 
        loginCard.classList.remove('hidden');
    });
}

// Executa assim que o script é carregado
initLoginPage();
