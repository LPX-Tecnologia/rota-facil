function entrarApp() {
    document.getElementById('tela-login').classList.remove('ativa');
    document.getElementById('tela-cadastro').classList.remove('ativa');
    document.getElementById('app').style.display = 'flex';
    document.getElementById('nome-motorista').textContent = usuarioAtual.nome ? usuarioAtual.nome.split(' ')[0] : '';
    carregarFotoPerfil();
    atualizarLista();
    atualizarResumo();
    carregarHistorico();
}

function mostrarTela(id) {
    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.getElementById('tela-' + id).classList.add('ativa');
    fecharMenu();
    if (id === 'mapa') {
        inicializarMapa();
        mostrarTodosClientesNoMapa();
    }
}

function toggleMenu() {
    document.getElementById('menu-lateral').classList.toggle('ativo');
}

function fecharMenu() {
    document.getElementById('menu-lateral').classList.remove('ativo');
}

function atualizarResumo() {
    // Contar romaneios pendentes e concluídos
    listarRomaneios().then(romaneios => {
        let pendentes = 0;
        romaneios.forEach(rom => {
            if (rom.status !== 'concluido') pendentes++;
        });
        document.getElementById('cont-pendentes').textContent = pendentes;
    });
    listarRotasConcluidas().then(rotas => {
        document.getElementById('cont-concluidos').textContent = rotas.length;
    });
}
