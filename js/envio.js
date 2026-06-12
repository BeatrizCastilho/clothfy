// ==========================================
// PROTEÇÃO DE LOGIN
// ==========================================

const usuarioLogado = localStorage.getItem("usuarioLogado");

if (!usuarioLogado) {
    alert("Faça login para acessar esta página.");
    window.location.href = "login.html";
}


window.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. GERENCIAMENTO DA NOTIFICAÇÃO (URL PARAMS + LOCALSTORAGE)
    // ==========================================
    const notificacao = document.getElementById('notificacao-rastreio');
    const btnFecharNotif = document.getElementById('btn-fechar-notificacao');

    // Lê os parâmetros da URL para identificar se veio de um redirecionamento de envio
    const urlParams = new URLSearchParams(window.location.search);
    const envioSucesso = urlParams.get('envio');

    // Se o parâmetro existir na URL, força a gravação estável e exibe
    if (envioSucesso === 'sucesso') {
        localStorage.setItem('envioAtivo', 'true');
    }

    // Exibe a notificação se o estado ativo for verdadeiro
    if (localStorage.getItem('envioAtivo') === 'true') {
        notificacao.classList.remove('hidden');
    }

    // Evento para fechar a notificação e limpar o status
    if (btnFecharNotif) {
        btnFecharNotif.addEventListener('click', () => {
            notificacao.classList.add('hidden');
            localStorage.removeItem('envioAtivo');
            
            // Limpa o parâmetro da URL de forma elegante sem recarregar a tela
            const novaUrl = window.location.pathname;
            window.history.replaceState({}, document.title, novaUrl);
        });
    }

    // Botão estrutural limpa o status se o usuário quiser resetar manualmente
    document.getElementById('btn-voltar-home').addEventListener('click', () => {
        localStorage.removeItem('envioAtivo');
    });


    // ==========================================
    // 2. INICIALIZAÇÃO E CONFIGURAÇÃO DO MAPA
    // ==========================================
    const centroMapa = [-23.55052, -46.633308]; 
    const map = L.map('map').setView(centroMapa, 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const unidadesLoja = [
        {
            nome: "Centro de Distribuição Principal",
            coords: [-23.55052, -46.633308],
            info: "<strong style='color: #B594F0;'>CD São Paulo Centro</strong><br>Prazo de postagem reduzido para a capital.<br>Retiradas indisponíveis no local."
        },
        {
            nome: "Filial Express - Zona Sul",
            coords: [-23.6182, -46.6632],
            info: "<strong style='color: #B594F0;'>Loja/CD Zona Sul</strong><br>Disponível para retirada em até 3h após aprovação.<br>Funcionamento: Seg a Sex, 09h às 18h."
        }
    ];

    unidadesLoja.forEach(unidade => {
        L.marker(unidade.coords)
            .addTo(map)
            .bindPopup(unidade.info);
    });

    // Corrige renderização assíncrona do contêiner do mapa
    setTimeout(() => {
        map.invalidateSize();
    }, 250);


    // ==========================================
    // 3. SIMULADOR DE FRETE & MÁSCARA DO CEP
    // ==========================================
    const cepInput = document.getElementById('cep');
    const btnCalcular = document.getElementById('btn-calcular');
    const resultadoDiv = document.getElementById('resultado-frete');

    cepInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 5) {
            value = value.replace(/^(\d{5})(\d)/, "$1-$2");
        }
        e.target.value = value;
    });

    btnCalcular.addEventListener('click', () => {
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            alert("Por favor, introduza um CEP válido com 8 dígitos.");
            return;
        }

        resultadoDiv.classList.remove('hidden');
        resultadoDiv.innerHTML = "<p style='color: var(--text-light);'>A calcular rotas de entrega...</p>";

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (data.erro) {
                    resultadoDiv.innerHTML = "<p style='color: #ef4444;'>CEP não encontrado. Verifique os dígitos.</p>";
                    return;
                }

                const estado = data.uf;
                const cidade = data.localidade;
                let opcoesHtml = `<h3 style='font-size: 1rem; margin-bottom: 0.8rem; color: var(--primary-color);'>Opções para ${cidade} - ${estado}:</h3>`;

                if (estado === "SP") {
                    opcoesHtml += `
                        <div class="opcao-frete">
                            <span><strong>Expresso (Motoboy):</strong> 1 dia útil</span>
                            <span>R$ 12,00</span>
                        </div>
                        <div class="opcao-frete gratis">
                            <span><strong>Padrão:</strong> 2 a 4 dias úteis</span>
                            <span>GRÁTIS</span>
                        </div>
                    `;
                } else if (["RJ", "MG", "ES"].includes(estado)) {
                    opcoesHtml += `
                        <div class="opcao-frete">
                            <span><strong>Transportadora:</strong> 4 a 6 dias úteis</span>
                            <span>R$ 18,90</span>
                        </div>
                        <div class="opcao-frete">
                            <span><strong>Económico:</strong> 6 a 9 dias úteis</span>
                            <span>R$ 11,50</span>
                        </div>
                    `;
                } else {
                    opcoesHtml += `
                        <div class="opcao-frete">
                            <span><strong>Envio Nacional:</strong> 7 a 12 dias úteis</span>
                            <span>R$ 29,90</span>
                        </div>
                    `;
                }

                resultadoDiv.innerHTML = opcoesHtml;
            })
            .catch(error => {
                resultadoDiv.innerHTML = "<p style='color: #ef4444;'>Erro ao calcular o frete. Tente novamente.</p>";
                console.error(error);
            });
    });


    // ==========================================
    // 4. DISPARADOR DO ENVIO COM LOADING E REDIRECIONAMENTO
    // ==========================================
    const btnEnviar = document.getElementById('btn-enviar');
    const loadingOverlay = document.getElementById('loading-overlay');

    btnEnviar.addEventListener('click', () => {
        const cep = cepInput.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            alert("Por favor, insira primeiro um CEP válido para poder realizar o envio.");
            return;
        }

        // 1. Mostra o overlay de carregamento com o círculo girando
        loadingOverlay.classList.remove('hidden');

        // 2. Aguarda 2.5 segundos fingindo a postagem logística
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
            
            // 3. Salva o estado ativo no localStorage por segurança
            localStorage.setItem('envioAtivo', 'true');
            
            // 4. Redireciona injetando a flag na URL para capturar em qualquer navegador ou pasta local
            window.location.href = "index.html?envio=sucesso"; 
        }, 2500);
    });
});
