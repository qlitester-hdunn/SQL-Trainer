import { dept_emp, PrismaClient } from "@prisma/client";
import cypress from "cypress";

type departmentEmployeeData = {
    emp_no: number,
    dept_no: string,
    from_date: Date,
    to_date: Date
}

Cypress.Commands.add("addDepartmentEmployee", (departmentEmployeeData: dept_emp) => {
    return cy.task("addDepartmentEmployee", departmentEmployeeData)
})

Cypress.Commands.add("findDepartmentEmployee", (departmentEmployeeData: dept_emp) => {
    return cy.task("findDepartmentEmployee", (departmentEmployeeData.emp_no, departmentEmployeeData.dept_no))
})

Cypress.Commands.add("updateDepartmentEmployee", (departmentEmployeeData: dept_emp) => {
    return cy.task("updateDepartmentEmployee", departmentEmployeeData)
})

Cypress.Commands.add("deleteDepartmentEmployee", (departmentEmployeeData: dept_emp) => {
    return cy.task("deleteDepartmentEmployee", (departmentEmployeeData.emp_no, departmentEmployeeData.dept_no))
})