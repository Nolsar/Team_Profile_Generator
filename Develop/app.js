const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];


//Generic employee questions
const questions = [
  //Team member Role
  {
    type: 'list',
    name: 'role',
    message: "Select team member's role",
    choices: [
      'Engineer',
      'Intern',
      'Manager',
    ]
  },
  //Name
  {
    type: 'input',
    name: 'name',
    message: "Enter team member's name",
  },
  //id
  {
    type: 'input',
    name: 'id',
    message: 'What is your id number?',
  },
  //Email
  {
    type: 'input',
    name: 'email',
    message: "Enter team member's email address",
  },
];

//Manager specific questions
const managerQuestions = [{
  type: 'input',
  name: 'office',
  message: 'What is your office number?'
}];

//Intern specific questions
const internQuestions = [{
  type: 'input',
  name: 'school',
  message: 'What school did you go to?',
}];

//Engineer specific questions
const engineerQuestions = [{
  type: 'input',
  name: 'github',
  message: 'What is your Github username',
}];

//prompt to add team members
const moreEmployee = [{
  name: 'confirm',
  type: 'confirm',
  message: 'Would you like to add more team members?',
  default: false
}];

async function Question() {
  try {
    //first round of team member questions
    let mainAnswers = await inquirer.prompt(questions);

    // determines next set of question
    let role = await sendToNextPrompt(mainAnswers);

    // get the role specific questions
    let roleAnswers = await inquirer.prompt(role);

    // employee data compiled in an object 
    let employeeData = await { ...mainAnswers, ...roleAnswers };

    // takes the employee and builds with the appropriate constructor 
    let employee = await buildEmployee(employeeData);

    // push the created employee to the teamMembers array 
    teamMembers.push(employee);

    // ask if they would like to add more team members
    let employeeAdd = await inquirer.prompt(moreEmployee);

    // validate response for the next action
    addMoreOrRender(employeeAdd.confirm);
  }
  catch (err) {
    console.log(`There was an error somewhere in the async ${err}.`);
  }
};

//function to return the specific role questions needed for the next prompt 
function sendToNextPrompt(employee) {
  employee.role = employee.role;

  // console.log(employee); 

  switch (employee.role) {
    case 'Manager': return managerQuestions;
    case 'Intern': return internQuestions;
    case 'Engineer': return engineerQuestions;
    default: return `Something went wrong! did you pick a role?`;
  }
};

// builds a new Employee with the specific constructor
function buildEmployee(employee) {
  let name = employee.name;
  let id = employee.id;
  let email = employee.email;
  let role = employee.role;

  // console.log('build employee function', employee);

  switch (role) {
    case 'Manager': return new Manager(name, id, email, employee.officeNumber);
    case 'Intern': return new Intern(name, id, email, employee.school);
    case 'Engineer': return new Engineer(name, id, email, employee.gitHub);
    default: return 'Something went wrong in building an employee';
  }
}

function addMoreOrRender(confirm) {
  if (confirm) {
    // return back to the top of the questions to add in another employee 
    return Question();
  }
  // checking to see if this directory exist 
  fs.access(OUTPUT_DIR, (err) => {

    if (err) {
      // else we make the directory AND create the file 
      console.log(`This directory does not exist, Creating now!!!`);
      fs.mkdir(OUTPUT_DIR, (err) => (err) ? console.log(err) : writeHTML());

    } else {
      // else we just create the html file 
      writeHTML();
    }
  })
}

// function that writes the html
function writeHTML() {
  let html = render(teamMembers)

  fs.writeFile(outputPath, html, (err) => {
      (err) ? console.log(err) : console.log('The file has been written succesfully!');
  });
}

Question();