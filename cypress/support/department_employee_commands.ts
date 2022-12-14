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
    return cy.task("findDepartmentEmployee", departmentEmployeeData)
})

Cypress.Commands.add("updateDepartmentEmployee", (departmentEmployeeData: dept_emp) => {
    return cy.task("updateDepartmentEmployee", departmentEmployeeData)
})

Cypress.Commands.add("deleteDepartmentEmployee", (departmentEmployeeEmpNo: dept_emp, departmentEmployeeDeptNo: dept_emp) => {
    return cy.task("deleteDepartmentEmployee", { departmentEmployeeEmpNo, departmentEmployeeDeptNo })
})