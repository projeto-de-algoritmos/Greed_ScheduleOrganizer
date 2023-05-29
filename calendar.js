
function generate_ics() {
    const TIME_FORMAT = 'HH:MM'
    const DATE_FORMAT = 'MM/DD/YYYY'
    console.log('Subject, Start Date, Start Time, End Date, End Time, Location, Description')

    tasks.map(t => {
        t.data_de_inicio = t.data_final
        t.setDataInicio(t.data_final)
        console.log(t.dias, t.horas, t.minutos)
        console.log(t.data_de_inicio.format(`${DATE_FORMAT} ${TIME_FORMAT}`))

    })
    for (let t of tasks) {
        const start_date = formatDate(t.data_de_inicio, DATE_FORMAT)
        const end_date = formatDate(t.data_de_fim, DATE_FORMAT)
        const start_time = formatDate(t.data_de_inicio, TIME_FORMAT)
        const end_time = formatDate(t.data_de_fim, TIME_FORMAT)

        console.log(`${t.nome},${start_date},${end_date},${start_time},${end_time}`)


    }
    console.log(tasks)
    renderTasks('com_atraso', false)
    return false;

}