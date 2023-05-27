

function validaForm(formValue) {

    if (!validaNome(formValue))
        return false;

    if (!validaDuracao(formValue))
        return false;

    if (!formValue[elementsId['taskEnd']]) {
        fieldError('Data Final');
        return false;
    }


    return true;

}

function validaNome(formValue) {
    const MAX_NOME = 30;
    let nome = formValue[elementsId['taskName']]

    if (!nome) {
        fieldError('Nome da tarefa');
        return false;
    }
    if (nome.length > MAX_NOME || nome.length == 0) {
        fieldError('Nome da tarefa', `Insira nomes entre 0 e ${MAX_NOME} caracteres.`)
        return false;
    }
    return true;
}

function validaDuracao(formValue) {

    const [dias, horas, minutos] = [formValue[elementsId['duracaoDias']], formValue[elementsId['duracaoHoras']], formValue[elementsId['duracaoMinutos']]]
    if (!dias || !horas || !minutos) {
        fieldError('duracao');
        return false;
    }

    if (minutos < 0 || minutos >= 60) {
        fieldError('minutos', 'Insira valores entre 0 e 60')
        return false;
    }

    if (horas < 0 || horas >= 24) {
        fieldError('horas', 'Insira valores entre 0 e 24')
        return false;
    }

    if (dias < 0) {
        fieldError('horas', 'Insira valores maiores que 0')
        return false;
    }
    if (dias == 0 && horas == 0 && minutos == 0) {
        fieldError('duracao', 'Insira uma duração maior do que 0')
        return false;
    }
    return true;
}

function fieldError(fieldName, extra = '') {
    if (!extra) alert(`O campo ${fieldName} não pode estar vazio!`)
    else alert(`Erro no campo ${fieldName}. ${extra}!`)
}
