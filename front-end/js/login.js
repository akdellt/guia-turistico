document.addEventListener("DOMContentLoaded", () => {
    // LOGIN
    document.getElementById("login-form").addEventListener("submit", async function (e) {
        e.preventDefault();

        showLoading();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const response = await fetch("https://guia-turistico-cdp3.onrender.com/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                // SALVA TOKEN
                localStorage.setItem("token", data.token);
                // REDIRECIONA PARA PÁGINA INICIAL
                window.location.href = "../../index.html";
            } else {
                alert(data.msg);
            }
        } catch (error) {
            alert("Erro ao se conectar com a API");
        } finally {
            hideLoading();
        }
    });

    // BOTÃO DE REGISTRAR
    const registrar = document.getElementById('registrar-button');
    if (registrar) {
        registrar.addEventListener('click', () => {
            window.location.href = '../../paginas/usuario/registrar.html';
        });
    }
});
