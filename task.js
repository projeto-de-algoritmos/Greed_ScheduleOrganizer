class Task {
    id;
    nome;
    data_final;
    dias;
    horas;
    minutos;
    duracao;
    data_de_inicio;
    data_de_fim;
    atraso;

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


    setDataInicio(data) {
        this.data_de_inicio = data;
        // @TODO: fazer o tratamento com as datas
        this.data_de_fim = data + this.duracao;
        this.atraso = this.data_de_final - this.data_final;
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


