var Manager = require("./lib/Manager");
var Engineer = require("./lib/Engineer");
var Intern = require("./lib/Intern");
var inquirer = require("inquirer");
var path = require("path");
var fs = require("fs");

var OUTPUT_DIR = path.resolve(__dirname, "output");
var outputPath = path.join(OUTPUT_DIR, "team.html");

var render = require("./lib/htmlRenderer");