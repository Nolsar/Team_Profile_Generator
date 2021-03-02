# Team_Profile_Generator

## Description
Team Generator is a Node CLI that takes in information about employees and generates an HTML webpage that displays summaries for each person. The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns. This assignment must also pass all unit tests. When the user has completed building the team, the application will create an HTML file that displays a nicely formatted team roster based on the information provided by the user.

## Table of Contents

Please use the links in the table below to navigate the ReadMe contents.

- [User Story](#user-story)
- [Get Started](#get-started)
- [Installation Requirements](#installation-requirements)
- [Dependencies](#dependencies)
- [User input](#user-input)
- [Output](#output)


## User Story

```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

* Demo of the application
[click here](https://drive.google.com/file/d/1qdktsnKy3m5CVM3T70uM8_Br906OzVw6/view)


### Get Started

#### Installation Requirements 

- **Node.js** - Make sure Node.js is installed in your machine. If Node.js is not installed on your machine, [click here](https://nodejs.org/en/) to download the application.


#### Dependencies
  
- **Jest** - The [jest](https://jestjs.io/) is the Js testing framework that is used for unit testing in this project.
- **NPM Inquirer Package** - The [NPM inquirer package](https://www.npmjs.com/package/inquirer) is needed to prompt questions in the commandline.

both these packages are already listed as dependencies in the `package.json` file, so you will only need to run the `npm install` command in your terminal to access them.


It is recommended that you follow this workflow:
1. Make sure to install the JSON packages by typing `npm install` in the terminal.
2. Run tests with `npm run test` in the terminal
3. Create or update classes to pass a single test case

### Testing

To run test a test simply run `npm run test` to run all suites or  `npm run watch` to continue to watch or run a specific suite.

- Screenshot that demonstrates all unit tests pass.

![Unit Test Pass](./Assets\PassTests.jpg) -->

### User input

The project will prompt the user with questions to build an engineering team. An engineering team consists of a manager, and any number of engineers and interns.

### Output

The project generates a `team.html` page in the `output` directory, that displays a nicely formatted team roster. Each team member displays the following in no particular order:

  * Name

  * Role

  * ID

  * Role-specific property (School, link to GitHub profile, or office number)








