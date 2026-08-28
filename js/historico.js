async function carregarHistorico() {
    const rotas = await listarRotasConcluidas();
    const container = document.getElementById('lista-historico');
    container.innerHTML = '';
    rotas.forEach(rota => {
        const div = document.createElement('div');
        div.className = 'historico-item';
        div.innerHTML = `
            <span>${rota.data}</span>
            <span>${rota.numero}</span>
            <span>${rota.clientes.length} paradas</span>
        `;
        container.appendChild(div);
    });
}

async function compartilharHistorico() {
    const rotas = await listarRotasConcluidas();
    if (rotas.length === 0) {
        alert('Nenhuma rota concluída hoje.');
        return;
    }
    let texto = 'Rotas concluídas hoje:\n';
    rotas.forEach(rota => {
        texto += `\nRomaneio ${rota.numero} - ${rota.clientes.length} paradas`;
    });
    if (navigator.share) {
        try {
            await navigator.share({ title: 'Rotas Concluídas', text: texto });
        } catch (err) {
            console.log('Compartilhamento cancelado');
        }
    } else {
        // Fallback: copiar para área de transferência
        await navigator.clipboard.writeText(texto);
        alert('Resumo copiado para a área de transferência!');
    }
}
