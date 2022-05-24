// engineer function
var Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name,id,email,github) {
        // name, id, email
        super(name,id,email);
        // title
        this.title = "Engineer";
        // github
        this.github = github;
    };
// get github
    getGithub() {
        return this.github;
    }
}
module.exports = Engineer;