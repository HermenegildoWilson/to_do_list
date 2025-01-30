//  VARIAVEIS DE ESCOPO GLOBAL

// PAINEIS ONDE STARÃO POSICIONADAS AS TAREFAS
const painelTarefas = document.querySelectorAll('.tarefas');

// Botão de adicionar tarefa, isto no painel de tarefas
const botao_Add_Terefa = document.querySelectorAll('.botao-add-tarefa');

// Botão de ação adicionar nova tarefa, isto já na tela de cadastro de tarefas
const botao_adicionar = document.querySelector('#botao-adicionar');

// Modal que contem o formulário de cadastro de tarefas
const tela_Add_Tarefa = document.querySelector('.tela-add-tarefa');

// Nome da terefa que esta a ser cadastrada
let nomeTarefa = document.querySelector('#nomeTarefa');


//Quando a página Carregar, verificamos se já existia um usuario cadastrado, 
window.onload = () => {
    if ((localStorage.getItem('sexo') != 'null') && localStorage.getItem('sexo')) {
        // se já existia emitimos apenas uma mensagem de boas vindas, e carregamos as tarefas na tela

        boasVindas();

        const tarefas = [localStorage.getItem('tarefasPendentes'),
        localStorage.getItem('tarefasExecucao'),
        localStorage.getItem('tarefasConcluidas')];
        carregarTarefas(tarefas);
    } else {
        // Se não tinha um cadastro primeiro cadastramos(guardamos no navegador) e de seguida damos as boas vindas e carregamos as tarefas na tela.

        //Objecto que permite coletar os dados da URL
        const dadosCadastro = new URLSearchParams(window.location.search);

        //Guardamos os dados no navegador
        localStorage.setItem('email', dadosCadastro.get('email'));
        localStorage.setItem('nome', dadosCadastro.get('nome'));
        localStorage.setItem('sexo', dadosCadastro.get('sexo'));
        localStorage.setItem('senha', dadosCadastro.get('senha'));
        localStorage.setItem('tarefasPendentes', '');
        localStorage.setItem('tarefasExecucao', '');
        localStorage.setItem('tarefasConcluidas', '');

        boasVindas();
        const tarefas = [localStorage.getItem('tarefasPendentes'),
        localStorage.getItem('tarefasExecucao'),
        localStorage.getItem('tarefasConcluidas')];
        carregarTarefas(tarefas);
    }
}

// Função de boas vindas, e personalisa o ambiente / Tema femenino e masculino
function boasVindas() {
    if (localStorage.getItem('sexo') == 'Feminino') {
        document.querySelector('#conteudo-pagina-principal > h2').innerHTML = `Seja bem vinda ${localStorage.getItem('nome')}!`
    } else {
        document.querySelector('#conteudo-pagina-principal > h2').innerHTML = `Seja bem vindo ${localStorage.getItem('nome')}!`
    }
}

// Função que exibe as tarefas já existentes na tela
function carregarTarefas(tarefas) {
    painelTarefas.forEach((painel, i) => {
        tarefas[i] = tarefas[i].split('-')
        tarefas[i].forEach(tarefa => {
            if (tarefa != '') {
                painel.appendChild(criarTarefa(tarefa));
            }
        })
    });
}

// QUANDO O BOTÃO DE ADICIONAR TAREFA FOR CLICADO, exibimos a tela de cadastro de tarefas
botao_Add_Terefa.forEach((btn) => {
    btn.onclick = () => {
        tela_Add_Tarefa.classList.toggle('tela-tarefa-visivel');
        nomeTarefa.value = '';

        // Botão de ação adicionar tarefa
        botao_adicionar.onclick = (event) => {
            // Removemos o evento padrão do botão
            event.preventDefault();

            // Se o campo não estiver vazio
            if (nomeTarefa.value != 0) {
                // Pegamos a posição do painel
                const painelAtual = painelTarefas[btn.id - 1];
                let tarefasExistentes = '';

                if (btn.id == 1) {
                    tarefasExistentes = localStorage.getItem('tarefasPendentes');

                    if (tarefasExistentes != '') {
                        localStorage.setItem('tarefasPendentes', tarefasExistentes + '-' + nomeTarefa.value);
                    } else {
                        localStorage.setItem('tarefasPendentes', nomeTarefa.value);
                    }

                } else if (btn.id == 2) {
                    tarefasExistentes = localStorage.getItem('tarefasExecucao');

                    if (tarefasExistentes != '') {
                        localStorage.setItem('tarefasExecucao', tarefasExistentes + '-' + nomeTarefa.value);
                    } else {
                        localStorage.setItem('tarefasExecucao', nomeTarefa.value);
                    }

                } else {
                    tarefasExistentes = localStorage.getItem('tarefasConcluidas');

                    if (tarefasExistentes != '') {
                        localStorage.setItem('tarefasConcluidas', tarefasExistentes + '-' + nomeTarefa.value);
                    } else {
                        localStorage.setItem('tarefasConcluidas', nomeTarefa.value);
                    }

                }

                const novaTarefa = criarTarefa(nomeTarefa.value);
                painelAtual.appendChild(novaTarefa);


                nomeTarefa.value = '';
                tela_Add_Tarefa.classList.remove('tela-tarefa-visivel');
            } else {
                // Se o campo estiver vazio
                window.alert('Preencha os campos!');
            }
        }
    }
})

// Botão cancelar cadastro
document.querySelector('.close-tela').onclick = () => {
    tela_Add_Tarefa.classList.remove('tela-tarefa-visivel');
}


// Deletar tarefas
window.addEventListener('mousemove', () => {
    const botaoDeletar = document.querySelectorAll('.eliminarTarefa');

    botaoDeletar.forEach(btn => {
        btn.onclick = () => {
            //(btn.parentElement).parentElement.remove();
            const painelAtual = ((btn.parentElement).parentElement.parentElement.parentElement.getAttribute('id'));
            const tarefa = btn.parentElement.parentElement.firstElementChild.textContent;
            btn.parentElement.parentElement.remove();
            
            if (painelAtual == 'pai-1') {
                
                const tarefasExistentes = localStorage.getItem('tarefasPendentes');
                if (localStorage.getItem('tarefasPendentes').includes('-'+tarefa)) {
                    localStorage.setItem('tarefasPendentes', tarefasExistentes.replace('-'+tarefa, ''));   
                }else {
                    localStorage.setItem('tarefasPendentes', tarefasExistentes.replace(tarefa, ''));
                }

            } else if (painelAtual == 'pai-2') {
                
                const tarefasExistentes = localStorage.getItem('tarefasExecucao');
                if (localStorage.getItem('tarefasExecucao').includes('-'+tarefa)) {
                    localStorage.setItem('tarefasExecucao', tarefasExistentes.replace('-'+tarefa, ''));   
                }else {
                    localStorage.setItem('tarefasExecucao', tarefasExistentes.replace(tarefa, ''));
                }

            } else if (painelAtual == 'pai-3') {

                const tarefasExistentes = localStorage.getItem('tarefasConcluidas');
                if (localStorage.getItem('tarefasConcluidas').includes('-'+tarefa)) {
                    localStorage.setItem('tarefasConcluidas', tarefasExistentes.replace('-'+tarefa, ''));   
                }else {
                    localStorage.setItem('tarefasConcluidas', tarefasExistentes.replace(tarefa, ''));
                }
                
            }
        }
    });
});


// Função que cria um objecto tarefa a partir de um nome, ou seja uma div HTML que corresponde ao modelo das tarefas
function criarTarefa(nome) {
    const tarefa = document.createElement('div');

    tarefa.innerHTML = `
    <h5>${nome}</h5>
    <p>
        <abbr title="Deletar">
            <button class="eliminarTarefa"></button>
        </abbr>
    </p>
    `;
    tarefa.classList.toggle('tarefa');

    return tarefa;
}