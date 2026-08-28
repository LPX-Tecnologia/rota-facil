document.getElementById('input-foto-perfil').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const fotoBase64 = ev.target.result;
        usuarioAtual.foto = fotoBase64;
        await salvarUsuario(usuarioAtual);
        carregarFotoPerfil();
    };
    reader.readAsDataURL(file);
});

function carregarFotoPerfil() {
    const foto = usuarioAtual.foto || 'img/avatar-placeholder.png';
    document.getElementById('foto-perfil-topo').src = foto;
    document.getElementById('foto-perfil').src = foto;
    document.getElementById('perfil-nome').value = usuarioAtual.nome;
    document.getElementById('perfil-email').value = usuarioAtual.email;
}

function editarPerfil() {
    // Permitir edição (desabilitar readonly) – implementação simples
    const nome = document.getElementById('perfil-nome');
    nome.disabled = false;
    nome.focus();
    nome.addEventListener('blur', async () => {
        usuarioAtual.nome = nome.value;
        await salvarUsuario(usuarioAtual);
        nome.disabled = true;
        alert('Nome atualizado!');
    });
}
