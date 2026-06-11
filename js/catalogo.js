document.addEventListener("DOMContentLoaded", () => {
    const produtosCards = document.querySelectorAll(".produto");

    produtosCards.forEach(card => {
        const btn = card.querySelector("button");
        const titulo = card.querySelector("h3").textContent;
        const precoTexto = card.querySelector("p").textContent;
        const imagemSrc = card.querySelector("img").getAttribute("src");

        // Tratamento simples para converter o texto "R$ 149,90" em número real float (149.90)
        const precoNumerico = parseFloat(precoTexto.replace("R$", "").replace(",", ".").trim());

        // Altera o comportamento do botão para salvar o item do catálogo diretamente
        btn.textContent = "Comprar / Customizar";
        btn.addEventListener("click", () => {
            let carrinho = JSON.parse(localStorage.getItem("clothfyCart")) || [];
            
            carrinho.push({
                id: Date.now(),
                nome: titulo,
                preco: precoNumerico,
                imagemMock: imagemSrc
            });

            localStorage.setItem("clothfyCart", JSON.stringify(carrinho));
            alert(`🛍️ "${titulo}" foi adicionado ao seu carrinho! Redirecionando para finalização.`);
            window.location.href = "carrinho.html";
        });
    });
});