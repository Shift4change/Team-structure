const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// const OUTPUT_DIR = path.resolve(OUTPUT_DIR, "team.html");
const outputPath = path.resolve(__dirname, "output","team.html");

const render = require("./lib/htmlRenderer");


let employees = [];


const questions = function () {


    inquirer.prompt([{
        type: 'input',
        message: 'What is Employee name?',
        name: 'name'
    },
    {
        type: 'input',
        message: 'What is Employee ID?',
        name: 'id'
    },
    {
        type: 'input',
        message: 'What is Employee Email Address?',
        name: 'email'
    },
    {
        type: 'list',
        message: 'What is Employee Title',
        choices: ['Manager', 'Engineer', 'Intern'],
        name: 'Title'
    },

    {
        type: 'input',
        message: 'what is Employee office number?',
        name: 'officeNumber',
        when: function (answers) {
            return answers.Title === "Manager";
        }


    },
    {
        type: 'input',
        message: 'what is Employee gitHub UserName?',
        name: 'github',
        when: function (answers) {
            return answers.Title === "Engineer";
        }


    },

    {
        type: 'input',
        message: 'what school do Employee attened?',
        name: 'school',
        when: function (answers) {
            return answers.Title === "Intern";
        }


    }


    ])

        .then(data => {
            switch (data.Title) {
                case "Manager":
                    const newManager = new Manager(data.name, data.id, data.email, data.officeNumber)


                    employees.push(newManager);
                    break;

                case "Engineer":
                    const newEngineer = new Engineer(data.name, data.id, data.email, data.github)
                    employees.push(newEngineer)
                    break;
                case "Intern":
                    const newIntern = new Intern(data.name, data.id, data.email, data.school)
                    employees.push(newIntern)
                    break;
            }

            inquirer
                .prompt({
                    type: 'list',
                    message: 'Do you have another Employee to add to team?',
                    name: 'another',
                    choices: ['Yes', 'No']
                })
                .then(data => {

                    if (data.another === "Yes") {
                        questions()
                    } else { console.log(employees);
                        
                        const html = render(employees);
                        console.log(html);
                        //create a new file using writefile() outputfolder html in the output file 
                        fs.writeFile(outputPath,html, err => {
                            if (err) {
                                return console.log(err);
                            }
                            console.log("succes!");
                        });
                        
                    }



                })
        })

}
questions();

// const manager = new Manager(managerAnswers.name, managerAnswers.id, ...);

// employees.push(manager);


// let exit = false;


// while(exit===false) {
//     inquirer.prompt([
//         {
//             name: "employeeType",
//             message: "what type of employee?",
//             type:"list",
//             choices: ["Engineer","Intern","I dont want  to add more"]

//         }

//     ]).then(function(employeeAnswer) {
//         if(employeeAnswer.employeeType){

//         }else if(employeeAnswer.employeeType ==="intern"){

//         } else {
//             exit = true;

//             const html = render(employees);


//             fs.write
//         }
//     })


// }


// })


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
// for the provided `render` function to work!```
