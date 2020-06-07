const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const axios = require("axios"); 
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function ask() {
    const specialQuestions = [
        {
            type: "input", 
            name: "office", 
            message: "What is your office number?"
        }, 
        {
            type: "input", 
            name: "ghUn", 
            message: "What is your Github Username?"
        },
        {
            type: "input", 
            name: "school", 
            message: "What university are you graduating from?"
        }
    ]

    const questions = [
        {
            type: "list",
            message: "What type of Employee would you like to add?",
            name: "empType",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {
            type: "input",
            name: "name",
            message: "What is your name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is your ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address"
        }
    ]

    inquirer.prompt(questions).then((resp1) => { 
        if(resp1.empType === 'Manager') {
            inquirer.prompt(specialQuestions[0]).then((resp2) => {
                const manager = {...resp1, ...resp2}; 
            });
        } else if(resp1.empType === 'Engineer') {
            inquirer.prompt(specialQuestions[1]).then((resp3) => {
                const engineer = {...resp1, ...resp3}; 
            });
        } else {
            inquirer.prompt(specialQuestions[2]).then((resp4) => {
                const intern = {...resp1, ...resp4}
            }); 
        }; 
    });
};

// function init() {
//     inquirer.prompt(empType); 
//         if(empType.choices === 'Manager') {
//             inquirer.prompt(manager).then((inquirerResponses) => {
//                 const answers = JSON.parse(inquirerResponses); 
//                 const name = answers.name; 
//                 const id = answers.id; 
//                 const email = answers.email; 
//                 const office = answers.office; 
//                 const manager = new Manager(name, id, email, office); 

//             }) 
//     }

ask();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work 
