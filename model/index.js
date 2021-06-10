const inquirer = require('inquirer');
const connection = require('../config/connection');
const menu = require('../index');
require('console.table');

class Org {
    constructor(connection) {
        this.connection = connection;
    };

    // Employee query functions
    // Create a new employee
    createEmployee() {
        const employee = inquirer.prompt([
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
        
          const role = selectAllRoles().map(({ id, title }) => ({
            name: title,
            value: id
          }));
        
          const { roleId } = inquirer.prompt({
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
        
          const { managerId } = inquirer.prompt({
            name: 'managerId',
            message: "Please enter the employee's manager: ",
            type: 'list',
            choices: manager
          });
        
          employee.manager_id = managerId;
        
        console.table(this.connection.query("insert into employees set ?", employee));
        menu();
    };

    // Selects all employees and joins with roles/departments tables
    showAllEmployees() {
        console.table(this.connection.query("select employees.id, employees.first_name, employees.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager from employees left join role on employees.role_id = role.id left join department on role.department_id = department.id left join employees manager on manager.id = employees.manager_id;"));
        menu();
    };

    // Just returns all employees w/o displaying them
    selectAllEmployees() {
        return this.connection.query("select employees.id, employees.first_name, employees.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager from employees left join role on employees.role_id = role.id left join department on role.department_id = department.id left join employees manager on manager.id = employees.manager_id;");
    };

    // Updates employee's role
    updateEmployeeRoleById() {
        const allEmployees = selectAllEmployees();

        const employee = allEmployees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = inquirer.prompt([
          {
            name: 'employeeId',
            message: 'Please enter an employee to update their role: ',
            type: 'list',
            choices: employee
          }
        ]);
      
        const allRoles = selectAllRoles();
      
        const role = allRoles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
      
        const { roleId } = inquirer.prompt([
          {
            name: 'roleId',
            message: 'What is the new role?',
            type: 'list',
            choices: role
          }
        ]);
      
        console.table(this.connection.query("update employees set role_id = ? where id = ?", [roleId, employeeId]));
        menu();
    };
    
    // Updates employee's manager by employee ID and manager ID
    updateEmployeeManagerByIds() {
        const allEmployees = selectAllEmployees();

        const employee = allEmployees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = inquirer.prompt([
          {
            name: 'employeeId',
            message: 'Please enter an employee to update: ',
            type: 'list',
            choices: employee
          }
        ]);
      
        const allManagers = this.connection.query("select id, first_name, last_name from employee where id != ?", employeeId);
      
        const manager = allManagers.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { managerId } = inquirer.prompt([
          {
            name: 'managerId',
            message: 'Please select a manager for this employee: ',
            type: 'list',
            choices: manager
          }
        ]);
      
        console.table(this.connection.query("update employees set manager_id = ? where id = ?", [managerId, employeeId]));
        menu();
    };

    // Delete's an employee by their ID
    deleteEmployeeById() {
        const allEmployees = selectAllEmployees();

        const employee = allEmployees.map(({ id, first_name, last_name }) => ({
          name: `${first_name} ${last_name}`,
          value: id
        }));
      
        const { employeeId } = inquirer.prompt([
          {
            name: 'employeeId',
            message: 'Please select an employee to remove: ',
            type: 'list',
            choices: employee
          }
        ]);
      
        console.table(this.connection.query("delete from employees where id = ?", employeeId));
        menu();
    };

    // Role query functions
    // Creates a new role
    createRole() {
        const allDepartments = selectAllDepartments();

        const department = allDepartments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
      
        const role = inquirer.prompt([
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
      
        console.table(this.connection.query("insert into role set ?", role));
        menu();
    };

    // Selects all roles and joins w/departments DB
    showAllRoles() {
        console.table(this.connection.query("select role.id, role.title, department.name as department, role.salary from role left join department on role.department_id = department.id;"));
        menu();
    };

    // Just returns all roles w/o displaying them
    selectAllRoles() {
        return this.connection.query("select role.id, role.title, department.name as department, role.salary from role left join department on role.department_id = department.id;")
    };

    // Deletes a role by ID
    deleteRoleById() {
        const allRoles = selectAllRoles();

        const role = allRoles.map(({ id, title }) => ({
          name: title,
          value: id
        }));
      
        const { roleId } = inquirer.prompt([
          {
            name: 'roleId',
            message: 'Please select a role to remove: ',
            type: 'list',
            choices: role
          }
        ]);
      
        console.table(this.connection.query("delete from role where id = ?", roleId));
        menu();
    };

    // Department query functions
    // Selects all departments and joins w/employees and role DBs (includes budget bonus)
    showAllDepartments() {
        console.table(this.connection.query("select department.id, department.name, sum(role.salary) as utilized_budget from department left join role on role.department_id = department.id left join employee on employee.role_id = role.id group by department.id, department.name"));
        menu();
    };

    // Just returns all departments w/o displaying them
    selectAllDepartments() {
        return this.connection.query("select department.id, department.name, sum(role.salary) as utilized_budget from department left join role on role.department_id = department.id left join employee on employee.role_id = role.id group by department.id, department.name");
    };

    // Creates a department
    createDepartment() {
        const department = inquirer.prompt([
            {
              name: 'name',
              message: 'Please enter a name for the new department: ',
              type: 'input'
            }
          ]);
        
        console.table(this.connection.query("insert into department set ?", department));
        menu();
    };

    // Deletes a department
    deleteDepartmentById() {
        const allDepartments = selectAllDepartments();

        const department = allDepartments.map(({ id, name }) => ({
          name: name,
          value: id
        }));
      
        const { departmentId } = inquirer.prompt({
          name: 'departmentId',
          message: 'Please select a department to remove: ',
          type: 'list',
          choices: department
        });
      
        console.table(this.connection.query("delete from department where id = ?", departmentId));

        menu();
    };

    // Select all employees by department ID and joins with role DB
    selectAllEmployeesByDepartmentId() {
        const department = selectAllDepartments().map(({ id, name }) => ({
          name: name,
          value: id
        }));
      
        const { departmentId } = inquirer.prompt([
          {
            type: 'list',
            name: 'departmentId',
            message: 'Please select a department: ',
            choices: department
          }
        ]);
        console.table(this.connection.query("select employees.id, employees.first_name, employees.last_name, role.title from employees left join role on employees.role_id = role.id left join department department on role.department_id = department.id where department.id = ?;", departmentId));
        menu();
    };
};

module.exports = new Org(connection);
