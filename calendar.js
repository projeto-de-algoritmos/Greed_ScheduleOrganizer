
function save(filename, data) {
    const blob = new Blob([data], { type: 'text/csv' });
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    }
    else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}


function saveTasks() {
    scheduleTasks();

    const TIME_FORMAT = 'HH:mm'
    const DATE_FORMAT = 'MM/DD/YYYY'

    tarefas = 'Subject, Start Date, Start Time, End Date, End Time, Location, Description\n'


    for (let t of tasks) {
        const start_date = formatDate(t.data_de_inicio, DATE_FORMAT)
        const start_time = formatDate(t.data_de_inicio, TIME_FORMAT)
        const end_date = formatDate(t.data_de_fim, DATE_FORMAT)
        const end_time = formatDate(t.data_de_fim, TIME_FORMAT)

        tarefas += `${t.nome},${start_date},${start_time},${end_date},${end_time}\n`

    }

    save('tarefas.csv', tarefas)

    return false;

}