
function toggle(id) {

    if (document.getElementById(id).style.display != "none")
        document.getElementById(id).style.display = "none";
    else
        document.getElementById(id).style.display = "block";

}

function addTask(formid) {
    for (x of document.getElementById(formid)) {
        console.log(x.value)
    }
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