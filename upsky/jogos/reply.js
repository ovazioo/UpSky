// Lista de perguntas, SOBRE DEVOPS E CLOUD,VIDEO 3!!!!!!!!!!!
const quizData = [  // Declara um array de objetos MONTADO PARA PERGUNTAA
  {
    question: "Em DevOps, o que é CI/CD e qual é seu principal objetivo?",  //QUESTAO,OPTION = OPÇÕES,MUDAR NOME DE VARIAVEL DEPOIS DAS QUESTÕES SEREM REVISADAS
    options: ["Uma linguagem de programação para nuvem.", "Práticas de Integração Contínua e Entrega Contínua que automatizam testes e deploys.", "Um serviço de monitoramento de servidores.", "Uma ferramenta para criar containers isolados."],  // Array com as alternativas mostradas ao usuário
    answer: 1, // índice da resposta correta 
    clue: "CI/CD (Integração Contínua e Entrega Contínua) automatiza os testes e deploys do software, garantindo que novas versões sejam lançadas de forma rápida e segura, sem depender de processos manuais."
  },
  {
    question: "Qual é a principal vantagem de usar IaC em ambientes de Cloud?",  // Texto da pergunta 2
    options: ["Reduz a necessidade de monitoramento de servidores.", "Permite versionar, reproduzir e automatizar a criação de ambientes.", "Substitui completamente DevOps.", "Aumenta custos operacionais."],  // Alternativas da pergunta 2
    answer: 1,
    clue:"Infraestrutura como Código permite criar, versionar e reproduzir ambientes automaticamente, evitando inconsistências e erros manuais na configuração de servidores."  // Índice da alternativa correta (Júpiter)
  },
  {
    question: "Em um pipeline DevOps na nuvem, qual estratégia é mais eficaz para gerenciar múltiplos ambientes (desenvolvimento, homologação e produção) com consistência e mínimo risco de falhas?",  // Texto da pergunta 3
    options: ["Usar scripts IaC e pipelines automatizados para provisionar e atualizar todos os ambientes de forma versionada.", "Configurar manualmente cada ambiente sempre que houver atualização.", "Apenas duplicar o ambiente de produção para homologação quando necessário.", "Ignorar ambientes separados e testar tudo diretamente em produção."],  // Alternativas da pergunta 3
    answer: 0,
    clue:"Usar IaC e pipelines automatizados permite criar e atualizar ambientes de desenvolvimento, homologação e produção de forma consistente e versionada, reduzindo erros manuais e riscos de falhas ao promover mudanças."  // Índice da alternativa correta (Machado de Assis)
  },
  {
    question: "Qual é a função do Kubernetes dentro de um pipeline DevOps?",  // Texto da pergunta 4
    options: ["Monitorar logs de aplicação.", "Automatizar builds de software.", "Criar infraestrutura física dentro da empresa.", "Orquestrar containers em múltiplos servidores, garantindo escalabilidade e alta disponibilidade."],  // Alternativas da pergunta 4
    answer: 3,
    clue: "Kubernetes organiza e escala containers em múltiplos servidores, garantindo que a aplicação fique sempre disponível e funcione de forma eficiente."  // Índice da alternativa correta (H2O)

  },
  {
    question: "Por que a automação é considerada crítica em DevOps na Cloud?",  // Texto da pergunta 4
    options: ["Porque elimina totalmente a necessidade de equipes humanas.", "Porque substitui provedores de nuvem.", "Porque reduz erros manuais, acelera entregas e melhora escalabilidade.", "Porque diminui a segurança do ambiente."],  // Alternativas da pergunta 4
    answer: 2,
    clue: "Automatizar processos reduz erros humanos, acelera entregas e permite que o sistema seja escalável e confiável na Cloud."  // Índice da alternativa correta (H2O)
  }
];  // Fecha o array quizData

// Variáveis para controle do quiz  // Comentário explicando a finalidade das variáveis abaixo
let currentQuestion = 0;  // Guarda o índice da pergunta atual (começa na primeira, índice 0)
let score = 0;  // Armazena quantas perguntas o usuário acertou

// Elementos do DOM  // Comentário indicando que vamos buscar elementos HTML por id
const questionEl = document.getElementById("question");  // Referência ao elemento onde o texto da pergunta será exibido
const optionsEl = document.getElementById("options");  // Referência ao contêiner onde as alternativas serão inseridas
const nextBtn = document.getElementById("nextBtn");  // Referência ao botão de “Próxima” pergunta
const resultEl = document.getElementById("result");  // Referência ao elemento onde mensagens/feedback serão mostrados

// Função para carregar a pergunta atual  // Comentário de cabeçalho da função
function loadQuestion() {  // Declara a função responsável por renderizar a pergunta e as opções na tela
  // Limpa resultados e botão próximo  // Comentário explicando a limpeza do estado visual
  resultEl.innerText = "";  // Remove qualquer mensagem de feedback exibida anteriormente
  nextBtn.disabled = true;  // Desabilita o botão “Próximo” até que o usuário escolha uma alternativa
  optionsEl.innerHTML = "";  // Remove as alternativas da pergunta anterior

  // Carrega a pergunta e opções  // Comentário indicando que vamos pegar os dados da pergunta atual
  const currentQuiz = quizData[currentQuestion];  // Pega o objeto (pergunta atual) com base no índice currentQuestion
  questionEl.innerText = currentQuiz.question;  // Exibe o texto da pergunta no elemento apropriado

  currentQuiz.options.forEach((optionText, index) => {  // Percorre cada alternativa disponível e seu índice
    const option = document.createElement("div");  // Cria dinamicamente um elemento <div> para uma alternativa
    option.classList.add("option");  // Adiciona a classe CSS "option" para estilização
    option.innerText = optionText;  // Define o texto visível da alternativa
    option.dataset.index = index;  // Armazena o índice da alternativa em um data-atribute (data-index)
    option.addEventListener("click", selectOption);  // Registra o manipulador de clique para quando o usuário escolher
    optionsEl.appendChild(option);  // Insere a alternativa criada dentro do contêiner de opções no DOM
  });  // Fecha o forEach
}  // Fecha a função loadQuestion

// Função para lidar com o clique em uma opção  // Comentário de cabeçalho da função
function selectOption(e) {  // Declara a função chamada ao clicar em uma alternativa
  const selectedOption = e.target;  // Elemento DOM que foi clicado (a alternativa selecionada)
  const selectedIndex = Number(selectedOption.dataset.index);
  const correctIndex = quizData[currentQuestion].answer;  // Converte o data-index (string) para número do índice escolhido
  const correctClue = quizData[currentQuestion].clue;  // Obtém o índice da resposta correta para a pergunta atual

  // Desabilita as opções para evitar múltiplos cliques  // Comentário sobre prevenção de cliques após a escolha
  Array.from(optionsEl.children).forEach(option => {  // Converte a coleção HTML em array e itera sobre cada alternativa exibida
    option.removeEventListener("click", selectOption);  // Remove o evento de clique para não permitir novas seleções
    option.classList.add("disabled");  // Adiciona classe “disabled” (geralmente usada para estilo visual de desativado)
  });  // Fecha o forEach

  // Marca opção correta e incorreta com cores  // Comentário explicando o feedback visual
  if (selectedIndex === correctIndex) {
    selectedOption.classList.add("correct");
    resultEl.innerText = "Você acertou!";
    score++;
  } else {
    selectedOption.classList.add("wrong");
    // Mostra a opção escolhida e a correta
    resultEl.innerText = `Você errou!, ${quizData[currentQuestion].clue}`;

    // Destaca a alternativa correta
    optionsEl.children[correctIndex].classList.add("correct");
  }

  // Habilita o botão próxima pergunta  // Comentário indicando que agora o usuário pode avançar
  nextBtn.disabled = false;  // Reativa o botão “Próximo”
}  // Fecha a função selectOption

// Função para passar para a próxima pergunta ou terminar o quiz  // Comentário de cabeçalho
function nextQuestion() {  // Declara a função chamada ao clicar no botão “Próximo”
  currentQuestion++;  // Avança o índice para a próxima pergunta
  if (currentQuestion < quizData.length) {  // Verifica se ainda existem perguntas a serem mostradas
    loadQuestion();  // Se sim, carrega a próxima pergunta
  } else {  // Se não houver mais perguntas
    showResult();  // Mostra o resultado final do quiz
  }  // Fecha o if/else
}  // Fecha a função nextQuestion

// Função para mostrar o resultado final  // Comentário de cabeçalho
function showResult() {  // Declara a função responsável por exibir a tela de conclusão
  questionEl.innerText = "Quiz finalizado!";  // Troca o título para indicar que acabou
  optionsEl.innerHTML = "";  // Limpa o contêiner de opções (não há mais alternativas a exibir)
  nextBtn.style.display = "none";  // Esconde o botão “Próximo”, pois não é mais necessário
  resultEl.innerText = `Você acertou ${score} de ${quizData.length} perguntas! Parabéns!`;  // Mostra a pontuação final e uma mensagem

  const minhaDiv = document.getElementById('quiz');

  const backtohomebutton = document.createElement('button');
  backtohomebutton.innerText = 'voltar a pagina inicial';

  backtohomebutton.classList.add('BackHomeButtton');

  minhaDiv.appendChild(backtohomebutton);

  backtohomebutton.addEventListener('click', () => {
    window.location.href = 'reply.html'; // ou a URL da sua página inicial
  });




}  // Fecha a função showResult

// Eventos  // Comentário de seção de eventos
nextBtn.addEventListener("click", nextQuestion);  // Quando o botão “Próximo” for clicado, chama a função nextQuestion

// Inicia o quiz  // Comentário indicando o ponto de entrada da aplicação
loadQuestion();  // Chama a função para renderizar a primeira pergunta ao carregar a página
