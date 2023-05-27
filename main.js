
let modoProcrastinafor = false;

let tasks = [];


function toggle(id) {

    if (document.getElementById(id).style.display != "none")
        document.getElementById(id).style.display = "none";
    else
        document.getElementById(id).style.display = "block";

}

function addTask(formid) {
    let task = {}
    for (x of document.getElementById(formid)) {
        task[x.id] = x.value
    }

    tasks.push(task);
    renderTasks();

}

function parseTask()

function renderTasks() {


    let tasksHTML = tasks.map(

        t => t)
    console.log(tasksHTML)
    document.getElementById("taskList").innerHTML = tasksHTML.join('<br/>')
}

function getToday() {

    let today = new Date();
    const format = 'yyyy-MM-DDThh:mm'
    let date = moment(today).format(format)
    return date;

}

function initForm() {
    console.log('init')
}

function infoProcrastinador() {
    alert('O modo procrastinador reduz a data de entrega da tarefa em um tempo aleatório para te ajudar a não procrastinar.')
}

