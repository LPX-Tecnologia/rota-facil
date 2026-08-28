let mapaPrincipal;
let marcadores = [];

function inicializarMapa() {
    if (mapaPrincipal) return;
    mapaPrincipal = L.map('map').setView([-23.5505, -46.6333], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapaPrincipal);
}

async function mostrarTodosClientesNoMapa() {
    inicializarMapa();
    const romaneios = await listarRomaneios();
    marcadores.forEach(m => mapaPrincipal.removeLayer(m));
    marcadores = [];
    romaneios.forEach(rom => {
        rom.clientes.forEach(cliente => {
            const marker = L.marker([cliente.lat, cliente.lng]).addTo(mapaPrincipal);
            marker.bindPopup(`<b>${cliente.nome}</b><br>${cliente.endereco}`);
            marcadores.push(marker);
        });
    });
    // Adicionar localização atual
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const { latitude, longitude } = pos.coords;
            const markerAtual = L.marker([latitude, longitude], { icon: iconeAtual }).addTo(mapaPrincipal);
            markerAtual.bindPopup('Minha Localização');
            marcadores.push(markerAtual);
            mapaPrincipal.setView([latitude, longitude], 13);
        });
    }
}