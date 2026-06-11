// js/app.js
document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const userDisplay = document.getElementById("user-display");
    const authLink = document.getElementById("auth-link");

    if (usuarioLogado && userDisplay && authLink) {
        userDisplay.textContent = `Olá, ${usuarioLogado.nome.split(' ')[0]}`;
        authLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        authLink.href = "#";
        authLink.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogado");
            window.location.reload();
        });
    }
});