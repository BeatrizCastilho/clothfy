const lista = document.getElementById("listaProdutos");
const quantidade = document.getElementById("quantidade");
const precoTotal = document.getElementById("precoTotal");

// Seletores do Modal Pix
const modalPix = document.getElementById("modalPix");
const modalPreco = document.getElementById("modalPreco");
const btnFinalizar = document.getElementById("finalizar");
const btnAvancarEnvio = document.getElementById("btnAvancarEnvio");

let carrinho = JSON.parse(localStorage.getItem("clothfyCart")) || [];

function carregar() {
    lista.innerHTML = "";
    let valorTotalAcumulado = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = `<p style="color: #666; padding: 20px;">Seu carrinho está vazio.</p>`;
        quantidade.textContent = "0 itens";
        precoTotal.textContent = "Total: R$ 0,00";
        return;
    }

    carrinho.forEach((produto, index) => {
        // Incrementa o preço total com o valor definido no personalizador
        valorTotalAcumulado += produto.preco;

        // Renderiza cada produto respeitando o layout limpo e adicionando o botão de lixeira
        lista.innerHTML += `
            <div class="carrinho-item" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border-bottom: 1px solid #222;">
                <div>
                    <h3 style="margin: 0; color: #fff;">${produto.nome}</h3>
                    <p style="margin: 5px 0 0 0; color: #666; font-size: 0.85rem;">
                        Estampa: <strong>"${produto.texto}"</strong> | Modelo: ${produto.corte.toUpperCase()}
                    </p>
                </div>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <span style="font-weight: bold; color: #fff;">R$ ${produto.preco.toFixed(2).replace('.', ',')}</span>
                    <button class="btn-remover" onclick="removerProduto(${index})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    });

    // Atualiza o resumo lateral do seu layout
    quantidade.textContent = `${carrinho.length} ${carrinho.length === 1 ? 'item' : 'itens'}`;
    precoTotal.textContent = `Total: R$ ${valorTotalAcumulado.toFixed(2).replace('.', ',')}`;
    
    // Atualiza o valor dentro do Modal de pagamento
    modalPreco.textContent = `Total: R$ ${valorTotalAcumulado.toFixed(2).replace('.', ',')}`;
}

// Função para remover um produto quando clicar na lixeira
window.removerProduto = function(index) {
    carrinho.splice(index, 1);
    localStorage.setItem("clothfyCart", JSON.stringify(carrinho));
    carregar();
};

// Executa o carregamento inicial da página
carregar();

// Ação do seu botão "Finalizar Compra"
btnFinalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio! Adicione uma peça no personalizador primeiro.");
        return;
    }
    // Abre a tela do QR Code na frente de tudo
    modalPix.style.display = "flex";
});

// Ação do botão dentro do Modal para seguir para o envio
btnAvancarEnvio.addEventListener("click", () => {
    // Redireciona diretamente para a sua página de envio
    // Certifique-se de que o nome do seu arquivo seja exatamente "envio.html"
    window.location.href = "envio.html";
});

// Ação do botão dentro do Modal para seguir para o envio
btnAvancarEnvio.addEventListener("click", () => {
    // Redireciona diretamente para a sua página de envio
    window.location.href = "envio.html"; // <-- Mude aqui o nome da página!
});