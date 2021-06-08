use employees;

INSERT INTO department
    (name)
VALUES
    ('Information Technology'),
    ('Software Development'),
    ('Cybersecurity & Technology Risk'),

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Senior Tech Support', 50000, 1),
    ('Desktop Support', 40000, 1),
    ('Senior Full Stack Developer', 110000, 2),
    ('Full Stack Developer', 80000, 2),
    ('CISO', 180000, 3),
    ('Information Risk Manager', 127000, 3),

INSERT INTO employees
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Francis', 'Sizemore', 1, NULL),
    ('Matt', 'Klass', 2, 1),
    ('Meredith', 'Farrar', 3, NULL),
    ('Robert', 'Neal', 4, 3),
    ('Nathan', 'Buker', 5, NULL),
    ('Craig', 'Kohler', 6, 5)
