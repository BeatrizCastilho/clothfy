const botoes = document.querySelectorAll("button");

botoes.forEach(botao => {

botao.addEventListener("click", () => {

const produto =
botao.parentElement.querySelector("h3").innerText;

window.location.href =
`personalizar.html?produto=${encodeURIComponent(produto)}`;

});

});
