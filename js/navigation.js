let mapaNavegacao;
let rotaAtual = [];
let indiceAtual = 0;
let watchId;

function iniciarNavegacao(rota) {
    rotaAtual = rota;
    indiceAtual = 0;
    // Esconder app principal e mostrar tela de navegação (precisa adicionar HTML)
    // Exibir mapa e instruções
    document.getElementById('app').style.display = 'none';
    document.getElementById('tela-navegacao').style.display = 'block';
    // Inicializar mapa se necessário...
    // Iniciar watchPosition...
}

function concluirParada() {
    // Marcar cliente como entregue, salvar rota concluída
    indiceAtual++;
    if (indiceAtual >= rotaAtual.length) {
        // Salvar rota concluída
        const rotaInfo = {
            data: new Date().toLocaleDateString(),
            numero: 'Rota ' + new Date().toLocaleTimeString(),
            clientes: rotaAtual
        };
        salvarRotaConcluida(rotaInfo);
        alert('Rota concluída!');
        // Voltar ao app
        document.getElementById('tela-navegacao').style.display = 'none';
        document.getElementById('app').style.display = 'flex';
        carregarHistorico();
    } else {
        if (confirm('Iniciar próxima parada?')) {
            // Atualizar instruções
        }
    }
}
