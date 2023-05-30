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

    setShorterDeadLine(){

        const random = (num) => Math.floor(Math.random()*num);  

        //4320min = 72h = 3 dias (máximo decremento no prazo de entrega gerado pelo antiprocastinação)
        let decrement = random(4320);

        this.data_final.subtract(decrement, 'minutes');

    }


    setDataInicio(data) {
        this.data_de_inicio = data;
        this.data_de_fim = moment(data)
            .add(this.dias, 'days')
            .add(this.horas, 'hours')
            .add(this.minutos, 'minutes')

        this.atraso = Math.max(this.data_de_fim.diff(this.data_final, 'minutes'), 0);

        if (this.atraso > 0) {

            let days, hours, minutes;
            minutes = this.atraso
            hours = Math.floor(minutes / 60)
            minutes = minutes % 60
            days = Math.floor(hours / 24)
            hours = hours % 24
            this.atraso = `<red>${days} d ${hours}h ${minutes} min</red>`
        } else {
            this.atraso = '<green><i class="fa-solid fa-check"></i></green>'
        }

    }


    toString() {
        return this.nome + ' (' + formatDate(this.data_final, br_date) + ')'
    }

    toTableRow(headers, deletable = true) {
        let row = '<tr>'

        for (let h of headers) {
            let value = this[h.toLowerCase().replaceAll(' ', '_')]
            if (value instanceof moment)
                value = formatDate(value, br_date)
            row += '<td>' + value + '</td>'
        }
        if (deletable)
            row += `<td style="text-align: center"><i onclick= "deleteTask(${this.id})" class="fa-regular fa-trash-can" style="cursor: pointer;"></i></td>`
        return row + '</tr>';
    }

}


