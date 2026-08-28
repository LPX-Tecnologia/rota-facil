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
                ${romaneio.clientes.map(cliente => `
                    <div class="cliente">
                        <strong>${cliente.nome}</strong> - ${cliente.endereco}
                        <ul>${cliente.itens.map(item => `<li>${item.descricao} (${item.quantidade})</li>`).join('')}</ul>
                    </div>
                `).join('')}
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