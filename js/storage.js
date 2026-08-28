// Instâncias localForage
const usuariosDB = localforage.createInstance({ name: "rotafacil", storeName: "usuarios" });
const romaneioDB = localforage.createInstance({ name: "rotafacil", storeName: "romaneios" });
const rotasDB = localforage.createInstance({ name: "rotafacil", storeName: "rotas" });
const sessaoDB = localforage.createInstance({ name: "rotafacil", storeName: "sessao" });

// Usuários
async function salvarUsuario(usuario) {
    await usuariosDB.setItem(usuario.email, usuario);
}

async function obterUsuario(email) {
    return await usuariosDB.getItem(email);
}

// Sessão
async function salvarSessao(email) {
    await sessaoDB.setItem('usuarioAtual', email);
}

async function obterSessao() {
    return await sessaoDB.getItem('usuarioAtual');
}

async function limparSessao() {
    await sessaoDB.removeItem('usuarioAtual');
}

// Romaneios
async function salvarRomaneio(romaneio) {
    await romaneioDB.setItem(romaneio.numero, romaneio);
}

async function obterRomaneio(numero) {
    return await romaneioDB.getItem(numero);
}

async function listarRomaneios() {
    const romaneios = [];
    await romaneioDB.iterate((value) => romaneios.push(value));
    return romaneios;
}

// Rotas concluídas
async function salvarRotaConcluida(rota) {
    const id = Date.now().toString();
    await rotasDB.setItem(id, rota);
}

async function listarRotasConcluidas() {
    const rotas = [];
    await rotasDB.iterate((value) => rotas.push(value));
    return rotas;
}// js/storage.js
const romaneioDB = localforage.createInstance({
    name: "rotafacil",
    storeName: "romaneios"
});

async function salvarRomaneio(romaneio) {
    await romaneioDB.setItem(romaneio.numero, romaneio);
}

async function obterRomaneio(numero) {
    return await romaneioDB.getItem(numero);
}

async function listarRomaneios() {
    const romaneios = [];
    await romaneioDB.iterate((value, key) => {
        romaneios.push(value);
    });
    return romaneios;
}
