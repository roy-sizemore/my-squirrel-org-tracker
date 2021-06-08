DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;

use employees;

CREATE TABLE org (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(20) NOT NULL,
  salary DEC NOT NULL,
  org_id INT NOT NULL,
  --INDEX dep_ind (org_id),
  --CONSTRAINT fk_org FOREIGN KEY (org_id) REFERENCES org(id) ON DELETE CASCADE
);

CREATE TABLE employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  role_id INT NOT NULL,
  --INDEX role_ind (role_id),
  --CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INT,
  --INDEX man_ind (manager_id),
  --CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
);
