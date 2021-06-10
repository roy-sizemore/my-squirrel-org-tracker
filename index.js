const inquirer = require('inquirer');
const Org = require('./model');

const menu = () => {
    inquirer
        .prompt([
            {
                name: 'userInput',
                message: 'Please select from the following: ',
                choices: [
                    'Display all employees',
                    'Display all employees by department',
                    'Add an employee',
                    'Delete an employee',
                    "Update an employee's role",
                    "Update an employee's manager",
                    'Show all roles',
                    'Create new role',
                    'Delete role',
                    'Show all departments',
                    'Add a department',
                    'Delete a department',
                    'Exit'
                ]
            }
    ]).then((answer) => {
        switch(answer.userInput) {
            case 'Display all employees':
                return showAllEmployees();

            case 'Display all employees by department':
                return selectAllEmployeesByDepartmentId();
            
            case 'Add an employee':
                return createEmployee();
            
            case 'Delete an employee':
                return deleteEmployeeById();
            
            case "Update an employee's role":
                return updateEmployeeRoleById();
            
            case "Update an employee's manager":
                return updateEmployeeManagerByIds();

            case 'Show all roles':
                return selectAllRoles();

            case 'Create new role':
                return createRole();

            case 'Delete role':
                return deleteRoleById();

            case 'Show all departments':
                return selectAllDepartments();

            case 'Add a department':
                return createDepartment();

            case 'Delete a department':
                return deleteDepartmentById();

            default:
                process.exit();
        };
    });
};

menu();

module.exports = menu;
