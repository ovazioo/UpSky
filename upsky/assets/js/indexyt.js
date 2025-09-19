// Sua chave da API do YouTube — você deve gerar uma no Google Cloud Console
const apiKey = 'AIzaSyDWHB7W3XmE-97kBjXzmXTgQTJUbpHZkLs'; 

// Lista de links de vídeos do YouTube que você quer exibir
const videoLinks = [
    "https://www.youtube.com/watch?v=5czsMlRc7Wk",//memorygame
    "https://www.youtube.com/watch?v=spUlvo0HNFQ",//dragandrelease
    "https://www.youtube.com/watch?v=wwQlo1iS7Hg",
    "https://www.youtube.com/watch?v=_iho2OK_LDg",
    "https://www.youtube.com/watch?v=IOezbx41Oq4"
];

// Seleciona o elemento <div class="AulaList"> do HTML para inserir os vídeos
const aulaList = document.querySelector('.AulaList');

// Seleciona o elemento <div class="AulaExibition"> do HTML para exibir o player
const aulaExibition = document.querySelector('.AulaExibition');


// Função que extrai o ID do vídeo a partir de um link do YouTube
function getVideoId(url) {
    const urlObj = new URL(url); // Cria um objeto URL com o link
    return urlObj.searchParams.get("v"); // Pega o valor do parâmetro "v" (ID do vídeo)
}


// Função assíncrona que busca os dados de um vídeo na YouTube API
async function fetchVideoData(videoId) {
    // Monta a URL do endpoint da API, pedindo os dados da parte "snippet" do vídeo
    const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;
    
    // Faz a requisição para a API
    const response = await fetch(endpoint);
    
    // Converte a resposta em JSON
    const data = await response.json();

    // Retorna o primeiro item (deveria haver apenas 1, pois buscamos por ID)
    return data.items[0];
}


// Função que renderiza o player do YouTube na tela
function renderVideoPlayer(videoId) {
    aulaExibition.innerHTML = `
        <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" allowfullscreen>
        </iframe>
    `;
    // Isso insere um iframe do YouTube na div .AulaExibition com o vídeo clicado
}


// Função principal que carrega os vídeos da lista
async function loadVideos() {
    // Para cada link da lista de vídeos
    for (const link of videoLinks) {
        const videoId = getVideoId(link); // Extrai o ID do vídeo
        const videoData = await fetchVideoData(videoId); // Busca os dados pela API

        // Se os dados do vídeo foram encontrados
        if (videoData) {
            const { title, thumbnails } = videoData.snippet; // Pega o título e thumbnail

            // Cria um novo elemento div para representar o vídeo na lista
            const videoItem = document.createElement('div');
            videoItem.style.cursor = 'pointer'; // Deixa o cursor de "mãozinha"
            videoItem.style.marginBottom = '10px'; // Espaçamento entre vídeos

            // Adiciona HTML dentro da div: thumbnail e título
            videoItem.innerHTML = `
                <img src="${thumbnails.default.url}" alt="${title}" />
                <p>${title}</p>
            `;

            // Adiciona um evento de clique: quando clicar, carrega o player
            videoItem.addEventListener('click', () => {
                renderVideoPlayer(videoId);
            });

            // Adiciona o vídeo na lista (dentro da div .AulaList)
            aulaList.appendChild(videoItem);
        }
    }
}

// Chama a função principal para iniciar o carregamento dos vídeos
loadVideos();

