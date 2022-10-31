import { employees_gender, employees, PrismaClient } from "@prisma/client";


type EmployeeData = {
    emp_no: number,
    birth_date: Date,
    first_name: string,
    last_name: string,
    gender: employees_gender,
    hire_date: Date
}

/**
* Adds the entered Employee.
*/
Cypress.Commands.add('addEmployee', (employee_data: employees) => {
    return cy.task('addEmployee', employee_data);
});

/**
* Deletes the entered Employee.
*/
Cypress.Commands.add('deleteEmployee', (employee_number: employees) => {
    return cy.task('deleteEmployee', employee_number);
});

/**
* Finds the entered Employee.
*/
Cypress.Commands.add('findEmployee', (employee_number: employees) => {
    return cy.task('findEmployee', employee_number);
});

/**
 * Updates the entered Employee
 */
Cypress.Commands.add('updateEmployee', (employee_number: employees) => {
    return cy.task('updateEmployee', employee_number);
})

