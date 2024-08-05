// TELA DE CARREGAMENTO NO LOGIN/REGISTRO
function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading", "centralizar");

    const span = document.createElement("span");
    span.classList.add("loading-icon");
    div.appendChild(span);

    document.body.appendChild(div);
}
