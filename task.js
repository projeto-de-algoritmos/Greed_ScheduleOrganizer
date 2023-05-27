class Task {
    id;
    name;
    end;
    days;
    hours;
    minutes;

    getDurationInMinutes() {
        return this.minutes + this.hours * 60 + this.days * 24 * 60;
    }

    constructor(formValue) {
        this.name = formValue[elementsId['taskName']]
        this.end = moment(formValue[elementsId['taskEnd']], dateFormat)
        this.days = +formValue[elementsId['duracaoDias']]
        this.hours = + formValue[elementsId['duracaoHoras']]
        this.minutes = + formValue[elementsId['duracaoMinutos']]
    }


    toStringArray() {
        let data = moment(this.end).format("DD/MM/YY hh:mm")
        let duracao = this.getDurationInMinutes()
        return [`${this.name}`,
        `${data}`,
        // `${this.days} dias ${this.hours}:${this.minutes}`, 
        `${duracao} minutos`,
        `<i onclick= "deleteTask(${this.id})" class="fa-regular fa-trash-can" style="cursor: pointer;"></i>`]
    }

    toString() {
        return this.name
    }

    toTableRow() {
        return '<tr>' + this.toStringArray().map(d => `<td>${d}</td>`).join('') + '</tr>'
    }

}


