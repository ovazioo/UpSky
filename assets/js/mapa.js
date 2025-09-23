function initMapaPage() {
    // Elementos do menu mobile
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('hamburger-active');
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    }

    // Adiciona evento de clique ao botão hamburguer
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }

    // Função para inicializar os nós do mapa
    function initMapNodes() {
        // Adiciona evento de clique a todos os cabeçalhos de nó
        document.querySelectorAll('.node-header').forEach(header => {
            header.addEventListener('click', function(event) {
                event.stopPropagation();
                const children = this.parentElement.querySelector('.children');
                const icon = this.querySelector('.toggle-icon');
                
                if (children) {
                    children.classList.toggle('show');
                    icon.classList.toggle('rotated');
                }
            });
        });
        
        // Abrir o primeiro nível por padrão
        document.querySelectorAll('.node > .children').forEach(child => {
            child.classList.add('show');
        });
        document.querySelectorAll('.node > .node-header .toggle-icon').forEach(icon => {
            icon.classList.add('rotated');
        });
    }

    // Inicializar os nós do mapa
    initMapNodes();
}

initMapaPage();