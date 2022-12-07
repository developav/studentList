export default class Student {
    
    constructor(name, surname, lastName, startStudy, birthDate, occupation, endStudy) {
        this.name = name
        this.surname = surname
        this.lastName = lastName
        this.startStudy = startStudy
        this.birthDate = birthDate
        this.occupation = occupation
        this.endStudy = endStudy
    }

    get fio(){
        return this.surname + ' ' + this.name + ' ' + this.lastName
    }

    getStudPeriod(){
        const currentTime = new Date()
        return currentTime.getFullYear() - this.startStudy
    }

    getBirthDateString(){
        const yyyy = this.birthDate.getFullYear();
        let mm = this.birthDate.getMonth() + 1;
        let dd = this.birthDate.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return dd + '.' + mm + '.' + yyyy;
    }
    getAge(){
        const today = new Date();
        let age = today.getFullYear() - this.birthDate.getFullYear();
        let m = today.getMonth() - this.birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())){
            age--;
        }
        return age;
    }
    getOccupation(){
        return this.occupation
    }
    getEndStud(){
        let end = this.startStudy + 4;
        return end;
    }
    
}




