const form = document.getElementById('loginForm');

form.addEventListener('submit',(e)=>{

e.preventDefault();

alert("Login realizado com sucesso!");

window.location.href="index.html";

});