```javascript
const form = document.getElementById("cadastroForm");

form.addEventListener("submit",(e)=>{

e.preventDefault();

alert("Conta criada com sucesso!");

window.location.href="login.html";

});
```
