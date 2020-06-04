// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id, email) {
        this.name = name; 
        this.id = id; 
        this.email = email; 
    }

    getName() {

    }

    getId() {

    }

    getEmail() {

    }

    getRole(type = 'Employee') {
        return type; 
    }
}

module.exports = Employee; 