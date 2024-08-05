document.getElementById("login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email, senha})
    });

    const data = await response.json();

    if (response.ok) {
        // SALVA TOKEN
        localStorage.setItem("token", data.token);
        showLoading();
        // REDIRECIONA PARA PÁGINA INICIAL
        window.location.href = "../../index.html";
    } else {
        alert(data.msg);
    }
});