document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('../../dados/destinos.json');
        const destinos = await response.json();

        // CONFIGURAÇÃO INICIAL DO MAPA
        const map = L.map('map').setView([-5.0, -45.0], 6);

        // ADICIONA MAPA
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // MARCADORES COM NOME E DESCRIÇÃO
        function addMarkers(destinos) {
            destinos.forEach(destino => {
                L.marker([destino.latitude, destino.longitude])
                    .addTo(map)
                    .bindPopup(`<b>${destino.nome}</b><br>${destino.descricao}`);
            });
        }

        // ADICIONA MARCADORES
        addMarkers(destinos);

    } catch (error) {
        console.error('Erro ao carregar destinos:', error);
    }
});
