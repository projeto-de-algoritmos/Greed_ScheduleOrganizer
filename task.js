class Task {
    id;
    nome;
    data_final;
    dias;
    horas;
    minutos;
    duracao;

    getDurationInMinutes() {
        return this.minutos + this.horas * 60 + this.dias * 24 * 60;
    }

    constructor(formValue) {
        this.nome = formValue[elementsId['taskName']]
        this.data_final = moment(formValue[elementsId['taskEnd']], dateFormat)
        this.dias = +formValue[elementsId['duracaoDias']]
        this.horas = + formValue[elementsId['duracaoHoras']]
        this.minutos = + formValue[elementsId['duracaoMinutos']]
        this.duracao = this.getDurationInMinutes()
    }


    toString() {
        return this.nome + ' (' + formatDate(this.data_final, br_date) + ')'
    }

    toTableRow(headers, deletable = true) {
        let row = '<tr>'

        for (let h of headers) {
            let value = this[h.replace(' ', '_')]
            if (value instanceof moment)
                value = formatDate(value, br_date)
            row += '<td>' + value + '</td>'
        }
        if (deletable)
            row += `<td style="text-align: center"><i onclick= "deleteTask(${this.id})" class="fa-regular fa-trash-can" style="cursor: pointer;"></i></td>`
        return row + '</tr>';
    }

}


