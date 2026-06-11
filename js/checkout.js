```javascript
const resumo =
document.getElementById(
"resumoPedido"
);

let carrinho =
JSON.parse(
localStorage.getItem(
"clothfyCart"
)
) || [];

carrinho.forEach(item=>{

resumo.innerHTML += `



`;

});

document
.getElementById("btnFinalizar")
.addEventListener("click",()=>{

alert(
"Pedido realizado com sucesso!"
);

localStorage.removeItem(
"clothfyCart"
);

window.location.href =
"index.html";

});
```
