// Referências aos formulários
const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

// Funções para alternar telas
function mostrarLogin() {
    document.getElementById('tela-login').classList.add('ativa');
    document.getElementById('tela-cadastro').classList.remove('ativa');
    document.getElementById('app').style.display = 'none';
}

function mostrarCadastro() {
    document.getElementById('tela-login').classList.remove('ativa');
    document.getElementById('tela-cadastro').classList.add('ativa');
    document.getElementById('app').style.display = 'none';
}

// Evento de cadastro
formCadastro.addEventListener('submit', async (e) => {
    e.preventDefault();
    const nome = document.getElementById('cad-nome').value;
    const email = document.getElementById('cad-email').value;
    const senha = document.getElementById('cad-senha').value;
    const confirmar = document.getElementById('cad-confirmar').value;

    if (senha !== confirmar) {
        alert('Senhas não conferem!');
        return;
    }

    try {
        const cred = await auth.createUserWithEmailAndPassword(email, senha);
        await db.collection('usuarios').doc(cred.user.uid).set({
            nome: nome,
            email: email,
            foto: null,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert('Cadastro realizado com sucesso!');
        // O onAuthStateChanged cuidará da navegação
    } catch (error) {
        console.error('Erro no cadastro:', error);
        alert('Erro ao cadastrar: ' + error.message);
    }
});

// Evento de login
formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    try {
        await auth.signInWithEmailAndPassword(email, senha);
        // O onAuthStateChanged cuidará da navegação
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao entrar: ' + error.message);
    }
});

// Observador de estado de autenticação
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Usuário logado
        const doc = await db.collection('usuarios').doc(user.uid).get();
        if (doc.exists) {
            usuarioAtual = {
                uid: user.uid,
                email: user.email,
                nome: doc.data().nome,
                foto: doc.data().foto
            };
        } else {
            usuarioAtual = {
                uid: user.uid,
                email: user.email,
                nome: '',
                foto: null
            };
        }
        entrarApp();
    } else {
        usuarioAtual = null;
        mostrarLogin();
    }
});

// Função de logout
async function logout() {
    try {
        await auth.signOut();
        // O onAuthStateChanged atualizará a interface
    } catch (error) {
        console.error('Erro ao sair:', error);
    }
}
