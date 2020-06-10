const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const collectInputs = async (inputs = []) => {

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
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return 'Please enter an actual name'; 
            }
        },

        {
            type: "input",
            name: "id",
            message: "What is their ID number?", 
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return 'Please enter an actual ID#';
            }
        },

        {
            type: "input",
            name: "email",
            message: "What is their email address", 
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return 'Please enter an actual email address';
            }
        },

        {
            type: "input", 
            name: "officeNumber", 
            message: "What is your office number?", 
            when: (questions) => questions.empType === 'Manager'
        },

        {
            type: "input", 
            name: "ghUn", 
            message: "What is your Github Username?", 
            when: (questions) => questions.empType === 'Engineer'
        },

        {
            type: "input", 
            name: "school", 
            message: "What University will you be graduating from?", 
            when: (questions) => questions.empType === 'Intern'
        },

        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another input? ',
            default: true
        }
    ];

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

    fs.writeFile(outputPath, employeeHtml, err => err ? console.log("HTML was rendered!") : console.log("There was an error during HTML rendering!")); 

    // fs.writeFile(outputPath, html, err => err ? console.log("Error in rendering HTML!") : console.log("HTML was rendered!")); 
    // fs.writeFile("engineers.json",  JSON.stringify(engineers, null, ' '), err => err ? console.log("Error in writing engineers.json") : console.log("engineers.json written")); 
    // fs.writeFile("interns.json", JSON.stringify(interns, null, ' '), err => err ? console.log("Error in writing interns.json") : console.log("interns.json written")); 
    // fs.writeFile("manager.json", JSON.stringify(managers, null, ' '), err => err ? console.log("Error in writing manager.json") : console.log("manager.json written"));
    
};

init();



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