// ==========================================
// PROTEÇÃO DE LOGIN
// ==========================================

const usuarioLogado = localStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    alert("Faça login para personalizar produtos.");
    window.location.href = "login.html";
}



// Seletores Globais do Canvas
const mockupBase = document.getElementById("mockup-base");
const shapeContainer = document.getElementById("clothing-shape-container");
const renderIcon = document.getElementById("render-icon");
const renderText = document.getElementById("render-text");

// Inputs de Texto/Estilo
const textInput = document.getElementById("text-input");
const fontSelector = document.getElementById("font-selector");
const textColorPicker = document.getElementById("text-color-picker");
const iconColorPicker = document.getElementById("icon-color-picker");

// Sliders de Movimentação e Dimensão
const sizeText = document.getElementById("size-text");
const xText = document.getElementById("x-text");
const yText = document.getElementById("y-text");
const rotText = document.getElementById("rot-text");

const sizeIcon = document.getElementById("size-icon");
const xIcon = document.getElementById("x-icon");
const yIcon = document.getElementById("y-icon");
const rotIcon = document.getElementById("rot-icon");

// Vetores SVG em código puro para simular perfeitamente as silhuetas de moda sem usar imagens externas!
const svgsRoupa = {
    moletom: `<svg viewBox="0 0 100 100" fill="currentColor" style="width:90%; height:90%; opacity:0.15;"><path d="M30,20 Q50,5 70,20 L85,35 Q88,38 82,45 L75,40 L78,85 Q78,90 73,90 L27,90 Q22,90 22,85 L25,40 L18,45 Q12,38 15,35 Z M50,22 Q50,35 38,35 M50,22 Q50,35 62,35 M32,65 L68,65 L65,85 L35,85 Z"/></svg>`,
    camiseta: `<svg viewBox="0 0 100 100" fill="currentColor" style="width:85%; height:85%; opacity:0.15;"><path d="M30,15 Q50,8 70,15 L90,25 L82,42 L74,38 L74,85 Q74,90 69,90 L31,90 Q26,90 26,85 L26,38 L18,42 L10,25 Z"/></svg>`,
    jaqueta: `<svg viewBox="0 0 100 100" fill="currentColor" style="width:92%; height:92%; opacity:0.15;"><path d="M30,15 L50,28 L70,15 L88,28 L80,85 L20,85 L12,28 Z M50,28 L50,85 M35,35 L45,35 L45,75 L35,75 Z M65,35 L55,35 L55,75 L65,75 Z"/></svg>`,
    shorts: `<svg viewBox="0 0 100 100" fill="currentColor" style="width:75%; height:75%; opacity:0.15;"><path d="M20,15 L80,15 L85,65 L52,68 L50,45 L48,68 L15,65 Z M30,15 L30,45 M70,15 L70,45"/></svg>`
};

// Objeto do Produto
let produtoEstudio = {
    nome: "Hoodie Heavyweight Custom",
    corte: "moletom",
    corTecido: "#0A192F",
    texto: "ENZO REIS DE MORAE",
    fonteTexto: "'Sedgwick Ave Display', cursive",
    corTexto: "#EAE6DF",
    tamanhoTxt: "2.0rem",
    posXTxt: "0px",
    posYTxt: "50px",
    rotTxt: "0deg",
    icone: "fa-spider",
    corIcone: "#D4AF37",
    tamanhoIco: "4rem",
    posXIco: "50px",
    posYIco: "-20px",
    rotIco: "0deg",
    preco: 249.90
};

// Injeta o molde padrão inicial
shapeContainer.innerHTML = svgsRoupa.moletom;

function mudarMolde(corte, elemento) {
    document.querySelectorAll('.item-selector .grid-btn').forEach(b => b.classList.remove('active'));
    elemento.classList.add('active');
    
    produtoEstudio.corte = corte;
    shapeContainer.innerHTML = svgsRoupa[corte];

    // Ajustes de proporção da caixa de preview baseados na peça selecionada
    if(corte === 'moletom') { 
        produtoEstudio.nome = "Hoodie Heavyweight Custom"; 
        produtoEstudio.preco = 269.90;
        mockupBase.style.height = "520px";
        mockupBase.style.borderRadius = "24px";
    }
    if(corte === 'camiseta') { 
        produtoEstudio.nome = "Camiseta Boxy Custom"; 
        produtoEstudio.preco = 149.90;
        mockupBase.style.height = "490px";
        mockupBase.style.borderRadius = "14px";
    }
    if(corte === 'jaqueta') { 
        produtoEstudio.nome = "Jacket Denim Street Custom"; 
        produtoEstudio.preco = 319.90;
        mockupBase.style.height = "540px";
        mockupBase.style.borderRadius = "20px";
    }
    if(corte === 'shorts') { 
        produtoEstudio.nome = "Shorts Street Cargo Custom"; 
        produtoEstudio.preco = 129.90;
        mockupBase.style.height = "380px"; // Encolhe para simular bermuda
        mockupBase.style.borderRadius = "8px";
    }
}

function mudarCor(hex, elemento) {
    document.querySelectorAll('.colors-flex .color-circle').forEach(c => c.classList.remove('active'));
    elemento.classList.add('active');
    produtoEstudio.corTecido = hex;
    mockupBase.style.backgroundColor = hex;
}

function mudarIcone(classeIcone, elemento) {
    elemento.parentElement.querySelectorAll('.grid-btn').forEach(b => b.classList.remove('active'));
    elemento.classList.add('active');
    produtoEstudio.icone = classeIcone;
    renderIcon.className = `fas ${classeIcone}`;
}

// Escuta em tempo real dos inputs e seletores de cores
textInput.addEventListener("input", (e) => {
    renderText.textContent = e.target.value.toUpperCase();
    produtoEstudio.texto = e.target.value.toUpperCase();
});
fontSelector.addEventListener("change", (e) => {
    renderText.style.fontFamily = e.target.value;
    produtoEstudio.fonteTexto = e.target.value;
});
textColorPicker.addEventListener("input", (e) => {
    renderText.style.color = e.target.value;
    produtoEstudio.corTexto = e.target.value;
});
iconColorPicker.addEventListener("input", (e) => {
    renderIcon.style.color = e.target.value;
    produtoEstudio.corIcone = e.target.value;
});

// Funções de Transformação dos Sliders X, Y e Rotação
function atualizarEstiloTexto() {
    renderText.style.fontSize = sizeText.value + "rem";
    renderText.style.left = `calc(50% + ${xText.value}px)`;
    renderText.style.top = `calc(50% + ${yText.value}px)`;
    renderText.style.transform = `translate(-50%, -50%) rotate(${rotText.value}deg)`;
    
    document.getElementById("lbl-size-text").textContent = sizeText.value + "rem";
    document.getElementById("lbl-x-text").textContent = xText.value + "px";
    document.getElementById("lbl-y-text").textContent = yText.value + "px";
    document.getElementById("lbl-rot-text").textContent = rotText.value + "°";

    produtoEstudio.tamanhoTxt = sizeText.value + "rem";
    produtoEstudio.posXTxt = xText.value + "px";
    produtoEstudio.posYTxt = yText.value + "px";
    produtoEstudio.rotTxt = rotText.value + "deg";
}

function atualizarEstiloIcone() {
    renderIcon.style.fontSize = sizeIcon.value + "rem";
    renderIcon.style.left = `calc(50% + ${xIcon.value}px)`;
    renderIcon.style.top = `calc(50% + ${yIcon.value}px)`;
    renderIcon.style.transform = `translate(-50%, -50%) rotate(${rotIcon.value}deg)`;
    
    document.getElementById("lbl-size-icon").textContent = sizeIcon.value + "rem";
    document.getElementById("lbl-x-icon").textContent = xIcon.value + "px";
    document.getElementById("lbl-y-icon").textContent = yIcon.value + "px";
    document.getElementById("lbl-rot-icon").textContent = rotIcon.value + "°";

    produtoEstudio.tamanhoIco = sizeIcon.value + "rem";
    produtoEstudio.posXIco = xIcon.value + "px";
    produtoEstudio.posYIco = yIcon.value + "px";
    produtoEstudio.rotIco = rotIcon.value + "deg";
}

// Ouvintes de eventos nos Sliders
[sizeText, xText, yText, rotText].forEach(input => input.addEventListener("input", atualizarEstiloTexto));
[sizeIcon, xIcon, yIcon, rotIcon].forEach(input => input.addEventListener("input", atualizarEstiloIcone));

// Define cores iniciais sincronizadas com o HTML na montagem da página
renderText.style.color = textColorPicker.value;
renderIcon.style.color = iconColorPicker.value;
atualizarEstiloTexto();
atualizarEstiloIcone();

function adicionarAoCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem("clothfyCart")) || [];
    carrinho.push({ ...produtoEstudio, id: Date.now() });
    localStorage.setItem("clothfyCart", JSON.stringify(carrinho));
    alert("🔥 Sua peça customizada Clothfy foi enviada ao carrinho!");
    window.location.href = "carrinho.html";
}
