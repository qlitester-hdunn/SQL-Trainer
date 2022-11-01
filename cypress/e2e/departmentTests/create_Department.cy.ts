import { departments, prisma, PrismaClient } from "@prisma/client";

const department_data = {
    dept_no: "t800",
    dept_name: "Sky-Net"
}

describe('Department', () => {
    it('Create Department', () => {
        cy.deleteDepartment(department_data.dept_no)

        cy.addDepartment(department_data);

        cy.findDepartment(department_data.dept_no).then((foundEmployee) => {
            expect(foundEmployee.dept_no).to.equal(department_data.dept_no);
            expect(foundEmployee.dept_name).to.equal(department_data.dept_name);
        });

        cy.deleteDepartment(department_data.dept_no);
    })
});