// js/storage.js
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