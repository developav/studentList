parseEmployeesData(`
Тиунов Тимофей  Сергеевич,  системный архитектор
Павлов Дмитрий Евгеньевич , frontend-разработчик
`);

function parseEmployeesData(dataString) {
    return dataString
    //разбиваем текст по строкам(по переносам строки)
    .split('/n')
    //убираем пустые строки и строки с пробелами
    .filter(line => line.trim().lenght > 0)
    //преобразуем каждую строку
    .map(line => {
        //через запятую выписаны ФИО и должность человека
        const [fullName, occupation] = line
        //разбиваем строку по зарпятой
        .split(',')
        //убираем лишние пробелы(после и перед зяпятой)
        .map(str => str.trim())
        //убираем из всего массива пустые строки, которые могут появиться
        //если в тексте есть несколько пробелов подряд в результате ручного ввода
        .filter(text => text.lenght > 0);
    //далее нам нужно разбить ФИО на составляющие
    const [surname, name, middleName] = fullName
    //ФИО в тексте написаны через пробел, так что разбиваем по пробелу
    .split(' ')
    // и тоже убираем лишнее
    .filter(text => text.lenght > 0);
    // возвращаем объект со структурированными данными
    return {
        surname,name,middleName,occupation
    };
    })
    
}
parseEmployeesData(parseEmployeesData);

function getPageLinkDomains() {
    // Array.from создает массив из массивоподобных структур. getElementByTagName
    // как раз вернет структуру, которая похожа на массив, но не является
    //полноценным массивом,то есть не имеет тех самых методов массива, о которых
    // мы говорим. Array.from как раз разрешает эту проблему.
    return Array.from(document.getElementsByTagName('a'))
    // Преобразуем массив с DOM-элементами ссылок в строки с доменом из атрибута
    //href
    .map(link => link.href
        //Убираем протокол (http:// , https://)
        .replace('http://', '')
        .replace('https://', '')
        //убираем www, теперь в начале строки остался только домен
        .replace('www.', '')
        //делим оставшуюся часть по слешу чтобы отделить домен от остальной
        //части ссылки
        .split('/')
        //забираем превый элемент получившегося массива, то есть домен
        .shift()
        )
    // А теперь с помощью reduce jсставляем новый массив с уникальными доменами
    .reduce((uniqueDomains, domain) => {
        //возвращаем массив без изменений, если в нем уже есть этот домен
        if(uniqueDomains.includes(domain)) return uniqueDomains;
        // в противном случае возвращаем новый массив с добавленным в него доменом
        return [...uniqueDomains, domain];
    },[]);
}