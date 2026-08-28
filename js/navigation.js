let mapaNavegacao;
let rotaAtual = [];
let indiceAtual = 0;
let watchId;

function iniciarNavegacao(rota) {
    rotaAtual = rota;
    indiceAtual = 0;
    // Esconder app principal e mostrar tela de navegação (criar div se não existir)
    let telaNav = document.getElementById('tela-navegacao');
    if (!telaNav) {
        telaNav = document.createElement('div');
        telaNav.id = 'tela-navegacao';
        telaNav.style.display = 'block';
        telaNav.style.position = 'fixed';
        telaNav.style.top = '0';
        telaNav.style.left = '0';
        telaNav.style.width = '100%';
        telaNav.style.height = '100%';
        telaNav.style.zIndex = '500';
        telaNav.style.backgroundColor = 'white';
        telaNav.innerHTML = `
            <div id="mapa-navegacao" style="height:70vh;"></div>
            <div id="instrucao" style="padding:1rem; font-size:1.2rem;"></div>
            <button id="btn-concluir" class="btn-primario" style="margin:0 auto; display:block;">Concluir Parada</button>
        `;
        document.body.appendChild(telaNav);
        document.getElementById('btn-concluir').addEventListener('click', concluirParada);
    }
    telaNav.style.display = 'block';
    document.getElementById('app').style.display = 'none';

    if (!mapaNavegacao) {
        mapaNavegacao = L.map('mapa-navegacao').setView([rota[0].lat, rota[0].lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapaNavegacao);
    } else {
        // Limpar overlays antigos
        mapaNavegacao.eachLayer(layer => {
            if (layer instanceof L.Polyline || layer instanceof L.Marker) {
                mapaNavegacao.removeLayer(layer);
            }
        });
        mapaNavegacao.setView([rota[0].lat, rota[0].lng], 15);
    }

    // Desenhar rota
    const pontos = rota.map(c => [c.lat, c.lng]);
    L.polyline(pontos, { color: 'blue' }).addTo(mapaNavegacao);

    // Monitorar posição
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(pos => {
            const { latitude, longitude } = pos.coords;
            L.marker([latitude, longitude]).addTo(mapaNavegacao);
            mapaNavegacao.setView([latitude, longitude], 15);
            if (indiceAtual < rotaAtual.length) {
                const dist = calcularDistancia(latitude, longitude, rotaAtual[indiceAtual].lat, rotaAtual[indiceAtual].lng);
                if (dist < 0.05) {
                    document.getElementById('instrucao').textContent = `Chegou em ${rotaAtual[indiceAtual].nome}`;
                } else {
                    document.getElementById('instrucao').textContent = `Siga para ${rotaAtual[indiceAtual].nome} (${dist.toFixed(2)} km)`;
                }
            }
        }, null, { enableHighAccuracy: true });
    }
}

function concluirParada() {
    indiceAtual++;
    if (indiceAtual >= rotaAtual.length) {
        // Salvar rota concluída
        const rotaInfo = {
            data: new Date().toLocaleDateString(),
            numero: 'Rota ' + new Date().toLocaleTimeString(),
            clientes: rotaAtual,
            motoristaUid: auth.currentUser.uid
        };
        salvarRotaConcluida(rotaInfo).then(() => {
            alert('Rota concluída!');
            if (watchId) navigator.geolocation.clearWatch(watchId);
            document.getElementById('tela-navegacao').style.display = 'none';
            document.getElementById('app').style.display = 'flex';
            carregarHistorico();
        });
    } else {
        if (confirm('Iniciar próxima parada?')) {
            const proximo = rotaAtual[indiceAtual];
            document.getElementById('instrucao').textContent = `Próxima parada: ${proximo.nome}`;
            mapaNavegacao.setView([proximo.lat, proximo.lng], 15);
        }
    }
}
