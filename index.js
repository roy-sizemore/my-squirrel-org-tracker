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
                return Org.selectAllEmployees();

            case 'Display all employees by department':
                return Org.selectAllEmployeesByDepartmentId(departmentId);
            
            case 'Add an employee':
                return Org.createEmployee(employee);
            
            case 'Delete an employee':
                return Org.deleteEmployeeById(employeeId);
            
            case "Update an employee's role":
                return Org.updateEmployeeRoleById(employeeId, roleId);
            
            case "Update an employee's manager":
                return Org.updateEmployeeManagerByIds(employeeId, managerId);

            case 'Show all roles':
                return Org.selectAllRoles();

            case 'Create new role':
                return Org.createRole(role);

            case 'Delete role':
                return Org.deleteRoleById(roleId);

            case 'Show all departments':
                return Org.selectAllDepartments();

            case 'Add a department':
                return Org.createDepartment(department);

            case 'Delete a department':
                return Org.deleteDepartmentById(departmentId);
        }
    });
