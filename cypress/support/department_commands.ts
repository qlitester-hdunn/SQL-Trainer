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
