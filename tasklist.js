let tasks = [];


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