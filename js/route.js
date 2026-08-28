function abrirDialogoRota() {
    document.getElementById('dialogo-rota').classList.add('ativo');
}

function fecharDialogoRota() {
    document.getElementById('dialogo-rota').classList.remove('ativo');
}

async function escolherTipoRota(tipo) {
    fecharDialogoRota();
    const romaneios = await listarRomaneios();
    // Coletar todos os clientes não visitados
    const clientes = [];
    romaneios.forEach(rom => {
        if (rom.status !== 'concluido') {
            rom.clientes.forEach(cliente => clientes.push(cliente));
        }
    });
    if (clientes.length === 0) {
        alert('Nenhuma entrega pendente.');
        return;
    }
    gerarRota(clientes, tipo);
}

// A função gerarRota e executarRoteirizacao são semelhantes às anteriores, mas ao final chamam iniciarNavegacao
