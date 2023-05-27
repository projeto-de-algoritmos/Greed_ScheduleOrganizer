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



// Class task 

class Task {
    name;
    end;
    days;
    hours;
    minutes;

    getDurationInMinutes() {
        return this.minutes + this.hours * 60 + this.days * 24 * 60;
    }


    constructor(formValue) {
        this.name = formValue[elementsId['taskName']]
        this.end = formValue[elementsId['taskEnd']]
        this.days = formValue[elementsId['duracaoDias']]
        this.hours = formValue[elementsId['duracaoHoras']]
        this.minutes = formValue[elementsId['duracaoMinutos']]
    }

    toStringArray() {
        return [`${this.name}`, `${this.end}`, `${this.days} dias ${this.hours}:${this.minutes}`]
    }

    toTableRow() {
        return '<tr>' + this.toStringArray().map(d => `<td>${d}</td>`).join('') + '</tr>'
    }

}

// Variável global guardando as tasks adicionadas

let tasks = [];



// Operações com tasks


function addTask() {

    let formValue = {}
    for (x of document.getElementById('form')) {
        formValue[x.id] = x.value
    }
    if (validaForm(formValue)) {
        let task = new Task(formValue)
        tasks.push(task);
        renderTasks();
    }

    return false;

}


// Validação

function validaForm(formValue) {



    if (!formValue[elementsId['taskName']]) {
        fieldError('Nome da tarefa');
        return false;
    }
    if (!formValue[elementsId['taskEnd']]) {
        fieldError('Data Final');
        return false;
    }
    if (!formValue[elementsId['duracaoDias']] || !formValue[elementsId['duracaoHoras']] || !formValue[elementsId['duracaoMinutos']]) {
        fieldError('duracao');
        return false;
    }
    return true;

}


function fieldError(fieldName) {
    alert(`O campo ${fieldName} não pode estar vazio!`)
}




// Funções para gerenciar exibição de elementos


function renderTasks() {

    let tasksHTML = tasks.map(
        t => t.toTableRow()).join('')

    let tasksTable = `<table><tr><th>Nome</th><th>Data Final</th><th>Duração</th></tr>${tasksHTML}</table>`
    document.getElementById("taskList").innerHTML = tasksTable
    console.log(tasksTable)
}


function setDataFinal() {

    document.getElementById('dataFinal').value = getToday();
}

function getToday() {

    let today = new Date();
    const format = 'yyyy-MM-DDThh:mm'
    let date = moment(today).format(format)
    return date;

}



function infoProcrastinador() {
    alert('O modo procrastinador reduz a data de entrega da tarefa em um tempo aleatório para te ajudar a não procrastinar.')

    return false;
}

