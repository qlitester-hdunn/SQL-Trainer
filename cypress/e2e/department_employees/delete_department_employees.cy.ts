import { dept_manager, employees, employees_gender, departments, prisma, PrismaClient } from "@prisma/client";

const employeeData = {
    emp_no: 500001,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
}

const departmentData = {
    dept_no: "t800",
    dept_name: "Sky-Net"
}

const departmentEmployeeData = {
    emp_no: 500001,
    dept_no: "t800",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1999-12-17T00:00:00.000Z'
}

//Begin Test

describe('Department Employee', () => {
    it('Create Department Employee', () => {
        //esnure no duplicates can exist of items to be made
        cy.deleteEmployee(employeeData.emp_no);
        cy.deleteDepartment(departmentData.dept_no);
        cy.deleteDepartmentEmployee(departmentEmployeeData.emp_no, departmentEmployeeData.dept_no)

        cy.addEmployee(employeeData);
        cy.addDepartment(departmentData);
        cy.addDepartmentEmployee(departmentEmployeeData)

        cy.deleteDepartmentEmployee(departmentEmployeeData.emp_no, departmentEmployeeData.dept_no)

        cy.findDepartmentEmployee(departmentEmployeeData).then((foundDepartmentEmployee) => {
            expect(foundDepartmentEmployee).to.equal(null);
        })

        //clean up
        cy.deleteEmployee(employeeData.emp_no);
        cy.deleteDepartment(departmentData.dept_no);
    })
})