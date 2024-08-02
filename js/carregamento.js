function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading", "centralizar");

    const span = document.createElement("span");
    span.classList.add("loading-icon");
    div.appendChild(span);

    document.body.appendChild(div);
}

function hideLoading() {
    const loadings = document.getElementsByClassName("loading")
    if (loadings.length) {
        loadings[0].remove();
    }
}