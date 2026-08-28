function capturarFoto() {
    document.getElementById('input-foto').click();
}

document.getElementById('input-foto').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await Tesseract.recognize(file, 'por', { logger: m => console.log(m) });
    const texto = result.data.text;
    // Parse do texto para extrair dados (exemplo simples)
    const numero = extrairNumeroRomaneio(texto);
    if (numero) buscarRomaneio(numero);
});

function extrairNumeroRomaneio(texto) {
    const match = texto.match(/Romaneio[:\s]*([A-Z0-9\-]+)/i);
    return match ? match[1] : null;
}