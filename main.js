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


// Usado para fazer o parse da data de entrada e saída
const dateFormat = 'yyyy-MM-DDThh:mm'

// Funções para gerenciar exibição de elementos
function setDataFinal() {
    document.getElementById('dataFinal').value = getToday();
}

function getToday() {
    return moment(new Date()).format(dateFormat);
}

function infoProcrastinador() {
    alert('O modo procrastinador reduz a data de entrega da tarefa em um tempo aleatório para te ajudar a não procrastinar.')
    return false;
}

