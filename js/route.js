function abrirDialogoRota() {
    document.getElementById('dialogo-rota').classList.add('ativo');
}

function fecharDialogoRota() {
    document.getElementById('dialogo-rota').classList.remove('ativo');
}

async function escolherTipoRota(tipo) {
    fecharDialogoRota();
    const romaneios = await listarRomaneios();
    const clientes = [];
    romaneios.forEach(rom => {
        if (rom.status !== 'concluido' && rom.clientes) {
            rom.clientes.forEach(cliente => clientes.push(cliente));
        }
    });
    if (clientes.length === 0) {
        alert('Nenhuma entrega pendente.');
        return;
    }
    gerarRota(clientes, tipo);
}

function gerarRota(clientes, tipo) {
    // Obter localização atual
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const origem = { lat: pos.coords.latitude, lng: pos.coords.longitude };
            executarRoteirizacao(origem, clientes, tipo);
        }, () => {
            // Fallback: usar primeiro cliente como origem
            executarRoteirizacao(clientes[0], clientes.slice(1), tipo);
        });
    } else {
        executarRoteirizacao(clientes[0], clientes.slice(1), tipo);
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
            if (tipo === 'demorada') dist *= 2.0;
            else if (tipo === 'normal') dist *= 1.3;
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

function calcularDistancia(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
