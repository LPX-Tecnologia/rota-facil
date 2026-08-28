let mapaNavegacao;
let rotaAtual = [];
let indiceAtual = 0;
let watchId;

function iniciarNavegacao(rota) {
    rotaAtual = rota;
    indiceAtual = 0;
    mostrarTela('navegacao');
    if (!mapaNavegacao) {
        mapaNavegacao = L.map('mapa-navegacao').setView([rota[0].lat, rota[0].lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapaNavegacao);
    }
    // Desenhar linha da rota
    const pontos = rota.map(c => [c.lat, c.lng]);
    L.polyline(pontos, { color: 'blue' }).addTo(mapaNavegacao);
    // Monitorar posição
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(pos => {
            const { latitude, longitude } = pos.coords;
            L.marker([latitude, longitude]).addTo(mapaNavegacao);
            mapaNavegacao.setView([latitude, longitude], 15);
            // Calcular distância até próximo ponto
            if (indiceAtual < rotaAtual.length) {
                const dist = calcularDistancia(latitude, longitude, rotaAtual[indiceAtual].lat, rotaAtual[indiceAtual].lng);
                if (dist < 0.05) { // 50 metros
                    // Chegou na parada
                    document.getElementById('instrucao').innerHTML = `Chegou em ${rotaAtual[indiceAtual].nome}`;
                } else {
                    document.getElementById('instrucao').innerHTML = `Siga para ${rotaAtual[indiceAtual].nome} (${dist.toFixed(2)} km)`;
                }
            }
        }, null, { enableHighAccuracy: true });
    }
}

function concluirParada() {
    indiceAtual++;
    if (indiceAtual >= rotaAtual.length) {
        alert('Rota concluída!');
        if (watchId) navigator.geolocation.clearWatch(watchId);
        mostrarTela('lista');
    } else {
        document.getElementById('instrucao').innerHTML = `Próxima parada: ${rotaAtual[indiceAtual].nome}`;
        // Perguntar se quer iniciar próxima rota
        if (confirm('Iniciar próxima rota?')) {
            // Centralizar no próximo ponto
            mapaNavegacao.setView([rotaAtual[indiceAtual].lat, rotaAtual[indiceAtual].lng], 15);
        }
    }
}