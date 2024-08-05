document.addEventListener("DOMContentLoaded", () => {
    const registrar = document.getElementById('registrar-button');
    registrar.addEventListener('click', () => {
        window.location.href = '../../paginas/usuario/registrar.html';
    });

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

        const nome = form.nome.value;
        const sobrenome = form.sobrenome.value;
        const email = form.email.value;
        const senha = form.senha.value;
        const confirmarSenha = form.confirmarSenha.value;

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

        // ENVIA PARA API
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, sobrenome, email, senha })
            });

            const data = await response.json();
            if (response.ok) {
                showLoading();
                window.location.href = '../../index.html';
            } else {
                alert(data.msg || 'Erro ao registrar usuário');
            }
        } catch (error) {
            alert('Erro ao se conectar com a API');
        }
    });
});
