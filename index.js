// variables
var Employee = require("./lib/Employee")
var Manager = require("./lib/Manager");
var Engineer = require("./lib/Engineer");
var Intern = require("./lib/Intern");
var inquirer = require("inquirer");
var path = require("path");
var fs = require("fs");
// output
var OUTPUT_DIR = path.resolve(__dirname, "output");
var outputPath = path.join(OUTPUT_DIR, "team.html");

var render = require("./lib/htmlRender");
const {createInflate} = require("zlib");
class Team {
    constructor() {
        this.teamSize = 0;
        this.team = [];
    }
}
const teamMembers = [];

function start() {
    managerQuery();

}
// manager questions
function managerQuery() {
    inquirer.prompt([
        // name
        {
            type: "input",
            name: "name",
            message: "What is the name of the team manager?"
        },
        // email
        {
            type: "input",
            name: "email",
            message: "What is the team Manager's email address:"
        },
        // id
        {
            type: "input",
            name: "id",
            message: "What is the team Manager's ID number:"
        },
        // office number
        {
            type: "input",
            name: "officeNumber",
            message: "What is the team Manager's office number?"
        }
    ]).then(val => {
        const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
        console.log(manager);
        teamMembers.push(manager);
        console.log(teamMembers);
        addTeamMember();
    })
    .catch(error => {
        if (error.isTtyError) {
        } else {
        }
    });
};

// adding a team member
function addTeamMember() {
    inquirer.prompt([{
        type: "prompt",
        name: "Adding a team member",
        message: "Are you adding a team member?"
    },
    {
        type: "list",
        name: "what_type",
        message: "Add engineer or intern?",
        choices: ["Engineer", "Intern", "None"]
    }
    ]).then(val => {
        switch (val.what_type) {
            case "Engineer": 
                engineerQuery()
                break;
            case "Intern":
            internQuery()
            default:
                createFile()
                break;
        }
    }) 
}


// engineer questions

function engineerQuery() {
    inquirer.prompt([{
        // name
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        // email
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email address:"
        },
        // id
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID number:"
        },
        // github
        {
            type: "input",
            name: "github",
            message: "What is the engineer's GitHub URL?"
        }
    ]).then(val => {
        const engineer = new Engineeer(val.name, val.id, val.email, val.officeNumber);
        console.log(engineer);
        teamMembers.push(engineer);
        addTeamMember();
    })
    .catch(error => {
        if (error.isTtyError) {
        } else {
        }
    });
};

// intern questions

function internQuery() {
    inquirer.prompt([{
        // name
            type: "input",
            name: "name",
            message: "What is the Intern's name?"
        },
        // email
        {
            type: "input",
            name: "email",
            message: "What is the Intern's email address:"
        },
        // id
        {
            type: "input",
            name: "id",
            message: "What is the Intern's ID number:"
        },
        // school
        {
            type: "input",
            name: "school",
            message: "What is the intern's school?"
        }
    ]).then(val => {
        const manager = new Manager(val.name, val.id, val.email, val.officeNumber);
        console.log(manager);
    })
    .catch(error => {
        if (error.isTtyError) {
        } else {
        }
    });
};
// create an output
function createFile() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMembers), "UTF-8");
}
start();