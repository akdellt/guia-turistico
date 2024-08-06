document.addEventListener("DOMContentLoaded", () => {
    // VARIAVEIS
    const form = {
        nome: document.getElementById('nome'),
        nomeObrigatorio: document.getElementById('nome-obrigatorio'),
        sobrenome: document.getElementById('sobrenome'),
        sobrenomeObrigatorio: document.getElementById('sobrenome-obrigatorio'),
        email: document.getElementById('email'),
        emailInvalido: document.getElementById('email-invalido'),
        emailObrigatorio: document.getElementById('email-obrigatorio'),
        senha: document.getElementById('senha'),
        senhaObrigatoria: document.getElementById('senha-obrigatoria'),
        senhaMinima: document.getElementById('senha-minima'),
        confirmarSenha: document.getElementById('confirmar-senha'),
        senhaIgual: document.getElementById('senha-igual'),
        formularioRegistro: document.getElementById('registrar-form')
    };

    form.formularioRegistro.addEventListener('submit', async function(event) {
        event.preventDefault();

        // APAGA ERROS
        document.querySelectorAll('.erro').forEach(e => e.style.display = 'none');

        const nome = form.nome.value.trim();
        const sobrenome = form.sobrenome.value.trim();
        const email = form.email.value.trim();
        const senha = form.senha.value.trim();
        const confirmarSenha = form.confirmarSenha.value.trim();

        // VALIDAÇÃO
        let hasError = false;
        if (!nome) {
            form.nomeObrigatorio.style.display = 'block';
            hasError = true;
        }
        if (!sobrenome) {
            form.sobrenomeObrigatorio.style.display = 'block';
            hasError = true;
        }
        if (!email) {
            form.emailObrigatorio.style.display = 'block';
            hasError = true;
        } else if (!validateEmail(email)) {
            form.emailInvalido.style.display = 'block';
            hasError = true;
        }
        if (!senha) {
            form.senhaObrigatoria.style.display = 'block';
            hasError = true;
        } else if (senha.length < 6) {
            form.senhaMinima.style.display = 'block';
            hasError = true;
        }
        if (senha !== confirmarSenha) {
            form.senhaIgual.style.display = 'block';
            hasError = true;
        }

        if (hasError) return;

        showLoading();

        // ENVIA PARA API
        try {
            const response = await fetch('https://guia-turistico-cdp3.onrender.com/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, sobrenome, email, senha })
            });

            const data = await response.json();
            console.log(data); // Adicione esta linha para ver a resposta completa da API

            if (response.ok) {
                window.location.href = '../../login.html';
            } else {
                alert(data.msg || 'Erro ao registrar usuário');
            }
        } catch (error) {
            alert('Erro ao se conectar com a API');
        } finally {
            hideLoading();
        }
    });
});
