// TODO: Write code to define and export the Employee class

const fs = require("fs");

class Employee {
    constructor(name,id,email) {
        this.name = name;
        this.id = id;
        this.email = email;
        
    
    }
    getName() {
       return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }

    getRole() {
        return "Employee";
    }

    
    
    // nameOffEmployee(){
    //     this.name.forEach(member =>{
    //         console.log(`${member.name}`)
    //     })
    // }
   
}
// const Manager = new Employee("Ed",1,"ed@gmail.com","manager");
// const Intern = new Employee()
// const Employee = new Employee("e",1,)
module.exports = Employee;