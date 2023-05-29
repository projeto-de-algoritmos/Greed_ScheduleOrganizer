
const table_ids =
{
    'lista': { id: 'taskList', headers: ['nome', 'data final'], },
    'ordenadas': { id: 'step1', headers: ['nome', 'data final'], },
    'com_atraso': { id: 'step2', headers: ['nome', 'data de inicio', 'data de fim', 'atraso'] }
}

class TaskList extends Array {

    constructor() {
        super();
    }

    add(formValue) {
        let task = new Task(formValue)
        task.id = this.length;
        this.push(task)
        renderTasks('lista')
    }

    remove(index) {
        this[index] = null;
        renderTasks('lista')
    }

    toTable(headers, deletable = true) {
        let table = '<table><tr>'
        for (let h of headers) {
            let palavras = h.split(' ')
            let header = palavras.map(p => {
                return p.toUpperCase().charAt(0) + p.slice(1)
            }).join(' ')
            table += `<th>${header}</th>`
        }
        if (deletable)
            table += '<th> Deletar </th>'
        table += '</tr>'

        let tasksHTML = tasks.map(
            t => t ? t.toTableRow(headers, deletable) : ''
        ).join('')
        return table + tasksHTML + '</table>';
    }

    swap(indexA, indexB) {
        const temp = this[indexA];
        this[indexA] = this[indexB]
        this[indexB] = temp
    }
}

// let tasks = [];
let tasks = new TaskList();

function addTask() {

    let formValue = getFormValue();
    if (validaForm(formValue)) {
        tasks.add(formValue);
    }
    return false;
}

function deleteTask(id) {
    if (confirm('Deletar tarefa: ' + tasks[id].toString() + '?'))
        tasks.remove(id)

}

function renderTasks(table_type, deletable = true) {
    document.getElementById(table_ids[table_type].id).innerHTML = tasks.toTable(table_ids[table_type].headers, deletable)
}

function separate(left, right) {

    let taskPivot = tasks[right];
    let auxiliar = left;


    for (let k = left; k < right; k++) {
        if (tasks[k].data_final <= taskPivot.data_final) {
            //Troca de posição a task[k] com a task[auxiliar]
            tasks.swap(auxiliar, k)
            auxiliar++;
        }
    }

    //Troca de posição a task[auxiliar] com a task[right]
    tasks.swap(right, auxiliar)

    //Devolve a posição do Pivo
    return auxiliar;
}


function quickSort(left, right) {
    const middle = Math.floor((left + right) / 2)

    if (right <= left) {
        return;
    }

    console.log(left, right, middle)
    //Compara e troca
    if (tasks[middle].data_final < tasks[right].data_final) {
        tasks.swap(middle, right)
    }

    //Compara e troca
    if (tasks[left].data_final < tasks[middle].data_final) {
        tasks.swap(left, middle)
    }

    //Compara e troca
    if (tasks[right].data_final < tasks[middle].data_final) {
        tasks.swap(right, middle)
    }

    //Recebe a posição do Pivo
    const auxiliar = separate(left, right);

    quickSort(left, (auxiliar - 1));
    quickSort(auxiliar + 1, right);

}

//Scheduling to minimize lateness
function scheduleTasks() {

    // Ordenar o tasks 
    quickSort(0, (tasks.length - 1))

    // Mostrar ordenadas - verificar se a tabela renderizou certinho
    renderTasks('ordenadas', false)

    // Agendar cada tarefa ordenada

    tasks[0].data_de_inicio = 0;
    tasks[0].data_de_fim = tasks[0].data_de_inicio + tasks[0].duracao;

    for (let i = 1; i < tasks.length; i++) {

        tasks[i].data_de_inicio = tasks[i - 1].data_de_fim;
        tasks[i].data_de_fim = tasks[i].data_de_inicio + tasks[i].duracao;
    }

    // Mostrar tarefas com atraso - verificar se os cálculos estão certos
    renderTasks('com_atraso', false)

}

function init() {

    // @TODO: remover após os testes


    tasks.add({ nome: "Tarefa 02", duracaoMinutos: 15, duracaoHoras: 2, duracaoDias: 0, dataFinal: "2023-05-29T05:02" })
    tasks.add({ nome: "Tarefa 04", duracaoMinutos: 18, duracaoHoras: 5, duracaoDias: 3, dataFinal: "2023-05-30T08:13" })
    tasks.add({ nome: "Tarefa 01", duracaoMinutos: 17, duracaoHoras: 4, duracaoDias: 2, dataFinal: "2023-05-29T00:10" })
    tasks.add({ nome: "Tarefa 03", duracaoMinutos: 16, duracaoHoras: 3, duracaoDias: 1, dataFinal: "2023-05-29T21:44" })
    tasks.add({ nome: "Tarefa 05", duracaoMinutos: 19, duracaoHoras: 6, duracaoDias: 4, dataFinal: "2023-06-05T20:50" })
    tasks.add({ nome: "Tarefa 06", duracaoMinutos: 20, duracaoHoras: 7, duracaoDias: 5, dataFinal: "2023-06-01T18:06" })
    tasks.add({ nome: "Tarefa 07", duracaoMinutos: 21, duracaoHoras: 8, duracaoDias: 6, dataFinal: "2023-06-04T02:22" })
    tasks.add({ nome: "Tarefa 08", duracaoMinutos: 22, duracaoHoras: 9, duracaoDias: 0, dataFinal: "2023-06-04T15:10" })
    tasks.add({ nome: "Tarefa 09", duracaoMinutos: 23, duracaoHoras: 10, duracaoDias: 1, dataFinal: "2023-06-06T03:23" })
    tasks.add({ nome: "Tarefa 10", duracaoMinutos: 24, duracaoHoras: 11, duracaoDias: 2, dataFinal: "2023-06-03T10:51" })
    tasks.add({ nome: "Tarefa 11", duracaoMinutos: 25, duracaoHoras: 12, duracaoDias: 3, dataFinal: "2023-06-06T20:14" })
    tasks.add({ nome: "Tarefa 12", duracaoMinutos: 26, duracaoHoras: 13, duracaoDias: 4, dataFinal: "2023-06-01T05:56" })
    scheduleTasks();

    return false;
}

