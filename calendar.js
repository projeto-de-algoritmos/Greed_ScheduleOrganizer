
function generate_ics() {
    const TIME_FORMAT = 'HH:MM'
    const DATE_FORMAT = 'MM/DD/YYYY'
    console.log('Subject, Start Date, Start Time, End Date, End Time, Location, Description')

    tasks.map(t => {
        t.setDataInicio(moment())
    })

    for (let t of tasks) {
        const start_date = formatDate(t.data_de_inicio, DATE_FORMAT)
        const start_time = formatDate(t.data_de_inicio, TIME_FORMAT)
        const end_date = formatDate(t.data_de_fim, DATE_FORMAT)
        const end_time = formatDate(t.data_de_fim, TIME_FORMAT)

        // console.log(`${t.nome},${start_date},${start_time},${end_date},${end_time}`)


    }
    renderTasks('com_atraso', false)
    return false;

}