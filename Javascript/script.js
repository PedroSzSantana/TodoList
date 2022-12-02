const ListaTarefas = ObtemListaTarefaStorage();
const formulario = document.querySelector('form');
const Lista = document.querySelector('#lista_tarefas');
let Dados

// verifica se foi logado pegando a chave do login.js
let logado = sessionStorage.getItem('Logado');
let login = JSON.parse(logado);
if(login !== true){
    window.location = 'login.html'
}
formulario.addEventListener('submit', (evento) =>{
    evento.preventDefault();

    let Tarefa = formulario.querySelector('#tarefa').value;
    
    if(verifcar(Tarefa)){
        GravarTarefa(Tarefa);
        Criartarefa(Dados.Tarefa, Dados.id); 
    }
    formulario.reset();
});
// Funçãa para gravar a Tarefa
function GravarTarefa(Tarefa){
    let Status = 'uncompleted';
    Dados = {id:ListaTarefas.length + 1, Tarefa:Tarefa, 'Status':Status};
    ListaTarefas.push(Dados);
    AtualizaListaTarefaStorage();
    return Dados;
}
// Função para verificar o campo //
function verifcar(campo){
    if(campo == ''){
        alert('Preencha o campo da Tarefa');
        return false;
    }
    return true;
}
// Criação do elemento HTML //
function Criartarefa(Dados, id){

        // Tag li que contem o Nome da Tarefa criada
        let Li1 = document.createElement('li');
        Li1.className = 'todo-item';
        Li1.innerHTML = Dados;
        Li1.id = id;

        //Botão Check
        let = I1 = document.createElement('i');
        I1.className = 'fas fa-check';
        let Btn1 = document.createElement('button');
        Btn1.className = 'check-btn';
        Btn1.id = id;
        Btn1.append(I1);
        // Evento completar tarefa
        Btn1.addEventListener('click', (b)=>{
            let botao1 = b.target
            Div.classList.add('completed');
            CompletarTarefa(botao1.id);
            AtualizaListaTarefaStorage();
            
        });
        //Botão Delete
        let = I2 = document.createElement('i');
        I2.className = 'fas fa-trash';
        let Btn2 = document.createElement('button');
        Btn2.id = id;
        Btn2.className = 'trash-btn';
        Btn2.append(I2);
        // Evento para remover a tarefa criada//
        Btn2.addEventListener('click', (b)=>{
            let Botao2 = b.target;
            Div.classList.add('fall');
            setTimeout(() => { 
                RemoveDaLista(Botao2.id);
                RemoveHTML(Botao2.id);
            }, 450);
        });
        // Div que contém todo o HTML criado
        let Div = document.createElement('div');
        Div.id = 'Div'+ id;
        Div.className = 'todo';
        Div.append(Li1);
        Div.append(Btn1);
        Div.append(Btn2);

        // Adição da div ao HTML dentro da lista não ordena (ul)
        Lista.append(Div);
}
// Função do botão para completar a Tarefa
function CompletarTarefa(Id){
    // Muda o Status para 'completed'
    let Tarefa_Completa
    Tarefa_Completa =  ListaTarefas.filter(element => element.id == Id);
    Tarefa_Completa.forEach(linha =>{
        linha.Status = 'completed';
    })
    
}
// Funçoes do botão de remover
function RemoveDaLista(Id){
    let rmv = ListaTarefas.findIndex((item) => item.id ==  Id)
    ListaTarefas.splice(rmv, 1);
    AtualizaListaTarefaStorage();
}
function RemoveHTML(Id){
    let Div_remover = document.querySelector('#Div'+ Id);
    Lista.removeChild(Div_remover);
}
// Filtro 
const filtro = document.querySelector('#Filtro');
    filtro.addEventListener('change', ()=>{
        Filtred = []
        Filtred = ListaTarefas;

        switch(filtro.value){
            case 'all' :FiltroRemoveTarefas();
                        FiltroCriaTarefas(Filtred);
            break;
            case  'completed':  FiltroRemoveTarefas();
                                Filtred = ListaTarefas.filter(element => element.Status == 'completed');
                                FiltroCriaTarefas(Filtred);
            break;
            default : FiltroRemoveTarefas();
                      Filtred = ListaTarefas.filter(element => element.Status == 'uncompleted');
                      FiltroCriaTarefas(Filtred);
            break;
        }
    });
// Cria tarefas filtradas //
function FiltroCriaTarefas(Filtred){
    Filtred.forEach(linha =>{
        Criartarefa(linha.Tarefa,linha.id);

        // Adiciona a classe 'completed' caso status for = completo
        if(linha.Status == 'completed'){
            let Div = document.querySelector('#Div'+linha.id);
            Div.classList.add('completed');  
        }
    });
}
// Remove todas as tarefas//
function FiltroRemoveTarefas(){
    while (Lista.firstChild) {
        Lista.removeChild(Lista.firstChild);
    }
}
// Criar o HTML salvo na Session Sto
function inicializaDom(){
    if(ListaTarefas.length > 0){
        ListaTarefas.forEach(linha =>{
            Criartarefa(linha.Tarefa,linha.id);
            //Adiciona novamente a classe 'completed' para tarefas completas
            if(linha.Status == 'completed'){
                Div = document.querySelector('#Div'+linha.id);
                Div.classList.add('completed');
            }
        });
    }
}
// Atualiza a memoria da Session Storage quando a Lista de Tarefas é alterada
function AtualizaListaTarefaStorage(){
    localStorage.setItem('Tarefas',JSON.stringify(ListaTarefas));
}
// Verifica se há algo armazenado no Session Storage
function ObtemListaTarefaStorage(){
    let aux = localStorage.getItem('Tarefas');
    if(aux){
        return JSON.parse(aux);
    }else{
        return Array();
    }
}
inicializaDom();