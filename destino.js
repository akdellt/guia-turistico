document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtém o ID do destino a partir da URL (exemplo: ?id=1)
        const urlParams = new URLSearchParams(window.location.search);
        const destinoId = urlParams.get('id');

        if (!destinoId) {
            throw new Error('ID do destino não fornecido');
        }

        const response = await fetch('../../dados/destinos.json');
        const destinos = await response.json();

        const destino = destinos.find(d => d.id === destinoId);

        if (!destino) {
            throw new Error('Destino não encontrado');
        }

        // Atualizar a imagem de fundo
        const fundo = document.getElementById('destino-fundo');
        fundo.style.backgroundImage = `url('../../assets/destinos/header/${destino.foto}')`;

        // Preencher título da página
        document.getElementById('destino-nome').textContent = destino.nome;
        document.getElementById('destino-titulo').textContent = destino.titulo;
        document.getElementById('destino-descricao').textContent = destino.descricao;

        // Limpa e preenche o conteúdo do primeiro e segundo mapa
        const conteudoMapa1 = document.getElementById('atrativo-1');
        const conteudoMapa2 = document.getElementById('atrativo-2');

        if (destino.atrativos.length > 0) {
            const atrativo1 = destino.atrativos[0];
            conteudoMapa1.innerHTML = `
                <h2 class="destino-titulo">${atrativo1.nome}</h2>
                <div class="destino-atrativos">
                    <span class="atrativos-icon">${atrativo1.tipo}</span>
                </div>
                <p>${atrativo1.descricao}</p>
                <p><strong>Dicas:</strong> ${atrativo1.dicas}</p>
            `;
        }

        if (destino.atrativos.length > 1) {
            const atrativo2 = destino.atrativos[1];
            conteudoMapa2.innerHTML = `
                <h2 class="destino-titulo">${atrativo2.nome}</h2>
                <div class="destino-atrativos">
                    <span class="atrativos-icon">${atrativo2.tipo}</span>
                </div>
                <p>${atrativo2.descricao}</p>
                <p><strong>Dicas:</strong> ${atrativo2.dicas}</p>
            `;
        } else {
            // Remove o segundo conteúdo do mapa se não houver o segundo atrativo
            document.getElementById('conteudo-mapa-2').remove();
        }
    } catch (error) {
        console.error('Erro ao carregar destino:', error);
    }
});
