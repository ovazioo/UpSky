// Array com os trechos corretos que o usuário deve montar na ordem certa
const trechosCorretos = [
    "Na AWS, a segurança começa com o gerenciamento de identidade e acesso através do IAM, onde deve-se evitar usar a conta root no dia a dia e…",
    "…criar usuários individuais com permissões específicas. É essencial habilitar MFA (Autenticação Multi-Fator) para acesso ao console e…",
    "…utilizar Groups (Grupos) para organizar permissões de forma escalável, anexando políticas managed ou customizadas a esses grupos que…",
    "…devem seguir o princípio do menor privilégio. Para acesso programático de aplicações, a melhor prática é usar Roles (Funções) em vez de…",
    "…chaves de usuário, atribuindo-as diretamente a serviços AWS como EC2 ou Lambda. Isso elimina o risco de vazamento de credenciais…",
    "…estáticas em código. Além disso, é crucial configurar políticas de senha fortes para todos os usuários, exigindo complexidade e…",
    "…rotação periódica. Essas medidas garantem que o ambiente seja seguro desde o foundation, prevenindo acessos não autorizados e…",
    "…vazamentos de credenciais, seguindo as aws well-architected framework recommendations para identity and access management."
];

// Função para embaralhar um array (randomiza a ordem dos elementos)
function shuffle(array) {
  // sort() recebe uma função que retorna valor aleatório entre negativo e positivo
  // Isso faz os elementos serem reorganizados aleatoriamente
  return array.sort(() => Math.random() - 0.5);
}

// Seleciona elementos do HTML que vamos manipular
const cardsContainer = document.getElementById('cardsContainer'); // Área onde ficam os cards embaralhados
const dropArea = document.getElementById('dropArea');             // Área onde o usuário arrasta os cards
const checkBtn = document.getElementById('checkBtn');             // Botão para verificar se a ordem está correta
const result = document.getElementById('result');                 // Elemento onde mostramos o resultado da verificação

let draggedCard = null; // Variável global que guarda qual card está sendo arrastado

// Função para criar os cards na tela, já embaralhados
function criarCards() {
  const embaralhados = shuffle([...trechosCorretos]); // Copia e embaralha os trechos corretos
  embaralhados.forEach((texto, index) => {            // Para cada trecho embaralhado
    const card = document.createElement('div');       // Cria um div que será o card
    card.classList.add('card');                        // Adiciona a classe CSS 'card'
    card.draggable = true;                             // Permite que o card seja arrastável
    card.innerText = texto;                            // Coloca o texto do card
    card.dataset.index = index;                        // Armazena o índice do card como dado
    addDragEvents(card);                               // Adiciona os eventos de drag (arrastar e soltar)
    cardsContainer.appendChild(card);                  // Adiciona o card na área de cards embaralhados
  });
}

// Função que adiciona eventos de drag (arrastar) a cada card
function addDragEvents(card) {
  // Evento que inicia o arrasto
  card.addEventListener('dragstart', e => {
    draggedCard = card;                                // Guarda o card que está sendo arrastado
    setTimeout(() => {
      card.classList.add('dragging');                 // Adiciona classe 'dragging' para efeitos visuais
    }, 0);
  });

  // Evento que termina o arrasto
  card.addEventListener('dragend', e => {
    draggedCard = null;                                // Limpa o card arrastado
    card.classList.remove('dragging');               // Remove a classe visual 'dragging'
  });
}

// Área de drop: permite que os cards sejam soltos aqui
dropArea.addEventListener('dragover', e => {
  e.preventDefault(); // Necessário para permitir que o drop aconteça
});

dropArea.addEventListener('drop', e => {
  e.preventDefault();
  if (draggedCard) {                     // Se houver um card sendo arrastado
    // Evita duplicar cards na área de drop
    if (!dropArea.contains(draggedCard)) {
      dropArea.appendChild(draggedCard); // Adiciona o card no dropArea
    }
  }
});

// Permite que cards sejam movidos de volta para a área original
cardsContainer.addEventListener('dragover', e => {
  e.preventDefault(); // Necessário para permitir que o drop aconteça
});

cardsContainer.addEventListener('drop', e => {
  e.preventDefault();
  if (draggedCard) {                       // Se houver um card sendo arrastado
    if (!cardsContainer.contains(draggedCard)) {
      cardsContainer.appendChild(draggedCard); // Coloca o card de volta na área original
    }
  }
});

// Botão para verificar se a ordem dos cards no dropArea está correta
checkBtn.addEventListener('click', () => {
  const montado = Array.from(dropArea.children).map(card => card.innerText);
  // Monta um array com os textos dos cards na área de drop, na ordem atual

  if (montado.length !== trechosCorretos.length) {  // Se não colocou todos os cards
    result.innerText = `Você precisa colocar todos os trechos na área para verificar!`;
    result.style.color = 'red';
    return; // Sai da função sem continuar
  }

  let correto = true; // Variável para checar se a ordem está correta
  for (let i = 0; i < trechosCorretos.length; i++) { // Para cada trecho
    if (montado[i] !== trechosCorretos[i]) {        // Se algum card estiver fora de ordem
      correto = false;                               // Marca como incorreto
      break;                                        // Sai do loop
    }
  }

  if (correto) {                                     // Se a ordem estiver correta
    result.innerText = "Parabéns! Você montou o texto corretamente!";
    result.style.color = 'green';
  } else {                                           // Se estiver incorreta
    result.innerText = "A ordem está incorreta. Tente novamente!";
    result.style.color = 'red';
  }
});

// Inicializa a aplicação criando os cards
criarCards();
