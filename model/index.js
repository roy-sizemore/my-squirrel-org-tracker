const connection = require("../config/connection");

class Org {
    constructor(connection) {
        this.connection = connection;
    };

    // Employee query functions
    // Create a new employee
    createEmployee(employee) {
        return this.connection.query("insert into employees set ?", employee);
    };

    // Selects all employees and joins with roles/departments tables
    selectAllEmployees() {
        return this.connection.query("select employees.id, employees.first_name, employees.last_name, role.title, department.name as department, role.salary, concat(manager.first_name, ' ', manager.last_name) as manager from employees left join role on employees.role_id = role.id left join department on role.department_id = department.id left join employees manager on manager.id = employees.manager_id;");
    };

    // Updates employee's role
    updateEmployeeRoleById(employeeId, roleId) {
        return this.connection.query("update employees set role_id = ? where id = ?", [roleId, employeeId]);
    };
    
    // Updates employee's manager by employee ID and manager ID
    updateEmployeeManagerByIds(employeeId, managerId) {
        return this.connection.query("update employees set manager_id = ? where id = ?", [managerId, employeeId]);
    };

    // Delete's an employee by their ID
    deleteEmployeeById(employeeId) {
        return this.connection.query("delete from employees where id = ?", employeeId);
    };

    // Role query functions
    // Creates a new role
    createRole(role) {
        return this.connection.query("insert into role set ?", role);
    };

    // Selects all roles and joins w/departments DB
    selectAllRoles() {
        return this.connection.query("select role.id, role.title, department.name as department, role.salary from role left join department on role.department_id = department.id;");
    };

    // Deletes a role by ID
    deleteRoleById(roleId) {
        return this.connection.query("delete from role where id = ?", roleId);
    };

    // Department query functions
    // Selects all departments and joins w/employees and role DBs (includes budget bonus)
    selectAllDepartments() {
        return this.connection.query("select department.id, department.name, sum(role.salary) as utilized_budget from department left join role on role.department_id = department.id left join employee on employee.role_id = role.id group by department.id, department.name");
    };

    // Creates a department
    createDepartment(department) {
        return this.connection.query("insert into department set ?", department);
    };

    // Deletes a department
    deleteDepartmentById(departmentId) {
        return this.connection.query("delete from department where id = ?", departmentId);
    };

    // Select all employees by department ID and joins with role DB
    selectAllEmployeesByDepartmentId(departmentId) {
        return this.connection.query("select employees.id, employees.first_name, employees.last_name, role.title from employees left join role on employees.role_id = role.id left join department department on role.department_id = department.id where department.id = ?;", departmentId);
    };
};

module.exports = new Org(connection);
