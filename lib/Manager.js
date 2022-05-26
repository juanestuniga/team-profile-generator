// manager functions
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // name, id, email
        super(name, id, email);
        // title
        this.title = "Manager";
        // id
        this.id = id;
        // office number
        this.officeNumber = officeNumber;
        
    };
// get items
    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;