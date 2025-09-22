const aulas = [
            {
                titulo: "Aula 1 - Memory Game",
                video: "https://www.youtube.com/watch?v=5czsMlRc7Wk",
                jogo: "../jogos/memorygame.html",
                concluida: false
            },
            {
                titulo: "Aula 2 - Drag and Release",
                video: "https://www.youtube.com/watch?v=spUlvo0HNFQ",
                jogo: "../jogos/drag.html",
                concluida: false
            },
            {
                titulo: "Aula 3 - Reply Challenge",
                video: "https://www.youtube.com/watch?v=wwQlo1iS7Hg",
                jogo: "../jogos/reply.html",
                concluida: false
            },
            {
                titulo: "Aula 4 - Complete os Trechos",
                video: "https://www.youtube.com/watch?v=_iho2OK_LDg",
                jogo: "../jogos/trechocompletar.html",
                concluida: false
            },
            {
                titulo: "Aula 5 - Verdadeiro ou Falso",
                video: "https://www.youtube.com/watch?v=IOezbx41Oq4",
                jogo: "../jogos/trueorfalse.html",
                concluida: false
            }
        ];

        const aulaList = document.querySelector('.AulaList');
        const aulaExibition = document.querySelector('.AulaExibition');
        const actionsSection = document.querySelector('.actions');
        const progressRing = document.querySelector('.progress-ring');
        const progressPercent = document.querySelector('.absolute span');
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebar-toggle');

        let currentAulaIndex = null;
        let currentVideoId = null;
        let currentJogoUrl = null;

        function toggleMobileMenu() {
            hamburgerBtn.classList.toggle('hamburger-active');
            mobileMenu.classList.toggle('hidden');
        }
        function toggleSidebar() {
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');

            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('active')) {
                icon.classList.remove('fa-arrow-right');
                icon.classList.add('fa-arrow-left');
            } else {
                icon.classList.remove('fa-arrow-left');
                icon.classList.add('fa-arrow-right');
            }
        }

        function selectAulaAndCloseSidebar(index, aula) {
            selectAula(index, aula);
            if (window.innerWidth < 768) {
                toggleSidebar();
            }
        }

        hamburgerBtn.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', function () {
            if (!mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }
            if (sidebar.classList.contains('active')) {
                toggleSidebar();
            }
        });
        sidebarToggle.addEventListener('click', toggleSidebar);

        function getVideoId(url) {
            const urlObj = new URL(url);
            return urlObj.searchParams.get("v");
        }

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

        function renderVideo() {
            aulaExibition.innerHTML = `
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-blue-dark">${aulas[currentAulaIndex].titulo}</h2>
                    <span class="bg-pink-light text-blue-strong px-3 py-1 rounded-full text-sm font-medium ${aulas[currentAulaIndex].concluida ? '' : 'hidden'}">
                        <i class="fas fa-check mr-1"></i> Concluída
                    </span>
                </div>
                <div class="flex-1">
                    <iframe src="https://www.youtube.com/embed/${currentVideoId}" class="w-full h-full rounded-lg shadow-md" allowfullscreen></iframe>
                </div>
                <div class="actions mt-6 flex justify-center space-x-4">
                    <button onclick="renderVideo()" class="bg-blue-strong text-white hover:bg-blue-dark px-5 py-2.5 rounded-lg font-medium flex items-center">
                        <i class="fas fa-play mr-2"></i> Assistir Vídeo
                    </button>
                    <button onclick="renderGame()" class="bg-blue-light text-white hover:bg-blue-strong px-5 py-2.5 rounded-lg font-medium flex items-center">
                        <i class="fas fa-gamepad mr-2"></i> Jogar
                    </button>
                    <button onclick="markAsCompleted(${currentAulaIndex})" class="bg-pink-light text-blue-strong hover:bg-pink-light hover:bg-opacity-80 px-5 py-2.5 rounded-lg font-medium flex items-center">
                        <i class="fas fa-check mr-2"></i> ${aulas[currentAulaIndex].concluida ? 'Concluída' : 'Marcar como concluída'}
                    </button>
                </div>
            `;
        }

        function renderGame() {
            aulaExibition.innerHTML = `
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-blue-dark">${aulas[currentAulaIndex].titulo} - Modo Prático</h2>
                    <span class="bg-pink-light text-blue-strong px-3 py-1 rounded-full text-sm font-medium ${aulas[currentAulaIndex].concluida ? '' : 'hidden'}">
                        <i class="fas fa-check mr-1"></i> Concluída
                    </span>
                </div>
                <div class="flex-1">
                    <iframe src="${currentJogoUrl}" class="w-full h-full rounded-lg shadow-md"></iframe>
                </div>
                <div class="actions mt-6 flex justify-center space-x-4">
                    <button onclick="renderVideo()" class="bg-blue-strong text-white hover:bg-blue-dark px-5 py-2.5 rounded-lg font-medium flex items-center">
                        <i class="fas fa-play mr-2"></i> Assistir Vídeo
                    </button>
                    <button onclick="renderGame()" class="bg-blue-light text-white hover:bg-blue-strong px-5 py-2.5 rounded-lg font-medium flex items-center">
                        <i class="fas fa-gamepad mr-2"></i> Jogar
                    </button>
                    <button onclick="markAsCompleted(${currentAulaIndex})" class="bg-pink-light text-blue-strong hover:bg-pink-light hover:bg-opacity-80 px-5 py-2.5 rounded-lg font-medium flex items-center">
                        <i class="fas fa-check mr-2"></i> ${aulas[currentAulaIndex].concluida ? 'Concluída' : 'Marcar como concluída'}
                    </button>
                </div>
            `;
        }

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

        function selectAula(index, aula) {
            currentAulaIndex = index;
            currentVideoId = getVideoId(aula.video);
            currentJogoUrl = aula.jogo;
            updateAulaList();
            renderVideo();
        }

        function updateAulaList() {
            aulaList.innerHTML = '';

            aulas.forEach((aula, index) => {
                const aulaItem = document.createElement('div');
                aulaItem.className = `aula-item cursor-pointer p-3 rounded-lg flex items-center justify-between ${currentAulaIndex === index ? 'bg-blue-light bg-opacity-10 border-l-4 border-blue-light' : 'hover:bg-gray-100'}`;

                aulaItem.innerHTML = `
                    <div class="flex items-center">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3 ${aula.concluida ? 'bg-pink-light text-blue-strong' : 'bg-gray-200 text-blue-dark'}">
                            <i class="fas ${aula.concluida ? 'fa-check' : 'fa-play'} text-xs"></i>
                        </div>
                        <span class="font-medium ${currentAulaIndex === index ? 'text-blue-light' : 'text-blue-dark'}">${aula.titulo}</span>
                    </div>
                    <i class="fas fa-chevron-right text-xs ${currentAulaIndex === index ? 'text-blue-light' : 'text-gray-400'}"></i>
                `;

                aulaItem.addEventListener('click', () => {
                    selectAulaAndCloseSidebar(index, aula);
                });

                aulaList.appendChild(aulaItem);
            });
        }
        updateAulaList();
        updateProgress();
