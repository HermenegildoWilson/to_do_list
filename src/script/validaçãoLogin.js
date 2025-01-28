// Botão de ação, login
const botao = document.querySelector('#botao-entrar')

//Quando o botão for clicado validamos o acesso
botao.onclick = (event) => {
    const email = document.querySelector('#email').value
    const senha = document.querySelector('#senha').value

    //Alteramos o evento padrão do botão submit
    event.preventDefault()

    //Se os dados que o usuario fornecer corresponderem aos dados existetes validamos o acesso
    if ((email == localStorage.getItem('email')) && (senha == localStorage.getItem('senha'))) {
        //Abrimos a pagina principal
        window.open('todo-list.html','_self')
    }else {
        //Caso contrário emitimos uma mensagem de alerta
        window.alert('Palavra passe ou email incorreto')
    }
}