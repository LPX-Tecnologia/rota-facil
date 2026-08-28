// Cadastro
document.getElementById('form-cadastro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;
    const confirmar = document.getElementById('cad-confirmar').value;

    if (senha !== confirmar) {
        alert('Senhas não conferem!');
        return;
    }

    const usuarioExistente = await obterUsuario(email);
    if (usuarioExistente) {
        alert('E-mail já cadastrado!');
        return;
    }

    const usuario = { nome, email, senha, foto: null };
    await salvarUsuario(usuario);
    await salvarSessao(email);
    entrarApp();
});

// Login
document.getElementById('form-login').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    const usuario = await obterUsuario(email);
    if (!usuario || usuario.senha !== senha) {
        alert('Credenciais inválidas!');
        return;
    }

    await salvarSessao(email);
    entrarApp();
});

function mostrarLogin() {
    document.getElementById('tela-cadastro').classList.remove('ativa');
    document.getElementById('tela-login').classList.add('ativa');
}

function mostrarCadastro() {
    document.getElementById('tela-login').classList.remove('ativa');
    document.getElementById('tela-cadastro').classList.add('ativa');
}

async function logout() {
    await limparSessao();
    location.reload();
}
