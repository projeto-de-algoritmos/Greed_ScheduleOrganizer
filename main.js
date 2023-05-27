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
        this.days = formValue[elementsId['duracaoDias']]
        this.hours = formValue[elementsId['duracaoHoras']]
        this.minutes = formValue[elementsId['duracaoMinutos']]
    }

    toStringArray() {
        let data = moment(this.end).format("DD/MM/YY")
        return [`${this.name}`, `${data}`, `${this.days} dias ${this.hours}:${this.minutes}`, `<i onclick= "deleteTask(${this.id})" class="fa-regular fa-trash-can" style="cursor: pointer;"></i>`]
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



// Operações com tasks


function addTask() {

    let formValue = {}
    console.log(document.getElementById('form'))
    for (x of document.getElementById('form')) {
        formValue[x.id] = x.value
    }
    if (validaForm(formValue)) {
        let task = new Task(formValue)
        task.id = tasks.length;
        tasks.push(task);

        renderTasks();
    }

    return false;

}

function deleteTask(id) {
    if (confirm('Deletar tarefa: ' + tasks[id].toString() + '?')) {
        console.log(tasks)
        tasks[id] = null;
        console.log(tasks)
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
    return true;

}


function fieldError(fieldName) {
    alert(`O campo ${fieldName} não pode estar vazio!`)
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
    console.log(tasksTable)
}


function setDataFinal() {

    document.getElementById('dataFinal').value = getToday();
}

function getToday() {

    let today = new Date();

    let date = moment(today).format(dateFormat)
    return date;

}



function infoProcrastinador() {
    alert('O modo procrastinador reduz a data de entrega da tarefa em um tempo aleatório para te ajudar a não procrastinar.')

    return false;
}

