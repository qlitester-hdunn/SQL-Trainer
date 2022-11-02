import { salaries, PrismaClient } from "@prisma/client";
import { empty } from "@prisma/client/runtime";


type SalaryData = {
    emp_no: number,
    salary: number,
    from_date: Date,
    to_date: Date,
}

/**
* Adds the entered Salary.
*/
Cypress.Commands.add('addSalary', (salary_data: salaries) => {
    return cy.task('addSalary', salary_data);
});

/**
* Deletes the entered Salary.
*/
Cypress.Commands.add('deleteSalaries', (employee_number: number) => {
    return cy.task('deleteSalaries', employee_number);
});

/**
* Finds the entered Employee.
*/
Cypress.Commands.add('findSalary', (employee_number: number) => {
    return cy.task('findSalary', employee_number);
});

/**
 * Updates the entered Employee
 */
Cypress.Commands.add('updateSalary', (salaryData: salaries) => {
    return cy.task('updateSalary', salaryData);
});

/**
 * Returns the number of the last employee added to the database
 */
Cypress.Commands.add('getMostRecentSalariesEmpNo', () => {
    return cy.task('getMostRecentSalariesEmpNo');
});