// employee function
class Employee {
    constructor(name, id, email) {
        // name
        this.name = name;
        // id
        this.id = id;
        // title
        this.title = "Employee"
        // email
        this.email = email;
        
    }

// get items
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getRole() {
        return this.title
    }
    getEmail() {
        return this.email;
    }
    
}
module.exports = Employee