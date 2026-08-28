function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371; // km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function gerarRota(clientes, tipo) {
    // Obter localização atual (ou usar primeiro cliente como origem)
    let origem = null;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            origem = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            executarRoteirizacao(origem, clientes, tipo);
        });
    } else {
        // Fallback: usar primeiro cliente como origem
        origem = clientes[0];
        executarRoteirizacao(origem, clientes.slice(1), tipo);
    }
}

function executarRoteirizacao(origem, clientes, tipo) {
    const naoVisitados = [...clientes];
    const rota = [];
    let atual = origem;
    while (naoVisitados.length > 0) {
        let menorCusto = Infinity;
        let indiceMenor = -1;
        naoVisitados.forEach((cliente, idx) => {
            let dist = calcularDistancia(atual.lat, atual.lng, cliente.lat, cliente.lng);
            // Aplicar penalidade conforme tipo
            if (tipo === 'demorada') dist *= 2.0; // rota mais longa
            else if (tipo === 'normal') dist *= 1.3;
            // rápida mantém dist original
            if (dist < menorCusto) {
                menorCusto = dist;
                indiceMenor = idx;
            }
        });
        const proximo = naoVisitados.splice(indiceMenor, 1)[0];
        rota.push(proximo);
        atual = proximo;
    }
    iniciarNavegacao(rota);
}