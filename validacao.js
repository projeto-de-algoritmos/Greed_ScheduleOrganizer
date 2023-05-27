
function validaForm(formValue) {

    if (!formValue[elementsId['taskName']]) {
        fieldError('Nome da tarefa');
        return false;
    }
    if (!formValue[elementsId['taskEnd']]) {
        fieldError('Data Final');
        return false;
    }
    if (!formValue[elementsId['duracaoDias']] || !formValue[elementsId['duracaoHoras']] || !formValue[elementsId['duracaoMinutos']]) {
        fieldError('duracao');
        return false;
    }

    if (formValue[elementsId['duracaoMinutos']] >= 60 || formValue[elementsId['duracaoMinutos']] < 0) {
        fieldError('minutos', 'Insira valores entre 0 e 60')
        return false;
    }

    if (formValue[elementsId['duracaoHoras']] >= 60 || formValue[elementsId['duracaoHoras']] < 0) {
        fieldError('horas', 'Insira valores entre 0 e 24')
        return false;
    }

    if (formValue[elementsId['duracaoDias']] < 0) {
        fieldError('horas', 'Insira valores maiores que 0')
        return false;
    }

    return true;

}


function fieldError(fieldName, extra = '') {
    if (!extra) alert(`O campo ${fieldName} não pode estar vazio!`)
    else alert(`Erro no campo ${fieldName}. ${extra}!`)
}
