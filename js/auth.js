document.addEventListener("DOMContentLoaded", () => {
    const formCadastro = document.getElementById("form-cadastro");
    const formLogin = document.getElementById("form-login");

    // Lógica de Cadastro
    if (formCadastro) {
        formCadastro.addEventListener("submit", (e) => {
            e.preventDefault();
            const nome = document.getElementById("cad-nome").value;
            const email = document.getElementById("cad-email").value;
            const senha = document.getElementById("cad-senha").value;

            // Simula banco de dados pegando usuários já cadastrados
            let usuarios = JSON.parse(localStorage.getItem("usuariosClothfy")) || [];

            // Verifica se o email já existe
            if (usuarios.some(u => u.email === email)) {
                alert("❌ Este e-mail já está cadastrado!");
                return;
            }

            // Salva novo usuário
            usuarios.push({ nome, email, senha });
            localStorage.setItem("usuariosClothfy", JSON.stringify(usuarios));

            alert("✨ Conta criada com sucesso! Faça seu login.");
            window.location.href = "login.html";
        });
    }

    // Lógica de Login
    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("log-email").value;
            const senha = document.getElementById("log-senha").value;

            let usuarios = JSON.parse(localStorage.getItem("usuariosClothfy")) || [];

            // Procura usuário correspondente
            const usuarioValido = usuarios.find(u => u.email === email && u.senha === senha);

            if (usuarioValido) {
                localStorage.setItem("usuarioLogado", JSON.stringify({ nome: usuarioValido.nome, email: usuarioValido.email }));
                alert(`👋 Bem-vindo de volta, ${usuarioValido.nome.split(' ')[0]}!`);
                window.location.href = "index.html";
            } else {
                alert("❌ E-mail ou senha incorretos.");
            }
        });
    }

    // Atualizar Header dinamicamente em TODAS as páginas
    const usuarioLogado = JSON.parse(localStorage.getItem("usuarioLogado"));
    const nav = document.querySelector("nav, header ul");

    if (usuarioLogado && nav) {
        // Remove os links antigos de Login/Cadastro se o usuário estiver logado e adiciona o painel dele
        const linksAuth = nav.querySelectorAll("a[href='cadastro.html'], a[href='login.html']");
        linksAuth.forEach(link => link.remove());

        // Cria o display do usuário e o botão sair
        const userLi = document.createElement("li");
        userLi.innerHTML = `<span style="color: #7A3FF2; font-weight: bold; font-size: 0.95rem;">Olá, ${usuarioLogado.nome.split(' ')[0]}</span>`;
        
        const logoutLi = document.createElement("li");
        logoutLi.innerHTML = `<a href="#" id="btn-logout" style="color: #ff4a4a;"><i class="fas fa-sign-out-alt"></i> Sair</a>`;

        nav.appendChild(userLi);
        nav.appendChild(logoutLi);

        document.getElementById("btn-logout").addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("usuarioLogado");
            alert("Sessão encerrada.");
            window.location.href = "index.html";
        });
    }
});