let html5QrCode;

function iniciarScanner() {
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        onScanSuccess
    ).catch(err => console.error("Erro ao iniciar câmera:", err));
}

function onScanSuccess(decodedText) {
    // decodedText é o número do romaneio
    html5QrCode.stop();
    buscarRomaneio(decodedText);
}

function buscarRomaneioManual() {
    const numero = document.getElementById('numero-manual').value;
    if (numero) buscarRomaneio(numero);
}

async function buscarRomaneio(numero) {
    // Aqui você pode consultar um banco de dados local ou API
    // Simulação: carregar dados de exemplo se não existir
    let romaneio = await obterRomaneio(numero);
    if (!romaneio) {
        // Criar um romaneio de exemplo (para testes)
        romaneio = {
            numero: numero,
            dataEmissao: Date.now(),
            clientes: [
                { nome: "Cliente A", endereco: "Rua X, 100", lat: -23.5505, lng: -46.6333, itens: [{ descricao: "Item 1", quantidade: 2 }] },
                { nome: "Cliente B", endereco: "Rua Y, 200", lat: -23.5510, lng: -46.6340, itens: [{ descricao: "Item 2", quantidade: 1 }] }
            ]
        };
        await salvarRomaneio(romaneio);
    }
    atualizarLista();
    mostrarTela('lista');
}