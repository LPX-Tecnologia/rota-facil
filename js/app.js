// app.js
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

function mostrarLogin() {
    document.getElementById('tela-login').classList.add('ativa');
    document.getElementById('tela-cadastro').classList.remove('ativa');
    document.getElementById('app').style.display = 'none';
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
    // Implemente a contagem real
}
