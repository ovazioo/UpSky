// Lista de perguntas, cada uma com texto, opções e índice da resposta correta  // Comentário descritivo do bloco de dados do quiz
const quizData = [
  {
    question: "É uma prática recomendada pela AWS usar a conta root (raiz) para atividades do dia a dia, como criar instâncias EC2.",
    options: ["Verdadeiro", "Falso"],
    answer: 1, // Falso
    clue: "O vídeo enfatiza que a conta root deve ser protegida e usada apenas para emergências. Deve-se criar um usuário IAM com permissões administrativas para uso diário."
  },
  {
    question: "Uma Role (Função) IAM pode ser usada para fazer login no Console de Gerenciamento da AWS.",
    options: ["Verdadeiro", "Falso"],
    answer: 1, // Falso
    clue: "Roles são destinadas a serem assumidas por serviços AWS (como EC2 ou Lambda) ou usuários, mas não possuem credenciais de login (senha ou chaves de acesso) para o console."
  },
  {
    question: "A anexação direta de políticas a um usuário IAM é considerada uma melhor prática em relação ao uso de grupos.",
    options: ["Verdadeiro", "Falso"],
    answer: 1, // Falso
    clue: "O instrutor recomenda usar Grupos para organizar permissões. Isso é mais escalável, pois mudanças nas permissões do grupo afetam todos os usuários automaticamente."
  },
  {
    question: "O princípio do menor privilégio significa conceder a um usuário apenas as permissões necessárias para realizar sua tarefa.",
    options: ["Verdadeiro", "Falso"],
    answer: 0, // Verdadeiro
    clue: "Este é um princípio fundamental de segurança mencionado no vídeo. Por exemplo, em vez de dar acesso a todo o S3, restringir o acesso a um bucket específico."
  },
  {
    question: "É seguro fazer commit de chaves de acesso secreta de um usuário IAM em um repositório público no GitHub, desde que a conta não seja crítica.",
    options: ["Verdadeiro", "Falso"],
    answer: 1, // Falso
    clue: "O vídeo alerta severamente sobre isso. Chaves de acesso comprometidas podem levar a acesso não autorizado e custos elevados, independentemente da conta."
  },
  {
    question: "A configuração de políticas de senha forte e MFA (Autenticação Multi-Fator) no IAM é opcional para contas com poucos usuários.",
    options: ["Verdadeiro", "Falso"],
    answer: 1, // Falso
    clue: "O instrutor demonstra que configurar MFA e políticas de senha fortes é um passo essencial de segurança para proteger qualquer conta AWS, independente do tamanho."
  }
]; // Fecha o array quizData

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
