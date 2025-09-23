function initAulas() {
    const aulas = [
        {
            titulo: "Aula 1 - Memory Game",
            video: "https://www.youtube.com/watch?v=5czsMlRc7Wk",
            jogo: "/jogos/memorygame.html",
            concluida: false
        },
        {
            titulo: "Aula 2 - Drag and Release",
            video: "https://www.youtube.com/watch?v=spUlvo0HNFQ",
            jogo: "/jogos/drag.html",
            concluida: false
        },
        {
            titulo: "Aula 3 - Reply Challenge",
            video: "https://www.youtube.com/watch?v=wwQlo1iS7Hg",
            jogo: "/jogos/reply.html",
            concluida: false
        },
        {
            titulo: "Aula 4 - Complete os Trechos",
            video: "https://www.youtube.com/watch?v=_iho2OK_LDg",
            jogo: "/jogos/trechocompletar.html",
            concluida: false
        },
        {
            titulo: "Aula 5 - Verdadeiro ou Falso",
            video: "https://www.youtube.com/watch?v=IOezbx41Oq4",
            jogo: "/jogos/trueorfalse.html",
            concluida: false
        }
    ];

    const aulaList = document.querySelector('.aula-list');
    const aulaExibition = document.querySelector('.aula-exibition');
    const progressRing = document.querySelector('.progress-ring');
    const progressPercent = document.querySelector('.progress-text span');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebar-toggle');

    let currentAulaIndex = null;
    let currentVideoId = null;
    let currentJogoUrl = null;

    // Função para alternar o menu mobile
    function toggleMobileMenu() {
        hamburgerBtn.classList.toggle('hamburger-active');
        mobileMenu.style.display = mobileMenu.style.display === 'block' ? 'none' : 'block';
    }

    // Função para alternar o sidebar
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        
        const icon = sidebarToggle.querySelector('i');
        if (sidebar.classList.contains('active')) {
            icon.classList.remove('fa-arrow-right');
            icon.classList.add('fa-arrow-left');
        } else {
            icon.classList.remove('fa-arrow-left');
            icon.classList.add('fa-arrow-right');
        }
    }

    // Função para selecionar aula e fechar sidebar em mobile
    function selectAulaAndCloseSidebar(index, aula) {
        selectAula(index, aula);
        if (window.innerWidth < 768) {
            toggleSidebar();
        }
    }

    // Adicionar eventos
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', toggleMobileMenu);
    }
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }

    // Obter ID do vídeo do YouTube
    function getVideoId(url) {
        const urlObj = new URL(url);
        return urlObj.searchParams.get("v");
    }

    // Atualizar progresso
    function updateProgress() {
        const completed = aulas.filter(aula => aula.concluida).length;
        const percent = (completed / aulas.length) * 100;
        const offset = 94.2 - (percent / 100 * 94.2);

        if (progressRing) {
            progressRing.style.strokeDashoffset = offset;
        }

        if (progressPercent) {
            progressPercent.textContent = `${Math.round(percent)}%`;
        }
    }

    // Renderizar vídeo
    function renderVideo() {
        aulaExibition.innerHTML = `
            <div class="aula-header">
                <h2 class="aula-title">${aulas[currentAulaIndex].titulo}</h2>
                <span class="badge ${aulas[currentAulaIndex].concluida ? '' : 'hidden'}">
                    <i class="fas fa-check"></i> Concluída
                </span>
            </div>
            <div class="iframe-container">
                <iframe src="https://www.youtube.com/embed/${currentVideoId}" allowfullscreen></iframe>
            </div>
            <div class="actions">
                <button class="btn btn-primary">
                    <i class="fas fa-play"></i> Assistir Vídeo
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-gamepad"></i> Jogar
                </button>
                <button class="btn btn-tertiary">
                    <i class="fas fa-check"></i> ${aulas[currentAulaIndex].concluida ? 'Concluída' : 'Marcar como concluída'}
                </button>
            </div>
        `;
        
        // Adicionar eventos aos botões
        document.querySelector('.btn-primary').addEventListener('click', renderVideo);
        document.querySelector('.btn-secondary').addEventListener('click', renderGame);
        document.querySelector('.btn-tertiary').addEventListener('click', () => markAsCompleted(currentAulaIndex));
    }

    // Renderizar jogo
    function renderGame() {
        aulaExibition.innerHTML = `
            <div class="aula-header">
                <h2 class="aula-title">${aulas[currentAulaIndex].titulo} - Modo Prático</h2>
                <span class="badge ${aulas[currentAulaIndex].concluida ? '' : 'hidden'}">
                    <i class="fas fa-check"></i> Concluída
                </span>
            </div>
            <div class="iframe-container">
                <iframe src="${currentJogoUrl}"></iframe>
            </div>
            <div class="actions">
                <button class="btn btn-primary">
                    <i class="fas fa-play"></i> Assistir Vídeo
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-gamepad"></i> Jogar
                </button>
                <button class="btn btn-tertiary">
                    <i class="fas fa-check"></i> ${aulas[currentAulaIndex].concluida ? 'Concluída' : 'Marcar como concluída'}
                </button>
            </div>
        `;
        
        // Adicionar eventos aos botões
        document.querySelector('.btn-primary').addEventListener('click', renderVideo);
        document.querySelector('.btn-secondary').addEventListener('click', renderGame);
        document.querySelector('.btn-tertiary').addEventListener('click', () => markAsCompleted(currentAulaIndex));
    }

    // Marcar aula como concluída
    function markAsCompleted(index) {
        aulas[index].concluida = !aulas[index].concluida;
        updateAulaList();
        updateProgress();

        if (currentAulaIndex === index) {
            if (document.querySelector('iframe').src.includes('youtube.com')) {
                renderVideo();
            } else {
                renderGame();
            }
        }
    }

    // Selecionar aula
    function selectAula(index, aula) {
        currentAulaIndex = index;
        currentVideoId = getVideoId(aula.video);
        currentJogoUrl = aula.jogo;
        updateAulaList();
        renderVideo();
    }

    // Atualizar lista de aulas
    function updateAulaList() {
        aulaList.innerHTML = '';

        aulas.forEach((aula, index) => {
            const aulaItem = document.createElement('div');
            aulaItem.className = `aula-item ${currentAulaIndex === index ? 'active' : ''}`;

            aulaItem.innerHTML = `
                <div class="aula-icon ${aula.concluida ? 'completed' : 'pending'}">
                    <i class="fas ${aula.concluida ? 'fa-check' : 'fa-play'}"></i>
                </div>
                <span class="aula-name">${aula.titulo}</span>
                <i class="aula-arrow fas fa-chevron-right"></i>
            `;

            aulaItem.addEventListener('click', () => {
                selectAulaAndCloseSidebar(index, aula);
            });

            aulaList.appendChild(aulaItem);
        });
    }

    // Inicializar
    updateAulaList();
    updateProgress();
}

// Inicializar quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', initAulas);