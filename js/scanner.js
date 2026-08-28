let html5QrCode;

function iniciarScanner() {
    if (html5QrCode) {
        html5QrCode.stop().then(() => {
            html5QrCode.clear();
            html5QrCode = null;
            iniciarScanner();
        });
        return;
    }
    html5QrCode = new Html5Qrcode("reader");
    html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        onScanSuccess
    ).catch(err => console.error("Erro ao iniciar câmera:", err));
}

function onScanSuccess(decodedText) {
    html5QrCode.stop();
    buscarRomaneio(decodedText);
}

function buscarRomaneioManual() {
    const numero = document.getElementById('numero-manual').value;
    if (numero) buscarRomaneio(numero);
}

async function buscarRomaneio(numero) {
    // Tenta obter do Firestore; se não existir, cria um exemplo (para testes)
    let romaneio = await obterRomaneio(numero);
    if (!romaneio) {
        // Criar um romaneio de exemplo
        romaneio = {
            numero: numero,
            dataEmissao: Date.now(),
            status: 'pendente',
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

// Atualizar lista de romaneios na tela
async function atualizarLista() {
    const romaneios = await listarRomaneios();
    const container = document.getElementById('lista-romaneios');
    container.innerHTML = '';
    romaneios.forEach(romaneio => {
        const card = document.createElement('div');
        card.className = 'romaneio-card';
        card.innerHTML = `
            <div class="header" onclick="toggleDetalhes(this)">
                <span>${romaneio.numero}</span>
                <span class="arrow">▼</span>
            </div>
            <div class="detalhes" style="display:none">
                ${romaneio.clientes ? romaneio.clientes.map(cliente => `
                    <div class="cliente">
                        <strong>${cliente.nome}</strong> - ${cliente.endereco}
                        <ul>${cliente.itens ? cliente.itens.map(item => `<li>${item.descricao} (${item.quantidade})</li>`).join('') : ''}</ul>
                    </div>
                `).join('') : 'Sem clientes'}
            </div>
        `;
        container.appendChild(card);
    });
}

function toggleDetalhes(header) {
    const detalhes = header.nextElementSibling;
    detalhes.style.display = detalhes.style.display === 'none' ? 'block' : 'none';
    header.querySelector('.arrow').textContent = detalhes.style.display === 'none' ? '▼' : '▲';
}

// Iniciar scanner quando a tela scanner for aberta
document.addEventListener('click', function(e) {
    if (e.target.closest('[onclick*="mostrarTela(\'scanner\')"]')) {
        setTimeout(iniciarScanner, 100);
    }
});
