// FILTRAR DESTINOS POR REGIÃO
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../../dados/destinos.json');
        const destinos = await response.json();

        const regioesLista = document.getElementById('regioes-lista');
        const destinosGaleria = document.getElementById('destinos-galeria');
        const atrativosLista = document.getElementById('atrativos-lista');

        // INSERE IMAGENS DOS DESTINOS PRESENTES NO JSON
        function renderDestinos(destinos) {
            destinosGaleria.innerHTML = '';
            destinos.forEach(destino => {
                const destinoDiv = document.createElement('div');
                destinoDiv.className = 'galeria-quadro';
                destinoDiv.innerHTML = `
                    <a href="./paginas/destinos/destino.html?id=${destino.id}">
                        <img src="./assets/destinos/preview/${destino.foto}" alt="${destino.nome}">
                    </a>
                    <p class="desc">${destino.nome}</p>
                `;
                destinosGaleria.appendChild(destinoDiv);
            });
        }

        // RENDERIZA TODOS OS DESTINOS
        renderDestinos(destinos);

        regioesLista.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('nav-destino')) {
                // Remove a classe selecionado de todos os itens
                document.querySelectorAll('#regioes-lista .nav-destino').forEach(item => {
                    item.classList.remove('selecionado');
                });

                // MOSTRA DESTINOS POR REGIÃO SELECIONADA
                target.classList.add('selecionado');

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

        //MOSTRA ATRATIVOS QUANDO CLICAR
        const atrativosBloco = document.querySelector('.atrativos-bloco');
        const descricaoBloco = document.getElementById('descricao-atrativo');
        const descricaoTitulo = document.getElementById('descricao-titulo');
        const descricaoTexto = document.getElementById('descricao-texto');
        const linksDestinos = document.getElementById('links-destinos');

        let lastAtrativo = null; // COMPARA COM ULTIMO CLICADO

        atrativosBloco.addEventListener('click', (event) => {
            const target = event.target.closest('button');
            if (target && target.hasAttribute('data-atrativo')) {
                const tipoAtrativo = target.getAttribute('data-atrativo');

                // ESCONDE ABA AO CLICAR DE NOVO
                if (lastAtrativo === tipoAtrativo) {
                    descricaoBloco.style.display = 'none';
                    lastAtrativo = null;
                    return;
                }

                lastAtrativo = tipoAtrativo;

                // MOSTRA INFORMAÇÕES DO ATRATIVO
                descricaoTitulo.textContent = `${tipoAtrativo}`;
                descricaoTexto.textContent = `Destinos no Maranhão que possuem atrativos de ${tipoAtrativo}.`;

                linksDestinos.innerHTML = '';

                // FILTRA OS DESTINOS
                const destinosFiltrados = destinos.filter(destino =>
                    destino.atrativos.some(atrativo => atrativo.tipo === tipoAtrativo)
                );

                // MOSTRA BOTÕES DOS DESTINOS
                destinosFiltrados.forEach(destino => {
                    const link = document.createElement('a');
                    link.href = `./paginas/destinos/destino.html?id=${destino.id}`;
                    link.textContent = destino.nome;
                    linksDestinos.appendChild(link);
                });

                descricaoBloco.style.display = 'block';
            }
        });

        atrativosLista.addEventListener('click', (event) => {
            const target = event.target;
            if (target.classList.contains('nav-atrativo')) {
                const tipoAtrativo = target.getAttribute('data-atrativo');
                if (tipoAtrativo === 'all') {
                    renderDestinos(destinos);
                } else {
                    const destinosFiltrados = destinos.filter(destino =>
                        destino.atrativos.some(atrativo => atrativo.tipo === tipoAtrativo)
                    );
                    renderDestinos(destinosFiltrados);
                }
            }
        });

    } catch (error) {
        console.error('Erro ao carregar destinos:', error);
    }
});
