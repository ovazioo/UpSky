// Array com objetos de cartas
const cardsData = [
  // Conceitos
  { tipo: 'Tema', valor: 'IaaS', nome: 'Infraestrutura sob demanda: máquinas virtuais, rede e armazenamento que o usuário configura.' },
  { tipo: 'Tema', valor: 'PaaS', nome: 'Plataforma pronta para criar e hospedar aplicações sem gerenciar servidores.' },
  { tipo: 'Tema', valor: 'SaaS', nome: 'Softwares prontos, acessados via navegador, sem instalação ou manutenção local.' },

  // Vantagens
  { tipo: 'Tema', valor: 'Vantagens do IaaS', nome: 'Controle maior do ambiente, flexibilidade e pagamento conforme o uso.' },
  { tipo: 'Tema', valor: 'Vantagens do PaaS', nome: 'Acelera o desenvolvimento, abstrai a infraestrutura e facilita integrações.' },
  { tipo: 'Tema', valor: 'Vantagens do SaaS', nome: 'Baixo custo inicial, acesso em qualquer lugar e sempre atualizado automaticamente.' }
];



let cards = [];          // Array de cartas embaralhadas
let revealedCards = [];  // Índices das cartas abertas
let lockBoard = false;   // Impede cliques durante verificação

// Função para embaralhar
function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

// Cria o tabuleiro
function createBoard() {
  const gameBoard = document.getElementById('gameBoard');
  gameBoard.innerHTML = '';

  // Para cada fruta, criamos duas cartas: Tema e nome
  cards = [];
  cardsData.forEach(item => {
    cards.push({ tipo: 'Tema', valor: item.valor, nome: item.nome });
    cards.push({ tipo: 'nome', valor: item.nome, nome: item.nome });
  });

  // Embaralha todas as cartas
  cards = shuffle(cards);

  // Cria os elementos HTML
  cards.forEach((cardData, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.valor = cardData.valor;
    card.dataset.nome = cardData.nome;
    card.dataset.tipo = cardData.tipo;
    card.innerText = '';
    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

// Lida com o clique em uma carta
function handleCardClick(e) {
  const card = e.target;
  const index = card.dataset.index;

  if (lockBoard || card.classList.contains('revealed') || revealedCards.includes(index)) return;

  // Mostra o valor (Tema ou nome)
  card.innerText = card.dataset.valor;
  revealedCards.push(index);

  if (revealedCards.length === 2) {
    lockBoard = true;
    setTimeout(checkMatch, 800);
  }
}

// Verifica se as cartas abertas formam um par
function checkMatch() {
  const [index1, index2] = revealedCards;
  const cardsEl = document.querySelectorAll('.card');
  const card1 = cardsEl[index1];
  const card2 = cardsEl[index2];

  // O par é correto se os nomes forem iguais (um Tema e o nome)
  if (card1.dataset.nome === card2.dataset.nome) {
    card1.classList.add('revealed');
    card2.classList.add('revealed');
  } else {
    card1.innerText = '';
    card2.innerText = '';
  }

  revealedCards = [];
  lockBoard = false;
  checkWin();
}

// Verifica se todas as cartas foram reveladas
function checkWin() {
  const allCards = document.querySelectorAll('.card');
  const allRevealed = [...allCards].every(card => card.classList.contains('revealed'));

  if (allRevealed) {
    setTimeout(() => {
      alert('Parabéns! Você venceu o jogo!');
         const win = document.querySelector('#win');
    win.innerText = "párabens,vc venceu caro colega";
    }, 300);
    
  }
}

// Reinicia o jogo
function restartGame() {
  revealedCards = [];
  lockBoard = false;
  createBoard();
}

// Inicializa o jogo
window.onload = createBoard;
