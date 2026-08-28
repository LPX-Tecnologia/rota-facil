// Funções para romaneios
async function salvarRomaneio(romaneio) {
    // Inclui o UID do motorista
    romaneio.motoristaUid = auth.currentUser.uid;
    await db.collection('romaneios').doc(romaneio.numero).set(romaneio);
}

async function obterRomaneio(numero) {
    const doc = await db.collection('romaneios').doc(numero).get();
    return doc.exists ? doc.data() : null;
}

async function listarRomaneios() {
    const snapshot = await db.collection('romaneios')
        .where('motoristaUid', '==', auth.currentUser.uid)
        .orderBy('dataEmissao', 'desc')
        .get();
    return snapshot.docs.map(doc => doc.data());
}

// Funções para rotas concluídas
async function salvarRotaConcluida(rota) {
    rota.motoristaUid = auth.currentUser.uid;
    await db.collection('rotas').add(rota);
}

async function listarRotasConcluidas() {
    const snapshot = await db.collection('rotas')
        .where('motoristaUid', '==', auth.currentUser.uid)
        .orderBy('data', 'desc')
        .get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
