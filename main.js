// Id dos elementos [Atualizar sempre que alterar no HTML]
const elementsId = {
    form: "form",
    taskName: "nome",
    taskEnd: "dataFinal",
    duracaoDias: "duracaoDias",
    duracaoHoras: "duracaoHoras",
    duracaoMinutos: "duracaoMinutos",
    modoProcrastinador: "modoProcrastinador",
    divTaskList: "taskList"
}

const repoUrl = 'https://github.com/projeto-de-algoritmos/Greed_ScheduleOrganizer'


// Usado para fazer o parse da data de entrada e saída
const dateFormat = 'yyyy-MM-DDTHH:mm'
const br_date = "DD/MM/YY HH:mm"

function getFormValue() {

    let formValue = {}
    for (x of document.getElementById('form')) {
        formValue[x.id] = x.value
    }
    return formValue;
}


// Funções para gerenciar exibição de elementos
function setDataFinal() {
    document.getElementById('dataFinal').value = getToday();
}


function getToday() {
    return moment(new Date()).format(dateFormat);
}

function infoProcrastinador() {
    alert('O modo procrastinador reduz a data de entrega da tarefa em um tempo aleatório, de até 3 dias, para te ajudar a não procrastinar.')
    return false;
}

function infoProject() {

    alert('Esse projeto tem o intuito de ajudar o usuário a verificar qual o menor atraso máximo (atraso da tarefa que mais atrasou) para se realizar um conjunto de tarefas utilizando o algoritmo Scheduling to Minimize Lateness e adicionar esse cronograma à sua agenda, por meio de um arquivo CSV que pode ser utilizado no Google Calendar.'
        + '\n\n' + 'Obs1.: O tempo de início para a realização das tarefas começa 30 minutos após as tarefas serem agendadas.')
    return false;
}

var procastination = 'off';

function changeProcastination() {
    if (procastination == 'off') {
        procastination = 'on';
    } else {
        procastination = 'off'
    }
    scheduleTasks()
}