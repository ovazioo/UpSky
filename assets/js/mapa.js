const hamburgerBtn = document.getElementById('hamburger-btn');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
            hamburgerBtn.classList.toggle('hamburger-active');
            mobileMenu.classList.toggle('hidden');
        }
        hamburgerBtn.addEventListener('click', toggleMobileMenu);


document.addEventListener('DOMContentLoaded', function() {
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
            
            // Botão de imprimir
            document.getElementById('print-btn').addEventListener('click', function() {
                document.body.classList.add('print-mode');
                window.print();
                setTimeout(() => {
                    document.body.classList.remove('print-mode');
                }, 500);
            });
            
            // Expandir todos os nós
            document.getElementById('expand-all').addEventListener('click', function() {
                document.querySelectorAll('.children').forEach(child => {
                    child.classList.add('show');
                });
                document.querySelectorAll('.toggle-icon').forEach(icon => {
                    icon.classList.add('rotated');
                });
            });
            
            // Recolher todos os nós
            document.getElementById('collapse-all').addEventListener('click', function() {
                document.querySelectorAll('.children').forEach(child => {
                    child.classList.remove('show');
                });
                document.querySelectorAll('.toggle-icon').forEach(icon => {
                    icon.classList.remove('rotated');
                });
            });
            
            // Abrir o primeiro nível por padrão
            document.querySelectorAll('.node > .children').forEach(child => {
                child.classList.add('show');
            });
            document.querySelectorAll('.node > .node-header .toggle-icon').forEach(icon => {
                icon.classList.add('rotated');
            });
        });