// intern function
const Employee = require("./Employee");

class Intern extends Employee {
    constructor(name, id, email, school) {
        // name, id, email
        super(name, id, email);
        // title
        this.title = "Intern";
        // school
        this.school = school;
       
    };
// get items
    getSchool() {
        return this.school;
    }
}
module.exports = Intern;