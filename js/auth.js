// auth.js
const formLogin = document.getElementById('form-login');
const formCadastro = document.getElementById('form-cadastro');

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
        alert('Cadastro realizado!');
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    try {
        await auth.signInWithEmailAndPassword(email, senha);
    } catch (error) {
        alert('Erro: ' + error.message);
    }
});

// Observador de autenticação
auth.onAuthStateChanged(async (user) => {
    if (user) {
        // Buscar dados extras no Firestore
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

async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        console.error(error);
    }
}
