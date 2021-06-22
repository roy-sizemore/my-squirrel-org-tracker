const connection = require('../config/connection');

class Org {
    constructor(connection) {
        this.connection = connection;
    };

    // Employee query functions
    // Create a new employee
    showAllEmployees() {
      return this.connection.query(
        "SELECT employees.id, employees.first_name, employees.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN role on employees.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employees manager on manager.id = employees.manager_id;"
      )
    }
    selectAllEmployeesByDepartmentId(dept) {
      return this.connection.query(
        "select employees.id, employees.first_name, employees.last_name, role.title from employees left join role on employees.role_id = role.id left join department on role.department_id = department.id WHERE department.id = ?", dept
        )
    }
    createEmployee(employee) {
      return this.connection.query("INSERT INTO employees SET ?", employee);
    }
    deleteEmployeeById(employeeId) {
      return this.connection.query("delete from employees where id = ?", employeeId);
    }
    updateEmployeeRoleById(roleId, employeeId){
      return this.connection.query("update employees set role_id = ? where id = ?", [roleId, employeeId])
    }
    updateEmployeeManagerByIds(managerId, employeeId){
      return this.connection.query("update employees set manager_id = ? where id = ?", [managerId, employeeId])
    }
    selectAllRoles(){
      return this.connection.query("select role.id, role.title, department.name as department, role.salary from role left join department on role.department_id = department.id;")
    }
    createRole(role){
      return this.connection.query("insert into role set ?", role)
    }
    deleteRoleById(roleId){
      return this.connection.query("delete from role where id = ?", roleId)
    }
    selectAllDepartments(){
      return this.connection.query("select department.id, department.name, sum(role.salary) as utilized_budget from department left join role on role.department_id = department.id left join employees on employees.role_id = role.id group by department.id, department.name");
    }
    createDepartment(department){
      return this.connection.query("insert into department set ?", department)
    }
    deleteDepartmentById(departmentId) {
      return this.connection.query("delete from department where id = ?", departmentId)
    }
}

module.exports = new Org(connection);