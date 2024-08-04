//ABA DE PESQUISA -- APARECE QUANDO CLICA
document.addEventListener('DOMContentLoaded', () => {
    const pesquisaBotao = document.getElementById('pesquisa-botao');
    const pesquisaAba = document.getElementById('pesquisa-aba');

    pesquisaBotao.addEventListener('click', () => {
        // Alternar a classe 'hidden' para mostrar/ocultar a aba de pesquisa
        pesquisaAba.classList.toggle('esconder');
    });
});

//DESTINOS -- MOSTRAR DESTINOS POR REGIÕES OU POPULARIDADE
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../../dados/destinos.json');
        const destinos = await response.json();

        const regioesLista = document.getElementById('regioes-lista');
        const destinosGaleria = document.getElementById('destinos-galeria');

        function renderDestinos(destinos) {
            destinosGaleria.innerHTML = ''; // Limpa a galeria antes de adicionar novos itens
            destinos.forEach(destino => {
                const destinoDiv = document.createElement('div');
                destinoDiv.className = 'galeria-quadro';
                destinoDiv.innerHTML = `
                    <a href="./paginas/destinos/destino-id.html?id=${destino.id}">
                        <img src="./assets/destinos/preview/${destino.foto}" alt="${destino.nome}">
                    </a>
                    <p class="desc">${destino.nome}</p>
                `;
                destinosGaleria.appendChild(destinoDiv);
            });
        }

        // Renderiza todos os destinos inicialmente
        renderDestinos(destinos);

        // Adiciona event listeners para cada opção de região
        regioesLista.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('nav-destino')) {
                const regiao = target.getAttribute('data-regiao');
                if (regiao === 'all') {
                    renderDestinos(destinos);
                } else if (regiao === 'Principais destinos') {
                    const destinosPrincipais = destinos.filter(destino => destino.principal);
                    renderDestinos(destinosPrincipais);
                } else {
                    const destinosFiltrados = destinos.filter(destino => destino.regiao === regiao);
                    renderDestinos(destinosFiltrados);
                }
            }
        });
    } catch (error) {
        console.error('Erro ao carregar destinos:', error);
    }
});

//MAPA INTERATIVO



