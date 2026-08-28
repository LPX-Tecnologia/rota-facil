document.getElementById('input-foto-perfil').addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
        const fotoBase64 = ev.target.result;
        await db.collection('usuarios').doc(auth.currentUser.uid).update({
            foto: fotoBase64
        });
        usuarioAtual.foto = fotoBase64;
        carregarFotoPerfil();
        alert('Foto atualizada!');
    };
    reader.readAsDataURL(file);
});

function carregarFotoPerfil() {
    const foto = usuarioAtual.foto || 'https://ui-avatars.com/api/?name=Usuário&background=1a73e8&color=fff';
    document.getElementById('foto-perfil-topo').src = foto;
    document.getElementById('foto-perfil').src = foto;
    document.getElementById('perfil-nome').value = usuarioAtual.nome || '';
    document.getElementById('perfil-email').value = usuarioAtual.email || '';
}

async function editarPerfil() {
    const nomeInput = document.getElementById('perfil-nome');
    nomeInput.disabled = false;
    nomeInput.focus();
    nomeInput.addEventListener('blur', async () => {
        nomeInput.disabled = true;
        const novoNome = nomeInput.value;
        if (novoNome !== usuarioAtual.nome) {
            await db.collection('usuarios').doc(auth.currentUser.uid).update({
                nome: novoNome
            });
            usuarioAtual.nome = novoNome;
            alert('Nome atualizado!');
        }
    }, { once: true });
}
