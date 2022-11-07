import { dept_manager } from "@prisma/client";
import { Department_Managers } from "../../classes/department_managers";

Cypress.Commands.add('addDepartmentManager', (dept_manager_data: dept_manager) => {
    return cy.task("addDepartmentManager", dept_manager_data)
})

Cypress.Commands.add('deleteDepartmentManager', (dept_manager_data: dept_manager) => {
    return cy.task('deleteDepartmentManager', dept_manager_data)
})

Cypress.Commands.add('findDepartmentManager', (dept_manager_data: dept_manager) => {
    return cy.task('findDepartmentManager', dept_manager_data)
})

Cypress.Commands.add('updateDepartmentManager', (dept_manager_data: dept_manager) => {
    return cy.task('updateDepartmentManager', dept_manager_data)
})