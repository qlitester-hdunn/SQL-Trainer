import { departments, PrismaClient } from "@prisma/client";

type DepartmentData = {
    dept_no: string,
    dept_name: string
}

/**
* Adds the entered department.
*/
Cypress.Commands.add('addDepartment', (department_data: departments) => {
    return cy.task('addDepartment', department_data);
});

Cypress.Commands.add('deleteDepartment', (department_data: departments) => {
    return cy.task('deleteDepartment', department_data);
});

Cypress.Commands.add('findDepartment', (department_number: departments) => {
    return cy.task('findDepartment', department_number);
});

Cypress.Commands.add('updateDepartment', (department_data: departments) => {
    return cy.task('updateDepartment', department_data);
});

Cypress.Commands.add('getLastDepartmentAdded', () => {
    return cy.task("getLastDepartmentAdded");
});
