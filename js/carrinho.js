// ==========================================
// PROTEÇÃO DE LOGIN
// ==========================================

const usuarioLogado = localStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    alert("Faça login para acessar o carrinho.");
    window.location.href = "login.html";
}

// ==========================================
// CARRINHO
// ==========================================

const lista = document.getElementById("listaProdutos");
const quantidade = document.getElementById("quantidade");
const precoTotal = document.getElementById("precoTotal");

const modalPix = document.getElementById("modalPix");
const modalPreco = document.getElementById("modalPreco");
const btnFinalizar = document.getElementById("finalizar");
const btnAvancarEnvio = document.getElementById("btnAvancarEnvio");

let carrinho = JSON.parse(localStorage.getItem("clothfyCart")) || [];

function carregar() {

    lista.innerHTML = "";

    let valorTotalAcumulado = 0;

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p style="color:#666;padding:20px;">
                Seu carrinho está vazio.
            </p>
        `;

        quantidade.textContent = "0 itens";
        precoTotal.textContent = "Total: R$ 0,00";
        modalPreco.textContent = "Total: R$ 0,00";

        return;
    }

    carrinho.forEach((produto, index) => {

        valorTotalAcumulado += Number(produto.preco);

        lista.innerHTML += `
            <div class="carrinho-item"
                 style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    padding:15px;
                    border-bottom:1px solid #222;
                 ">

                <div>

                    <h3 style="margin:0;color:#fff;">
                        ${produto.nome}
                    </h3>

                    <p style="
                        margin:5px 0 0;
                        color:#888;
                        font-size:.85rem;
                    ">
                        ${produto.texto || "Produto do catálogo"}
                    </p>

                </div>

                <div style="
                    display:flex;
                    align-items:center;
                    gap:20px;
                ">

                    <span style="
                        font-weight:bold;
                        color:#fff;
                    ">
                        R$ ${Number(produto.preco).toFixed(2).replace(".", ",")}
                    </span>

                    <button
                        class="btn-remover"
                        onclick="removerProduto(${index})"
                    >
                        <i class="fas fa-trash"></i>
                    </button>

                </div>

            </div>
        `;
    });

    quantidade.textContent =
        `${carrinho.length} ${carrinho.length === 1 ? "item" : "itens"}`;

    precoTotal.textContent =
        `Total: R$ ${valorTotalAcumulado.toFixed(2).replace(".", ",")}`;

    modalPreco.textContent =
        `Total: R$ ${valorTotalAcumulado.toFixed(2).replace(".", ",")}`;
}

window.removerProduto = function(index) {

    carrinho.splice(index, 1);

    localStorage.setItem(
        "clothfyCart",
        JSON.stringify(carrinho)
    );

    carregar();
};

carregar();

btnFinalizar.addEventListener("click", () => {

    if (carrinho.length === 0) {

        alert(
            "Seu carrinho está vazio! Adicione produtos primeiro."
        );

        return;
    }

    modalPix.style.display = "flex";
});

btnAvancarEnvio.addEventListener("click", () => {

    window.location.href = "envio.html";

});
