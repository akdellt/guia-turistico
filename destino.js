document.addEventListener('DOMContentLoaded', async () => {
    try {
        // CAPTURA ID PERA URL
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

        // ATUALIZA IMAGEM DE FUNDO
        const fundo = document.getElementById('destino-fundo');
        fundo.style.backgroundImage = `url('../../assets/destinos/header/${destino.foto}')`;

        // INSERE INFORMAÇÕES INICIAIS DO DESTINO
        document.getElementById('destino-nome').textContent = destino.nome;
        document.getElementById('destino-titulo').textContent = destino.titulo;
        document.getElementById('destino-descricao').textContent = destino.descricao;

        // INSERE INFORMAÇÕES DOS ATRATICOS
        const atrativoInfo1 = document.getElementById('atrativo-1');
        const atrativoInfo2 = document.getElementById('atrativo-2');

        // VERIFICA SE TEM ATRATIVOS
        if (destino.atrativos.length > 0) {
            const atrativo1 = destino.atrativos[0];
            let dicasHtml1 = atrativo1.dicas.map(dica => `<p><strong>Dica:</strong> ${dica}</p>`).join('');
            atrativoInfo1.innerHTML = `
                <h2 class="destino-titulo">${atrativo1.nome}</h2>
                <p>${atrativo1.descricao}</p>
                ${dicasHtml1}
            `;

            // ATUALIZA IMAGEM DO ATRATIVO
            const imagemAtrativo1 = document.querySelector('#conteudo-bloco-1 .bloco-img');
            imagemAtrativo1.src = `../../assets/atracoes/preview/${atrativo1.foto}`;
            imagemAtrativo1.alt = `Imagem de ${atrativo1.nome}`;
        }

        if (destino.atrativos.length > 1) {
            const atrativo2 = destino.atrativos[1];
            let dicasHtml2 = atrativo2.dicas.map(dica => `<p><strong>Dica:</strong> ${dica}</p>`).join('');
            atrativoInfo2.innerHTML = `
                <h2 class="destino-titulo">${atrativo2.nome}</h2>
                <p>${atrativo2.descricao}</p>
                ${dicasHtml2}
            `;

            // ATUALIZA IMAGEM DO SEGUNDO ATRATIVO
            const imagemAtrativo2 = document.querySelector('#conteudo-bloco-2 .bloco-img');
            imagemAtrativo2.src = `../../assets/atracoes/preview/${atrativo2.foto}`;
            imagemAtrativo2.alt = `Imagem de ${atrativo2.nome}`;
        } else {
            // REMOVE CONTEÚDO DO SEGUNDO ATRATIVO SE NÃO EXISTIR
            document.getElementById('conteudo-bloco-2').remove();
        }

    } catch (error) {
        console.error('Erro ao carregar destino:', error);
    }
});
