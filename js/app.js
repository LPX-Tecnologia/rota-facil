
let usuarioAtual = null;

// A inicialização agora é feita pelo onAuthStateChanged no auth.js
// Não é necessário o DOMContentLoaded para verificar sessão.
// O onAuthStateChanged é chamado automaticamente após a inicialização.

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

// ... (restante do código)

let usuarioAtual = null;

document.addEventListener('DOMContentLoaded', async () => {
    const email = await obterSessao();
    if (email) {
        usuarioAtual = await obterUsuario(email);
        if (usuarioAtual) {
            entrarApp();
        }
    }
});

function entrarApp() {
    document.getElementById('tela-login').classList.remove('ativa');
    document.getElementById('tela-cadastro').classList.remove('ativa');
    document.getElementById('app').style.display = 'flex';
    document.getElementById('nome-motorista').textContent = usuarioAtual.nome.split(' ')[0];
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
    // Contar romaneios pendentes e concluídos hoje
    // Implementação simplificada
}
