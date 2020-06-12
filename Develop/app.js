// Access to all sub classes to parent class 'Employee'
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Access to necessary node modules
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Access to .js file handling html rendering
const render = require("./lib/htmlRenderer");


// Assign absolute path to directory 'output', assign to OUTPUT_DIR
const OUTPUT_DIR = path.resolve(__dirname, "output");

// Join the filename 'team.html' to OUTPUT_DIR
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Define async function 'collectInputs', with one parameter 'inputs', an empty array
const collectInputs = async (inputs = []) => {

    // Define 'questions', an array of objects, to be used later as inquirer prompt questions
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
            message: "What is this employee's name?",

            // Check to make sure user didn't enter a blank string as a response
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return "You did not enter any text. Please enter the name of this employee."; 
            }
        },

        {
            type: "input",
            name: "id",
            message: "What is their ID number?", 

            // Check to make sure user entered a numeric answer, not including alpha characters
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "You entered alpha characters. Please enter an ID#, containing only numeric characters";
            }
        },

        {
            type: "input",
            name: "email",
            message: "What is their email address", 

            // Check that email address follows abc@abc.com convention
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "You did not enter a valid email address. Please enter a valid email address (ie. ___@___.___";
            }
        },

        {
            type: "input", 
            name: "officeNumber", 
            message: "What is your office number?", 

            // The 'when' property is used to prompt with this message only when 'questions.empType' === "Manager"
            when: (questions) => questions.empType === "Manager"
        },

        {
            type: "input", 
            name: "ghUn", 
            message: "What is your Github Username?", 
            when: (questions) => questions.empType === "Engineer"
        },

        {
            type: "input", 
            name: "school", 
            message: "What University will you be graduating from?", 
            when: (questions) => questions.empType === "Intern"
        },

        {
            // Prompt the user if they would like to add another employee
            type: 'confirm',
            name: 'again',
            message: 'Enter another input? ',
            default: true
        }
    ];

    // define object { again, ...answers } to take in the answers from the inquirer prompt, where the first value
    // is the boolean returned from the 'confirm' prompt
    // As 'questions' is an async function, this script will not proceed further until this object receives its values from 
    // the 'questions' prompt 
    const { again, ...answers } = await inquirer.prompt(questions);

    
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
};

const init = async () => {
    const inputs = await collectInputs();
    const employees = [];

    const engineers = inputs.filter(inputs => inputs.empType === 'Engineer');
    const interns = inputs.filter(inputs => inputs.empType === 'Intern');
    const managers = inputs.filter(inputs => inputs.empType === 'Manager');

    engineers.forEach(engineer => {
        employees.push(new Engineer(engineer.name, engineer.id, engineer.email, engineer.ghUn));
    });

    interns.forEach(intern => {
        employees.push(new Intern(intern.name, intern.id, intern.email, intern.school));
    });

    managers.forEach(manager => {
        employees.push(new Manager(manager.name, manager.id, manager.email, manager.officeNumber));
    });

    console.log(employees); 

    const employeeHtml = render(employees);

    fs.writeFile(outputPath, employeeHtml, err => !err ? console.log("HTML was rendered!") : console.log("There was an error during HTML rendering!"));     
};

init();



