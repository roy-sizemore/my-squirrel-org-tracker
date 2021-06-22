const inquirer = require('inquirer');
const model = require('./model');
require("console.table");

start()

function start() {
    menu()
}

async function menu() {
    const { userInput } = await inquirer.prompt([
        {
            name: 'userInput',
            message: 'Please select from the following: ',
            type: 'list',
            choices: [
                {
                    name: 'Display all employees',
                    value: 'dispEmps'
                },
                {
                    name: 'Display all employees by department',
                    value: 'dispEmpsDept'
                },
                {
                    name: 'Add an employee',
                    value: 'addEmp'
                
                },
                {
                    name: 'Delete an employee',
                    value: 'delEmp'
                },
                {
                    name: "Update an employee's role",
                    value: 'updateRole'
                
                },
                {
                    name: "Update an employee's manager",
                    value: 'updateMgr'
                },
                {
                    name: 'Show all roles',
                    value: 'showRoles'
                },
                {
                    name: 'Create new role',
                    value: 'addRole'
                },
                {
                    name: 'Delete role',
                    value: 'delRole'
                },
                {
                    name: 'Show all departments',
                    value: 'showDepts'
                },
                {
                    name: 'Add a department',
                    value: 'addDept'
                },
                {
                    name: 'Delete a department',
                    value: 'delDept'
                },
                {
                    name: 'Exit',
                    value: 'quit'
                }
            ]
        }
    ]);
    switch(userInput) {
        case 'dispEmps':
            return showAllEmployees();
        case 'dispEmpsDept':
            return selectAllEmployeesByDepartmentId();       
        case 'addEmp':
            return createEmployee();
        case 'delEmp':
            return deleteEmployeeById();
        case "updateRole":
            return updateEmployeeRoleById();
        case "updateMgr":
            return updateEmployeeManagerByIds();
        case 'showRoles':
            return selectAllRoles();
        case 'addRole':
            return createRole();
        case 'delRole':
            return deleteRoleById();
        case 'showDepts':
            return selectAllDepartments();
        case 'addDept':
            return createDepartment();
        case 'delDept':
            return deleteDepartmentById();
        case 'quit':
            return quit();
    };
}

async function showAllEmployees(){
    const employees = await model.showAllEmployees();
    console.table(employees)
    menu();
}

async function selectAllEmployeesByDepartmentId() {
    const departments = await model.selectAllDepartments();

    const deptList = departments.map(({ id, name }) => ({
        name: name,
        value: id
      }));

    const { deptId } = await inquirer.prompt([
        {
            type: 'list',
            name: 'deptId',
            message: 'Please select a department: ',
            choices: deptList
        }
    ]);

    const employees = await model.selectAllEmployeesByDepartmentId(deptId)
    console.table(employees)
    
    menu();
}

async function createEmployee() {
    const employee = await inquirer.prompt([
        {
          name: 'first_name',
          message: "Please enter the employee's first name: ",
          type: 'input'
        },
        {
          name: 'last_name',
          message: "Please enter the employee's last name",
          type: 'input'
        }
      ]);
      const roles = await model.selectAllRoles();
      const employees = await model.showAllEmployees();
    
      const role = roles.map(({ id, title }) => ({
        name: title,
        value: id
      }))

      const { roleId } = await inquirer.prompt({
        name: 'roleId',
        message: "Please enter the employee's role: ",
        type: 'list',
        choices: role
      });

      employee.role_id = roleId;

      const manager = employees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
      }));
      manager.unshift({ name: 'None', value: null });

      const { managerId } = await inquirer.prompt({
        name: 'managerId',
        message: "Please enter the employee's manager: ",
        type: 'list',
        choices: manager
      });

      employee.manager_id = managerId;

      await model.createEmployee(employee);

      console.log(
        `Added ${employee.first_name} ${employee.last_name} to the database`
      );

      menu();
}

async function deleteEmployeeById() {
    const allEmployees = await model.showAllEmployees();
    
    const employee = allEmployees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await inquirer.prompt([
        {
            name: 'employeeId',
            message: 'Please select an employee to remove: ',
            type: 'list',
            choices: employee
        }
    ]);

    await model.deleteEmployeeById(employeeId);

    console.log(`Employee has been removed.`)

    menu();
}

async function updateEmployeeRoleById() {
    const allEmployees = await model.showAllEmployees();
    const employee = allEmployees.map(({ id, first_name, last_name }) => ({
        name: `${first_name} ${last_name}`,
        value: id
    }));

    const { employeeId } = await inquirer.prompt([
        {
            name: 'employeeId',
            message: 'Please enter an employee to update their role: ',
            type: 'list',
            choices: employee
        }
    ]);

    const allRoles = await model.selectAllRoles();

    const role = allRoles.map(({ id, title }) => ({
        name: title,
        value: id
    }));

    const { roleId } = await inquirer.prompt([
        {
            name: 'roleId',
            message: 'What is the new role?',
            type: 'list',
            choices: role
        }
    ]);
    await model.updateEmployeeRoleById(employeeId, roleId);

    console.log('Employee updated.')

    menu()
}

async function updateEmployeeManagerByIds() {
    const allEmployees = await model.showAllEmployees();

    const employee = allEmployees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
    }));

    const { employeeId } = await inquirer.prompt([
    {
        name: 'employeeId',
        message: 'Please enter an employee to update: ',
        type: 'list',
        choices: employee
    }]);

    const allManagers = await model.connection.query("select id, first_name, last_name from employees where id != ?", employeeId);

    const manager = allManagers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
    }));

    const { managerId } = await inquirer.prompt([
        {
            name: 'managerId',
            message: 'Please select a manager for this employee: ',
            type: 'list',
            choices: manager
        }
        ]);

        await model.updateEmployeeManagerByIds(managerId, employeeId);

        console.log("Employee updated.")

        menu();
};

async function selectAllRoles() {
    const roles = await model.selectAllRoles();
        console.table(roles);
        menu();
}

async function createRole() {
    const allDepartments = await model.selectAllDepartments();

    const department = allDepartments.map(({ id, name }) => ({
    name: name,
    value: id
    }));

    const role = await inquirer.prompt([
    {
        name: 'title',
        message: "Please enter the role's name: ",
        type: 'input'
    },
    {
        name: 'salary',
        message: "Please enter the role's salary: ",
        type: 'input'
    },
    {
        name: 'department_id',
        message: "Please enter the role's department: ",
        type: 'list',
        choices: department
    }
    ]);

    await model.createRole(role)
    console.log(`Added ${role}.`);
    menu();
};

async function deleteRoleById() {
    const allRoles = await model.selectAllRoles();

    const role = allRoles.map(({ id, title }) => ({
    name: title,
    value: id
    }));

    const { roleId } = await inquirer.prompt([
        {
            name: 'roleId',
            message: 'Please select a role to remove: ',
            type: 'list',
            choices: role
        }
    ]);

    console.log('Role has been removed.');
    menu();
}

async function selectAllDepartments() {
    const allDepts = await model.selectAllDepartments()
    console.table(allDepts);
    menu();
}

async function createDepartment() {
    const department = await inquirer.prompt([
        {
          name: 'name',
          message: 'Please enter a name for the new department: ',
          type: 'input'
        }
      ]);
    
    await model.createDepartment(department);
    console.log('Department added.')
    menu();
}

async function deleteDepartmentById() {
    const allDepartments = await model.selectAllDepartments();

    const department = allDepartments.map(({ id, name }) => ({
    name: name,
    value: id
    }));

    const { departmentId } = await inquirer.prompt({
    name: 'departmentId',
    message: 'Please select a department to remove: ',
    type: 'list',
    choices: department
    });

    await model.deleteDepartmentById(departmentId);

    console.log('Department removed.')

    menu();
}

function quit() {
    process.exit()
}
