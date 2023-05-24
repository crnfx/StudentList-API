
// База данных
let SERVER_URL = 'http://localhost:3000'

async function serverAddStudent (obj) {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj),
    });
    
    let data = await response.json()
    console.log(data);

    return data
}

async function serverGetStudent() {
    let response = await fetch(SERVER_URL + '/api/students', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    let data = await response.json()

    return data
}

async function serverDeleteStudent(id) {
    let response = await fetch(SERVER_URL + '/api/students/' + id, {
        method: 'DELETE',
    });
    let data = await response.json()

    return data
}

let serverData = await serverGetStudent ()

let studentsList = []

if(serverData) {
    studentsList = serverData
}

let now = new Date()

let sortColumnFlag = 'fio',
    sortDirFlag = true

// Создание элементов

const $app = document.getElementById('app'),
    // Create table
    $table = document.createElement('table'),
    $tableHead = document.createElement('thead'),
    $tableBody = document.createElement('tbody'),
    // Create form add student
    $addStudentForm = document.createElement('form'),
    $inputName = document.createElement('input'),
    $labelName = document.createElement('label'),
    $inputSurname = document.createElement('input'),
    $labelSurname = document.createElement('label'),
    $inputLastname = document.createElement('input'),
    $labelLastname = document.createElement('label'),
    $inputbirthday = document.createElement('input'),
    $labelBirthDate = document.createElement('label'),
    $inputstudyStart = document.createElement('input'),
    $labelStartEducation = document.createElement('label'),
    $inputFaculty = document.createElement('input'),
    $labelFaculty = document.createElement('label'),
    $addStudentButton = document.createElement('button'),
    // Create form filter student
    $filterStudentForm = document.createElement('form'),
    $filterInputFio = document.createElement('input'),
    $filterInputFaculty = document.createElement('input'),
    $filterinputstudyStart = document.createElement('input'),
    $filterInputEndEducation = document.createElement('input'),


    $tableHeadTr = document.createElement('tr'),
    $tableHeadThFIO = document.createElement('th'),
    $tableHeadThBirthDate = document.createElement('th'),
    $tableHeadThStartEducation = document.createElement('th'),
    $tableHeadThFaculty = document.createElement('th'),
    $tableHeadThDelete = document.createElement('th'),

    $sortButtonsContainer = document.createElement('div'),
    $sortFioButton = document.createElement('button'),
    $sortFacultyButton = document.createElement('button'),
    $sortAgeButton = document.createElement('button'),
    $sortStartEducationButton = document.createElement('button');


$tableHeadThFIO.textContent = 'ФИО'
$tableHeadThBirthDate.textContent = 'Дата рождения'
$tableHeadThStartEducation.textContent = 'Годы обучения'
$tableHeadThFaculty.textContent = 'Факультет'
$tableHeadThDelete.textContent = 'Удаление студента из списка'

$sortButtonsContainer.classList.add('sort-buttons', 'mb-4', 'flex')
$sortFioButton.classList.add('btn-reset', 'form__btn', 'button')
$sortFacultyButton.classList.add('btn-reset', 'form__btn', 'button')
$sortAgeButton.classList.add('btn-reset', 'form__btn', 'button')
$sortStartEducationButton.classList.add('btn-reset', 'form__btn', 'button')

// Стилизация таблицы
$table.classList.add('table', 'table-dark')
// Стилизация формы добавления студента
$addStudentForm.action = '#'
$addStudentForm.id = 'add-form'
$addStudentForm.classList.add('mb-3', 'flex')
$inputName.id = 'add-form__input-name'
$inputName.classList.add('form-control', 'mb-4', 'input')
$inputName.type = 'text'
$inputName.placeholder = 'Имя'
$inputSurname.id = 'add-form__input-surname'
$inputSurname.classList.add('form-control', 'mb-4', 'input')
$inputSurname.type = 'text'
$inputSurname.placeholder = 'Фамилия'
$inputLastname.id = 'add-form__input-lastname'
$inputLastname.classList.add('form-control', 'mb-4', 'input')
$inputLastname.type = 'text'
$inputLastname.placeholder = 'Отчество'
$inputbirthday.id = 'add-form__input-birthdate'
$inputbirthday.classList.add('form-control', 'mb-4', 'input')
$inputbirthday.type = 'date'
$inputbirthday.placeholder = 'Дата рождения'
$inputstudyStart.id = 'add-form__input-start'
$inputstudyStart.classList.add('form-control', 'mb-4', 'input')
$inputstudyStart.type = 'number'
$inputstudyStart.placeholder = 'Год начала обучения'
$inputFaculty.id = 'add-form__input-faculty'
$inputFaculty.classList.add('form-control', 'mb-4', 'input')
$inputFaculty.type = 'text'
$inputFaculty.placeholder = 'Факультет'
$addStudentButton.classList.add('btn-reset', 'form__btn', 'button')
$addStudentButton.textContent = 'Добавить студента'
$addStudentButton.type = 'submit'
// Стилизация формы фильтрации студента
$filterStudentForm.action = '#'
$filterStudentForm.id = 'filter-form'
$filterStudentForm.classList.add('mb-3', 'flex')
$filterInputFio.classList.add('form-control', 'mb-4', 'input')
$filterInputFio.type = 'text'
$filterInputFio.placeholder = 'Фильтровать по ФИО'
$filterInputFaculty.classList.add('form-control', 'mb-4', 'input')
$filterInputFaculty.type = 'text'
$filterInputFaculty.placeholder = 'Фильтровать по факультету'
$filterinputstudyStart.classList.add('form-control', 'mb-4', 'input')
$filterinputstudyStart.placeholder = 'Фильтровать по дате начала обучения'
$filterInputEndEducation.classList.add('form-control', 'mb-4', 'input')
$filterInputEndEducation.placeholder = 'Фильтровать по дате окончания обучения'

$tableHeadTr.append($tableHeadThFIO)
$tableHeadTr.append($tableHeadThBirthDate)
$tableHeadTr.append($tableHeadThStartEducation)
$tableHeadTr.append($tableHeadThFaculty)
$tableHeadTr.append($tableHeadThDelete)

$addStudentForm.append($inputName, $inputSurname, $inputLastname, $inputbirthday, $inputstudyStart, $inputFaculty, $labelName, $labelSurname, $labelLastname, $labelBirthDate, $labelStartEducation, $labelFaculty, $addStudentButton)
$labelName.append($inputName)
$labelSurname.append($inputSurname)
$labelLastname.append($inputLastname)
$labelBirthDate.append($inputbirthday)
$labelStartEducation.append($inputstudyStart)
$labelFaculty.append($inputFaculty)

$filterStudentForm.append($filterInputFio, $filterInputFaculty, $filterinputstudyStart, $filterInputEndEducation)

$tableHead.append($tableHeadTr)
$table.append($tableHead)
$table.append($tableBody)
$app.append($addStudentForm, $sortButtonsContainer, $filterStudentForm, $table)

$sortButtonsContainer.append($sortFioButton, $sortFacultyButton, $sortAgeButton, $sortStartEducationButton)
$sortFioButton.textContent = 'Сортировать по ФИО'
$sortFacultyButton.textContent = 'Сортировать по факультету'
$sortAgeButton.textContent = 'Сортировать по возрасту'
$sortStartEducationButton.textContent = 'Сортировать по году начала обучения'


function createStudentTR(student) {

    const $studentTr = document.createElement('tr'),
        $studentFIO = document.createElement('th'),
        $studentBirthDate = document.createElement('th'),
        $studentStartEducation = document.createElement('th'),
        $studentFaculty = document.createElement('th'),
        $studentDelete = document.createElement('th'),
        $studentDeleteBtn = document.createElement('button');

        $studentDeleteBtn.classList.add('btn', 'btn-danger')

    $studentFIO.textContent = student.fio
    $studentBirthDate.textContent = student.birthday
    $studentStartEducation.textContent = student.studyStart + ' - ' + student.endEducation + ' (Планирует поступать)'
    if (student.studyStart === 2022) {
        $studentStartEducation.textContent = student.studyStart + ' ' + ' - ' + student.endEducation + ' (1 курс)';
    }
    if (student.studyStart === 2021) {
        $studentStartEducation.textContent = student.studyStart + ' ' + ' - ' + student.endEducation + ' (2 курс)';
    }
    if (student.studyStart === 2020) {
        $studentStartEducation.textContent = student.studyStart + ' ' + ' - ' + student.endEducation + ' (3 курс)';
    }
    if (student.studyStart === 2019) {
        $studentStartEducation.textContent = student.studyStart + ' ' + ' - ' + student.endEducation + ' (4 курс)';
    }
    if (student.studyStart <= 2018) {
        $studentStartEducation.textContent = 'Закончил обучение';
    }
    $studentFaculty.textContent = student.faculty
    $studentDeleteBtn.textContent = 'Удалить'

    $studentDeleteBtn.addEventListener('click', async function() {
        await serverDeleteStudent(student.id)
        $studentTr.remove()
    })
    

    $studentTr.append($studentFIO)
    $studentTr.append($studentBirthDate)
    $studentTr.append($studentStartEducation)
    $studentTr.append($studentFaculty)
    $studentTr.append($studentDelete)
    $studentDelete.append($studentDeleteBtn)

    return $studentTr
}

function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear();
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

// Фильтрация 2

function filter(arr, prop, value) {
    return arr.filter(function(student) {
        if(student[prop].toString().includes(value.trim())) return true
    });
}

// Рендер
function render(arrData) {
    $tableBody.innerHTML = ''
    // 1) Подготовка рендера
    let copyStudentsList = [...arrData]

    for (const student of copyStudentsList) {
        student.fio = student.name + ' ' + student.surname + ' ' + student.lastname
        student.age = Math.floor((now - student.birthDate) / 1000 / 60 / 60 / 24 / 365.25)
        student.birthday = formatDate(new Date(student.birthday))
        student.studyStart = Number(student.studyStart)
        student.endEducation = student.studyStart + 4
    }

    // Сортировка

    copyStudentsList = copyStudentsList.sort(function (studentA, studentB) {
        let sort = studentA[sortColumnFlag] < studentB[sortColumnFlag]
        if (sortDirFlag == false) {
            sort = studentA[sortColumnFlag] > studentB[sortColumnFlag]
        }
        if (sort) return -1
    })

    // Фильтрация

    if ($filterInputFio.value.trim() !== '') {
        copyStudentsList = filter(copyStudentsList, 'fio', $filterInputFio.value)
    }

    if ($filterInputFaculty.value.trim() !== '') {
        copyStudentsList = filter(copyStudentsList, 'faculty', $filterInputFaculty.value)
    }

    if ($filterinputstudyStart.value.trim() !== '') {
        copyStudentsList = filter(copyStudentsList, 'studyStart', $filterinputstudyStart.value)
    }

    if ($filterInputEndEducation.value.trim() !== '') {
        copyStudentsList = filter(copyStudentsList, 'endEducation', $filterInputEndEducation.value)
    }

    // 2) Отрисовка

    for (const student of copyStudentsList) {
        const $newTR = createStudentTR(student)
        $tableBody.append($newTR)
    }

} render(studentsList)

// События сортировки

$sortFioButton.addEventListener('click', function() {
    sortColumnFlag = 'fio'
    sortDirFlag = !sortDirFlag
    render(studentsList)
})

$sortAgeButton.addEventListener('click', function() {
    sortColumnFlag = 'age'
    sortDirFlag = !sortDirFlag
    render(studentsList)
})

$sortFacultyButton.addEventListener('click', function() {
    sortColumnFlag = 'faculty'
    sortDirFlag = !sortDirFlag
    render(studentsList)
})

$sortStartEducationButton.addEventListener('click', function() {
    sortColumnFlag = 'startEducation'
    sortDirFlag = !sortDirFlag
    render(studentsList)
})

// События фильтрации

$filterStudentForm.addEventListener('submit', function(event) {
    event.preventDefault()
    render(studentsList)
})

$filterInputFio.addEventListener('input', function() {
    render(studentsList)
})

$filterInputFaculty.addEventListener('input', function() {
    render(studentsList)
})

$filterinputstudyStart.addEventListener('input', function() {
    render(studentsList)
})

$filterInputEndEducation.addEventListener('input', function() {
    render(studentsList)
})

// Функция валидации формы добавления нового студента
function formValidate() {
    const validation = new JustValidate('#add-form');

    validation

        .addField('#add-form__input-surname', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели фамилию студента'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Минимум 2 символа'
            },
            {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Максимум 50 символов'
            },
        ])

        .addField('#add-form__input-name', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели имя студента'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Минимум 2 символа'
            },
            {
                rule: 'maxLength',
                value: 30,
                errorMessage: 'Максимум 30 символов'
            },
        ])

        .addField('#add-form__input-lastname', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели отчество студента'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Минимум 2 символа'
            },
            {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Максимум 50 символов'
            },
        ])

        .addField('#add-form__input-birthdate', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели дату рождения студента'
            },
        ])

        .addField('#add-form__input-start', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели год начала обучения студента'
            },
        ])

        .addField('#add-form__input-faculty', [
            {
                rule: 'required',
                errorMessage: 'Вы не ввели факультет студента'
            },
            {
                rule: 'minLength',
                value: 2,
                errorMessage: 'Вы не ввели факультет студента'
            },
            {
                rule: 'maxLength',
                value: 50,
                errorMessage: 'Вы не ввели факультет студента'
            },
        ]).onSuccess( async (e) => {
            e.preventDefault();
            if (Number($inputstudyStart.value.trim()) < 2000) {
                alert('Минимальный год начала обучения 2000')
                return
            }

            if (Number($inputstudyStart.value.trim()) > 2022) {
                alert('Максимальный год начала обучения' + ' ' + now.getFullYear())
                return
            }

            let newStudentObj = {
                name: $inputName.value.trim(),
                surname: $inputSurname.value.trim(),
                lastname: $inputLastname.value.trim(),
                birthday: new Date($inputbirthday.value.trim()),
                studyStart: $inputstudyStart.value.trim(),
                faculty: $inputFaculty.value.trim(),
                endEducation: Number($inputstudyStart.validationMessage) + 4
            }

            let serverDataObj = await serverAddStudent(newStudentObj)
            serverDataObj.birthday = new Date(serverDataObj.birthday)
            serverDataObj.studyStart = Number(serverDataObj.studyStart)

            studentsList.push(serverDataObj)

            $inputName.value = ''
            $inputSurname.value = ''
            $inputLastname.value = ''
            new Date($inputbirthday.value = '')
            $inputstudyStart.value = ''
            $inputFaculty.value = ''
            render(studentsList)
        })

} formValidate()


