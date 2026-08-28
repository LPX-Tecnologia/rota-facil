// Funções para usuários
async function salvarUsuario(usuario) {
    // Não usada diretamente; o cadastro já salva no Firestore.
    // Mas podemos atualizar o documento do usuário logado.
    if (auth.currentUser) {
        await db.collection('usuarios').doc(auth.currentUser.uid).update(usuario);
    }
}

async function obterUsuario(uid) {
    const doc = await db.collection('usuarios').doc(uid).get();
    return doc.exists ? doc.data() : null;
}

// Funções para romaneios
async function salvarRomaneio(romaneio) {
    await db.collection('romaneios').doc(romaneio.numero).set(romaneio);
}

async function obterRomaneio(numero) {
    const doc = await db.collection('romaneios').doc(numero).get();
    return doc.exists ? doc.data() : null;
}

async function listarRomaneios() {
    const snapshot = await db.collection('romaneios').orderBy('dataEmissao', 'desc').get();
    return snapshot.docs.map(doc => doc.data());
}

// Funções para rotas concluídas
async function salvarRotaConcluida(rota) {
    await db.collection('rotas').add(rota);
}

async function listarRotasConcluidas() {
    const snapshot = await db.collection('rotas')
        .where('motoristaUid', '==', auth.currentUser.uid)
        .orderBy('data', 'desc')
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
