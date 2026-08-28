// Referências aos elementos do formulário (usar const, mas apenas uma vez)
const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

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
        const userCredential = await auth.createUserWithEmailAndPassword(email, senha);
        const user = userCredential.user;

        await db.collection('usuarios').doc(user.uid).set({
            nome: nome,
            email: email,
            foto: null,
            criadoEm: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert('Cadastro realizado com sucesso!');
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
    } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro ao entrar: ' + error.message);
    }
});

// Observador de estado de autenticação
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Usuário logado
        usuarioAtual = user;
        const doc = await db.collection('usuarios').doc(user.uid).get();
        if (doc.exists) {
            usuarioAtual.nome = doc.data().nome;
            usuarioAtual.foto = doc.data().foto;
        }
        entrarApp();
    } else {
        usuarioAtual = null;
        mostrarLogin();
    }
});

async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error('Erro ao sair:', error);
    }
}
