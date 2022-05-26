const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");
const fs = require('fs');


class App {

    constructor() {

        //List of employees
        this.employees = [];

        //questions for employee information
        this.employeePrompt = [
            {
                type: "list",
                message: "What is your role",
                name: "role",
                choices: ["Manager", "Engineer", "Intern", "Exit"],
            },
            {
                type: "input",
                message: ({role}) => `Creating a new ${role}?. What is the ${role}'s name?`,
                name: "name",
                when: ({role}) => role != "Exit",
                validate: name => {
                    if (name) {
                        return true;
                    } else {
                        console.log('You need to enter name.');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s employee ID?`,
                name: "id",
                when: ({role}) => role != "Exit",
                validate: id => {
                    if (id) {
                        return true;
                    } else {
                        console.log('You need to enter an employee ID.');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message:  ({role}) =>  `What is the ${role}'s email?`,
                name: "email",
                when: (data) => data.role != "Exit",
                validate: email => {
                    if (email) {
                        return true;
                    } else {
                        console.log('You need to enter an email.');
                        return false;
                    }
                }
            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s office number?`,
                name: "officeNumber",
                when: ({role}) => role === "Manager",
                validate: function (value) {
                    return value.match(/^\d+$/) ? true : "Please enter a valid number";
                }

            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s github?`,
                name: "github",
                when: ({role}) => role === "Engineer",
                validate: github => {
                    if (github) {
                        return true;
                    } else {
                        console.log('You need to enter a github username.');
                        return false;
                    }
                }

            },
            {
                type: "input",
                message:  ({role}) => `What is the ${role}'s school?`,
                name: "school",
                when: ({role}) => role === "Intern",
                validate: school => {
                    if (school) {
                        return true;
                    } else {
                        console.log('You need to enter a school.');
                        return false;
                    }
                }
            }
        ];
    }

    //start 
    start() {
        this.nextEmployee();
    }

    nextEmployee() {
        inquirer.prompt(this.employeePrompt).then(data => {
            switch (data.role) {
                case "Exit":
                    this.renderHTML();
                    console.log("Profile Generated");
                    break;
                case "Manager":
                    this.employees.push(new Manager(data.name, data.id, data.email, data.officeN));
                    this.nextEmployee();
                    break;
                case "Engineer":
                    this.employees.push(new Engineer(data.name, data.id, data.email, data.github));
                    this.nextEmployee();
                    break;
                case "Intern":
                    this.employees.push(new Intern(data.name, data.id, data.email, data.school));
                    this.nextEmployee();
                    break;
            }
        });
    }

    //render HTML
    
    renderHTML() {
        fs.readFile('template/main.html', 'utf8', (err, htmlString) => {

            htmlString = htmlString.split("<script></script>").join(this.getScript());

            fs.writeFile('output/index.html', htmlString, (err) => {
                // throws an error, you could also catch it here
                if (err) throw err;
                // success case, the file was saved
                console.log('HTML generated!');
            });
        });

    }

    //return javascript that generates an employee information card per employee in the employees list
    getScript() {

        var scripts = ``;
        this.employees.forEach(e => {
            var field = "";
            var iconClass = "";
            switch (e.getRole()) {
                case "Manager":
                    field = `Office #: ${e.getOfficeNumber()}`;
                    iconClass = `users`;
                    break;
                case "Engineer":
                    field = `Github: ${e.getGithub()}`;
                    iconClass = `cogs`;
                    break;
                case "Intern":
                    field = `School: ${e.getSchool()}`;
                    iconClass = `user-graduate`;
                    break;
            }

            var cardScript = `
            <script>
            var col = $('<div class="col-4">');
            var card = $('<div class="card mx-auto border-info mb-3" style="max-width: 18rem;">');
            var header1 = $('<div class="card-header text-center h4">');
            header1.text("${e.getName()}");
            var header2 = $('<div class="card-header text-center">');
            var icon = $('<i class="fas fa-${iconClass}">');
            header2.text(" ${e.getRole()}");
            header2.prepend(icon);
            var cardBody = $('<div class="card-body text-info">');
            var cardTitle = $('<h5 class="card-title">');
            cardTitle.text("Employee Information:");
            var cardText = $('<p class="card-text">');
            cardText.text("ID: ${e.getId()}");
            var cardText2 = $('<p class="card-text">');
            cardText2.text("Email: ${e.getEmail()}");
            var cardText3 = $('<p class="card-text">');
            cardText3.text("${field}");
            cardBody.append(cardTitle);
            cardBody.append(cardText);
            cardBody.append(cardText2);
            cardBody.append(cardText3);
    
            card.append(header1);
            card.append(header2);
            card.append(cardBody);
            col.append(card);
            $("#cards").append(col);    
            </script>        
            `;
            scripts += cardScript;

        });
        return scripts;
    }

}


module.exports = App;