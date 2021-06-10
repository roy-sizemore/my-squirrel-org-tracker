const inquirer = require('inquirer');
const Org = require('./model');

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
                return selectAllEmployees();

            case 'Display all employees by department':
                return selectAllEmployeesByDepartmentId(departmentId);
            
            case 'Add an employee':
                return createEmployee(employee);
            
            case 'Delete an employee':
                return deleteEmployeeById(employeeId);
            
            case "Update an employee's role":
                return updateEmployeeRoleById(employeeId, roleId);
            
            case "Update an employee's manager":
                return updateEmployeeManagerByIds(employeeId, managerId);

            case 'Show all roles':
                return selectAllRoles();

            case 'Create new role':
                return createRole(role);

            case 'Delete role':
                return deleteRoleById(roleId);

            case 'Show all departments':
                return selectAllDepartments();

            case 'Add a department':
                return createDepartment(department);

            case 'Delete a department':
                return deleteDepartmentById(departmentId);

            default:
                process.exit();
        };
    });
