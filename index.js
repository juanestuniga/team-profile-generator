var Employee = require("./lib/Employee")
var Manager = require("./lib/Manager");
var Engineer = require("./lib/Engineer");
var Intern = require("./lib/Intern");
var inquirer = require("inquirer");
var path = require("path");
var fs = require("fs");

var OUTPUT_DIR = path.resolve(__dirname, "output");
var outputPath = path.join(OUTPUT_DIR, "team.html");

var render = require("./lib/htmlRenderer");

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
    ]);
};

managerQuery()

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
    ]);
};
engineerQuery();

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
    ]);
};