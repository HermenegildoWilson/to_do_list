//Link do botão de ação principal
const botao = document.querySelector('#entrar > a')

//Caso já exista um cadastro alteramos as informações do link de forma que ele nos direcione para a página de login
if ((localStorage.getItem('sexo')) &&(localStorage.getItem('sexo'))) {
    botao.innerHTML = 'Fazer login'
    botao.setAttribute('href', 'src/views/login.html')
}