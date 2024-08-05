let destinos = [];

// ABA DE PESQUISA -- APARECE QUANDO CLICA
document.addEventListener('DOMContentLoaded', () => {
    const pesquisaBotao = document.getElementById('pesquisa-botao');
    const pesquisaAba = document.getElementById('pesquisa-aba');

    pesquisaBotao.addEventListener('click', () => {
        // MOSTRA/OCULTA ABA
        pesquisaAba.classList.toggle('esconder');
    });

    // CARREGAR DESTINOS DO JSON
    async function carregarDestinos() {
        try {
            const response = await fetch('../../dados/destinos.json');
            destinos = await response.json();

            const pesquisaTexto = document.querySelector('.pesquisa-texto');
            const pesquisaForm = document.getElementById('pesquisa-form');

            // COMPARA DESTINO NA ABA E NO JSON E REDIRECIONA PARA PÁGINA
            pesquisaForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const termo = pesquisaTexto.value.toLowerCase();
                const destinoEncontrado = destinos.find(destino =>
                    destino.nome.toLowerCase() === termo ||
                    destino.nome.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") === termo
                );
                if (destinoEncontrado) {
                    const baseURL = window.location.origin;
                    window.location.href = `${baseURL}/paginas/destinos/destino.html?id=${destinoEncontrado.id}`;
                } else {
                    alert('Destino não encontrado!');
                }
            });

        } catch (error) {
            console.error('Erro ao carregar destinos:', error);
        }
    }

    // CHAMA FUNÇÃO
    carregarDestinos();
});
