const cardsData = [
  { trechoFal: '____ consiste em automatizar a criação e o gerenciamento da infraestrutura utilizando princípios de desenvolvimento de software', resposta: 'Infrastructure as Code' },
  { trechoFal: 'Ferramentas como ____ permitem criar toda a infraestrutura do zero, incluindo servidores, bancos de dados, redes e load balancers.', resposta: 'Terraform, CloudFormation, OpenStack Heat' },
  { trechoFal: '____ são projetadas para gerenciar configuração de recursos já existentes, como servidores, switches e storage, instalando softwares e aplicando updates.', resposta: 'Ferramentas de Configuration Management' },
  { trechoFal: 'A prática de ____ garante que mudanças na infraestrutura sejam rastreáveis, auditáveis e reproduzíveis entre diferentes ambientes.', resposta: 'Versionamento / Controle de versão' },
  { trechoFal: 'Uma vantagem de ____ é a possibilidade de criar ambientes efêmeros de teste, que podem ser destruídos e recriados facilmente.', resposta: 'IaC' },
  { trechoFal: '____ reduz o risco de erros manuais e aumenta a produtividade ao integrar provisionamento e deploy em pipelines CI/CD.', resposta: 'Automação da infraestrutura' }
];

// Pega o elemento HTML onde os trechos (dropzones) serão mostrados — deve existir um elemento com id="trechosColuna"
const trechosColuna = document.getElementById('trechosColuna');

// Pega o elemento HTML onde as respostas embaralhadas serão mostradas — deve existir um elemento com id="respostasColuna"
const respostasColuna = document.getElementById('respostasColuna');

// Guarda temporariamente o item que está sendo arrastado (null quando nada está sendo arrastado)
let draggedItem = null;

// Para cada item em cardsData criamos uma div que funcionará como área de drop (trecho a ser completado)
cardsData.forEach((item, i) => {
  // Cria um elemento div que será a área do trecho (dropzone)
  const div = document.createElement('div');

  // Adiciona classes CSS para estilo: 'trecho' (identificação) e 'dropzone' (semântica de arrastar/soltar)
  div.classList.add('trecho', 'dropzone');

  // Guarda a resposta correta no dataset do elemento para facilitar a verificação depois
  div.dataset.resposta = item.resposta;

  // Coloca o texto com a lacuna dentro da div (por exemplo: "A computação ... ___ e ___")
  div.innerText = item.trechoFal;

  // Adiciona a div ao contêiner de trechos na página
  trechosColuna.appendChild(div);

  // Permite que algo seja arrastado sobre essa div (necessário para que ocorra o drop)
  div.addEventListener('dragover', e => e.preventDefault());

  // Evento que trata quando algo é solto (drop) dentro dessa div
  div.addEventListener('drop', e => {
    e.preventDefault(); // previne comportamento padrão do navegador
    // Se existir um item sendo arrastado
    if (draggedItem) {
      // Se já existir alguma resposta dentro da dropzone, movemos ela de volta para o painel de respostas
      // (assim evitamos ter duas respostas em uma mesma dropzone)
      div.querySelectorAll('.resposta').forEach(r => respostasColuna.appendChild(r));

      // Anexa o item arrastado dentro da dropzone (agora fica "colocado" no trecho)
      div.appendChild(draggedItem);

      // Limpa a referência do item arrastado
      draggedItem = null;
    }
  });
});

// Função simples para embaralhar um array (não é criptograficamente perfeita, mas serve aqui)
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Extrai apenas as respostas do cardsData e as embaralha para mostrar desordenadas no painel de respostas
const respostas = shuffle([...cardsData.map(c => c.resposta)]);

// Cria os "cards" de resposta (itens arrastáveis) e os adiciona ao painel de respostas
respostas.forEach(resp => {
  // Cria um elemento div que representará a resposta arrastável
  const card = document.createElement('div');

  // Adiciona classe para estilo e identificação
  card.classList.add('resposta');

  // Torna o elemento arrastável (drag)
  card.draggable = true;

  // Define o texto do card como a resposta (ex: "hardware e software")
  card.innerText = resp;

  // Evento que inicia o arrasto: guarda qual card está sendo arrastado
  card.addEventListener('dragstart', () => {
    draggedItem = card; // marca o card como sendo arrastado
    // Pequeno timeout para garantir que a classe seja aplicada após o evento iniciar (efeitos visuais)
    setTimeout(() => card.classList.add('dragging'), 0);
  });

  // Evento que termina o arrasto: limpa a referência e remove classe visual
  card.addEventListener('dragend', () => {
    draggedItem = null;                // limpa item arrastado
    card.classList.remove('dragging'); // remove estilo que indica "arrastando"
  });

  // Adiciona o card de resposta ao painel de respostas
  respostasColuna.appendChild(card);
});

// Cria dinamicamente um botão "Verificar" que checará se as colocações estão corretas
const checkBtn = document.createElement('button');
checkBtn.innerText = 'Verificar';

// Adiciona o botão à coluna de trechos (você pode mover para outro lugar no DOM se preferir)
trechosColuna.appendChild(checkBtn);

// Cria um elemento para mostrar o resultado (mensagem de acerto/erro)
const result = document.createElement('div');
result.id = 'result'; // id para estilo ou seleção futura
trechosColuna.appendChild(result); // adiciona o elemento de resultado ao DOM

// Ao clicar em "Verificar" checamos todas as dropzones para ver se a resposta colocada bate com a resposta esperada
checkBtn.addEventListener('click', () => {
  let correto = true; // flag que indica se todas as respostas estão corretas

  // Para cada elemento com a classe 'trecho' (cada dropzone)
  document.querySelectorAll('.trecho').forEach(div => {
    // Procura se há um elemento com a classe 'resposta' dentro da dropzone
    const respostaColocada = div.querySelector('.resposta');

    // Se não houver resposta ou o texto da resposta não corresponder ao dataset.resposta, marca como incorreto
    if (!respostaColocada || respostaColocada.innerText !== div.dataset.resposta) {
      correto = false;
    }
  });

  // Mostra a mensagem apropriada dependendo do resultado
  if (correto) {
    result.innerText = 'Parabéns! Você completou todas corretamente!';
    result.style.color = 'green';
  } else {
    result.innerText = 'Algumas respostas estão incorretas. Tente novamente!';
    result.style.color = 'red';
  }
});
