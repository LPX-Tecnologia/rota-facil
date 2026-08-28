let mapaPrincipal;
let marcadores = [];
let marcadorPosicaoAtual = null;
let watchIdMapa = null;

function inicializarMapa() {
    if (mapaPrincipal) return;
    mapaPrincipal = L.map('map').setView([-23.5505, -46.6333], 13); // posição padrão (São Paulo)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(mapaPrincipal);
}

// Função para iniciar o rastreamento da posição
function iniciarRastreamento() {
    if (!navigator.geolocation) {
        alert('Geolocalização não suportada pelo navegador.');
        return;
    }
    if (watchIdMapa) return; // já está rastreando

    // Adicionar marcador inicial se ainda não existir
    if (!marcadorPosicaoAtual) {
        marcadorPosicaoAtual = L.marker([0,0], {
            icon: L.divIcon({ className: 'meu-marcador', html: '📍', iconSize: [30,30] })
        }).addTo(mapaPrincipal);
    }

    watchIdMapa = navigator.geolocation.watchPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            // Atualizar posição do marcador
            marcadorPosicaoAtual.setLatLng([latitude, longitude]);
            // Centralizar o mapa na posição atual
            mapaPrincipal.setView([latitude, longitude], 15);
            // Opcional: remover o círculo de precisão se existir
            if (marcadorPosicaoAtual.circlePrecisao) {
                mapaPrincipal.removeLayer(marcadorPosicaoAtual.circlePrecisao);
            }
            // Adicionar círculo de precisão (opcional)
            marcadorPosicaoAtual.circlePrecisao = L.circle([latitude, longitude], {
                radius: pos.coords.accuracy,
                color: '#1a73e8',
                fillOpacity: 0.2
            }).addTo(mapaPrincipal);
        },
        (err) => {
            console.error('Erro ao obter posição:', err);
        },
        { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    );
}

// Parar rastreamento (quando sair da tela do mapa)
function pararRastreamento() {
    if (watchIdMapa) {
        navigator.geolocation.clearWatch(watchIdMapa);
        watchIdMapa = null;
        if (marcadorPosicaoAtual) {
            mapaPrincipal.removeLayer(marcadorPosicaoAtual);
            marcadorPosicaoAtual = null;
        }
    }
}

// Carregar todos os clientes dos romaneios no mapa
async function mostrarTodosClientesNoMapa() {
    if (!mapaPrincipal) inicializarMapa();
    // Limpar marcadores antigos (exceto o da posição atual)
    if (marcadores.length) {
        marcadores.forEach(m => mapaPrincipal.removeLayer(m));
        marcadores = [];
    }

    const romaneios = await listarRomaneios();
    romaneios.forEach(rom => {
        if (rom.clientes && rom.clientes.length) {
            rom.clientes.forEach(cliente => {
                if (cliente.lat && cliente.lng) {
                    const marker = L.marker([cliente.lat, cliente.lng]).addTo(mapaPrincipal);
                    marker.bindPopup(`<b>${cliente.nome}</b><br>${cliente.endereco}`);
                    marcadores.push(marker);
                }
            });
        }
    });

    // Iniciar rastreamento da posição (se ainda não iniciado)
    iniciarRastreamento();
}
