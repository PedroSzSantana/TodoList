const formulario = document.querySelector('form');

let login_user = 'adm';
let login_senha = '123';
const ExibeAcesso = ()=>{
    alert("User = 'adm', Senha = '123'")
}

formulario.addEventListener('submit', (evento)=>{
    evento.preventDefault();
    validacao();
    formulario.reset();
});
function validacao(){
    let email = formulario.querySelector('#email').value;
    let senha = formulario.querySelector('#senha').value;
    
    if(senha === login_senha && email === login_user){
        alert('Login realizado com sucesso');
        sessionStorage.setItem('Logado',true);
        window.location = 'index.html';
    }else{
        alert('Email ou senha incorreto!');
        sessionStorage.setItem('Logado',false);
    }
}
setTimeout(()=>{ExibeAcesso()},1000)
