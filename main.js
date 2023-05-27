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

const dateFormat = 'yyyy-MM-DDThh:mm'

// Class task 

class Task {
    id;
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
        this.end = moment(formValue[elementsId['taskEnd']], dateFormat)
        this.days = +formValue[elementsId['duracaoDias']]
        this.hours = + formValue[elementsId['duracaoHoras']]
        this.minutes = + formValue[elementsId['duracaoMinutos']]
    }


    toStringArray() {
        let data = moment(this.end).format("DD/MM/YY hh:mm")
        let duracao = this.getDurationInMinutes()
        return [`${this.name}`,
        `${data}`,
        // `${this.days} dias ${this.hours}:${this.minutes}`, 
        `${duracao} minutos`,
        `<i onclick= "deleteTask(${this.id})" class="fa-regular fa-trash-can" style="cursor: pointer;"></i>`]
    }

    toString() {
        return this.name
    }

    toTableRow() {
        return '<tr>' + this.toStringArray().map(d => `<td>${d}</td>`).join('') + '</tr>'
    }

}

// Variável global guardando as tasks adicionadas

let tasks = [];


function init() {

    // @TODO: remover após os testes


    tasks.push(new Task({ nome: "Tarefa 01", duracaoMinutos: 15, duracaoHoras: 2, duracaoDias: 0, dataFinal: "2023-05-29T05:02" }))
    tasks.push(new Task({ nome: "Tarefa 02", duracaoMinutos: 16, duracaoHoras: 3, duracaoDias: 1, dataFinal: "2023-05-29T21:44" }))
    tasks.push(new Task({ nome: "Tarefa 03", duracaoMinutos: 17, duracaoHoras: 4, duracaoDias: 2, dataFinal: "2023-05-29T00:10" }))
    tasks.push(new Task({ nome: "Tarefa 04", duracaoMinutos: 18, duracaoHoras: 5, duracaoDias: 3, dataFinal: "2023-05-30T08:13" }))
    tasks.push(new Task({ nome: "Tarefa 05", duracaoMinutos: 19, duracaoHoras: 6, duracaoDias: 4, dataFinal: "2023-06-05T20:50" }))
    tasks.push(new Task({ nome: "Tarefa 06", duracaoMinutos: 20, duracaoHoras: 7, duracaoDias: 5, dataFinal: "2023-06-01T18:06" }))
    tasks.push(new Task({ nome: "Tarefa 07", duracaoMinutos: 21, duracaoHoras: 8, duracaoDias: 6, dataFinal: "2023-06-04T02:22" }))
    tasks.push(new Task({ nome: "Tarefa 08", duracaoMinutos: 22, duracaoHoras: 9, duracaoDias: 0, dataFinal: "2023-06-04T15:10" }))
    tasks.push(new Task({ nome: "Tarefa 09", duracaoMinutos: 23, duracaoHoras: 10, duracaoDias: 1, dataFinal: "2023-06-06T03:23" }))
    tasks.push(new Task({ nome: "Tarefa 10", duracaoMinutos: 24, duracaoHoras: 11, duracaoDias: 2, dataFinal: "2023-06-03T10:51" }))
    tasks.push(new Task({ nome: "Tarefa 11", duracaoMinutos: 25, duracaoHoras: 12, duracaoDias: 3, dataFinal: "2023-06-06T20:14" }))
    tasks.push(new Task({ nome: "Tarefa 12", duracaoMinutos: 26, duracaoHoras: 13, duracaoDias: 4, dataFinal: "2023-06-01T05:56" }))


    tasks.forEach(t => t.id = tasks.indexOf(t))






    renderTasks();
    return false;
}


// Operações com tasks


function addTask() {

    let formValue = {}
    for (x of document.getElementById('form')) {
        formValue[x.id] = x.value
    }
    if (validaForm(formValue)) {
        console.log(formValue)
        let task = new Task(formValue)
        task.id = tasks.length;
        tasks.push(task);

        renderTasks();
    }

    return false;

}

function deleteTask(id) {
    if (confirm('Deletar tarefa: ' + tasks[id].toString() + '?')) {
        tasks[id] = null;
        renderTasks()
    }
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

    if (formValue[elementsId['duracaoMinutos']] >= 60 || formValue[elementsId['duracaoMinutos']] < 0) {
        fieldError('minutos', 'Insira valores entre 0 e 60')
        return false;
    }

    if (formValue[elementsId['duracaoHoras']] >= 60 || formValue[elementsId['duracaoHoras']] < 0) {
        fieldError('horas', 'Insira valores entre 0 e 24')
        return false;
    }

    if (formValue[elementsId['duracaoDias']] < 0) {
        fieldError('horas', 'Insira valores maiores que 0')
        return false;
    }

    return true;

}


function fieldError(fieldName, extra = '') {
    if (!extra) alert(`O campo ${fieldName} não pode estar vazio!`)
    else alert(`Erro no campo ${fieldName}. ${extra}!`)
}


// Funções para gerenciar exibição de elementos


function renderTasks() {

    let tasksHTML = tasks.map(
        t => {
            if (t)
                return t.toTableRow()
        }
    ).join('')

    let tasksTable = `<table><tr><th>Nome</th><th>Data Final</th><th>Duração</th></tr>${tasksHTML}</table>`
    document.getElementById("taskList").innerHTML = tasksTable
}


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

