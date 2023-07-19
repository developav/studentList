import Student from './student.js';

//Массив сотрудников
let students = [
    new Student ('Игорь','Фролов','Сергеевич', 2011, new Date (1992,2, 21), 'jawa developer',2015),
    new Student ('Иван','Иванов','Иванович', 2001, new Date (1987,1, 23),'fronend-developer',2005)
]
const $studentList = document.getElementById('studentList'),
      $studentListTHAll =  document.querySelectorAll('.studentsTable th')
let column = 'fio',
    columnDir = true,
    input = document.querySelectorAll('.form-control')
    //Получаем TR
function newStudentTR(student){
    const $studentTR = document.createElement('tr'),
          $fioTD = document.createElement('td'),
          $birthDateTD = document.createElement('td'),
          $startStudyTD = document.createElement('td'),
          $endStudyTD = document.createElement('td'),
          $occupationTD = document.createElement('td')
    let endStudy = student.getEndStud();
    let nowYear = new Date().getFullYear();

    $fioTD.textContent = student.fio
    $birthDateTD.textContent = student.getBirthDateString() + ' (' + student.getAge() + ' лет)'
    $endStudyTD.textContent = endStudy
    $occupationTD.textContent = student.getOccupation()
    if (endStudy < nowYear){
        $startStudyTD.textContent = student.startStudy + ' (' + student.getStudPeriod() + ' лет)' + ' Закончил'
    } else{
        $startStudyTD.textContent = student.startStudy + ' (' + student.getStudPeriod() + ' лет)' + ' ' + endStudy
    }
    $studentTR.append($fioTD)
    $studentTR.append($birthDateTD)
    $studentTR.append($startStudyTD)
    $studentTR.append($endStudyTD)
    $studentTR.append($occupationTD)
    
    return $studentTR;
}
// Сортировка массива по параметрам
function getSortStudents(prop, dir){
    const studentsCopy = [...students]
    return studentsCopy.sort(function (studentA, studentB){
        if((!dir == false ? studentA[prop] < studentB[prop] : studentA[prop] > studentB[prop]))
        return -1;
    })
}
// Отррисовка
function render(){
    let studentsCopy = [...students];
    const fioVal = document.getElementById('inputFio').value,
          occupationVal = document.getElementById('inputFac').value,
          startVal = document.getElementById('inputDateStart').value,
          endVal = document.getElementById('inputDateEnd').value

    studentsCopy = getSortStudents(column, columnDir)
    if(fioVal !== '') studentsCopy = filter(studentsCopy, column, fioVal)
    if(occupationVal !== '') studentsCopy = filter(studentsCopy, 'occupation', occupationVal)
    if(startVal !== '') studentsCopy = filter(studentsCopy, 'startStudy', startVal)
    if(endVal !== '') studentsCopy = filter(studentsCopy, 'endStudy', endVal)

    // studentsCopy = filter(function())
    $studentList.innerHTML = ''
    for(const student of studentsCopy){
        $studentList.append(newStudentTR(student))
    }    
}
// события сортировки
$studentListTHAll.forEach(element => {
    element.addEventListener('click', function(){
        column = this.dataset.column;
        columnDir = !columnDir
        render()
    })
})
// Валидация
const validation = new JustValidate('#form', {
  errorFieldCssClass: 'is-invalid',
});
validation
  .addField('#surname', [
    {
      rule: 'minLength',
      rule: 'required',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#name', [
    {
      rule: 'minLength',
      rule: 'required',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#lastName', [
    {
      rule: 'minLength',
      rule: 'required',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  .addField('#startStudy', [
    {
      rule: 'minNumber',
      rule: 'required',
      value: 2000,
    },
    {
      rule: 'maxNumber',
      value: new Date().getFullYear(),
    },
  ])
  .addField('#occupation', [
    {
      rule: 'minLength',
      rule: 'required',
      value: 3,
    },
    {
      rule: 'maxLength',
      value: 30,
    },
  ])
  // Добавление в массив после валидации
  .onSuccess((validation) => {
    students.push(new Student(
      document.getElementById('name').value.trim(),
      document.getElementById('surname').value.trim(),
      document.getElementById('lastName').value.trim(),
      Number(document.getElementById('startStudy').value.trim()),
      new Date(document.getElementById('birthDate').value.trim()),
      document.getElementById('occupation').value.trim(),
      document.endStudy = (Number(document.getElementById('startStudy').value.trim())) + 4,
  ))
      render()
      document.getElementById('name').value = '',
      document.getElementById('surname').value = '',
      document.getElementById('lastName').value = '',
      document.getElementById('startStudy').value = '',
      document.getElementById('birthDate').value = '',
      document.getElementById('occupation').value = '' 
    console.log('Validation passes and form submitted', validation);
  });

render();
// Фильтр по Имени году и должности
function filter(arr, prop, value){
    let result = [],
        copy = [...arr]
    for (const item of arr){
        if (String(item[prop]).includes(value) == true) result.push(item)
        if (String(item[prop]).toLowerCase().includes(value) == true) result.push(item)
    }
    return result
}
document.getElementById('filter-form').addEventListener('keyup', function(event){
  event.preventDefault()
  setTimeout(render(students),1000);
  clearTimeout(render(students));  
})
render(students)
input.value = '';
