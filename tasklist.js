
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
    document.getElementById('no-tasks').remove()

    let formValue = getFormValue();
    if (validaForm(formValue)) {
        tasks.add(formValue);
    }

    document.getElementById('btn-agendar').disabled = false
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


function checkProcastinationMode() {

    let formValue = getFormValue();

    if (procastination == 'on') {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].setShorterDeadLine();
        }
    }
}

//Scheduling to minimize lateness
function scheduleTasks() {

    // Verifica se o modo procastinador está ativo, caso esteja reduz o prazo de todas as tarefas 
    checkProcastinationMode(procastination)

    // Ordenar as tasks 
    quickSort(0, (tasks.length - 1))

    // Mostrar ordenadas - verificar se a tabela renderizou certinho
    renderTasks('ordenadas', false)

    // Agendar cada tarefa ordenada
    schedule();

    // Mostrar tarefas com atraso - verificar se os cálculos estão certos
    renderTasks('com_atraso', false)

    document.getElementById('btn-salvar').disabled = false

}

function schedule() {

    tasks[0].setDataInicio(moment(new Date()).add(30, 'minutes'))

    for (let i = 1; i < tasks.length; i++) {
        tasks[i].setDataInicio(tasks[i - 1].data_de_fim)
    }

}

function init() {

    // @TODO: remover após os testes


    tasks.add({ nome: "Tarefa 01", duracaoMinutos: 15, duracaoHoras: 2, duracaoDias: 1, dataFinal: "2023-06-02T19:49" })
    tasks.add({ nome: "Tarefa 02", duracaoMinutos: 18, duracaoHoras: 5, duracaoDias: 1, dataFinal: "2023-06-01T08:29" })
    tasks.add({ nome: "Tarefa 03", duracaoMinutos: 24, duracaoHoras: 11, duracaoDias: 1, dataFinal: "2023-05-31T04:53" })
    tasks.add({ nome: "Tarefa 04", duracaoMinutos: 25, duracaoHoras: 12, duracaoDias: 1, dataFinal: "2023-06-07T23:30" })
    tasks.add({ nome: "Tarefa 05", duracaoMinutos: 26, duracaoHoras: 13, duracaoDias: 1, dataFinal: "2023-06-05T04:51" })

    return false;
}









