# Template Engine - Employee Summary

## Introduction

> For those who want a quick way to generate a static HTML page of a team, with bootstrap cards encapsulating:  employee types (ie. Manager, Engineer, Intern, etc), name, id#, email, office#, Github username and University of study. Using Node's Inquirer Module, this CLI app is a quick way to place your team's information on a simple, clean and intuitive UI to reference at any time. 

## Code Samples

> // Define 'questions', an array of objects, to be used later as inquirer prompt questions

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

## Installation

> Interested in trying this out for yourself? Simply clone this repository, open the 'Develop' directory in your CLI and perform a 'node app.js' command, and your journey towards a quick team summary tool will begin. 
