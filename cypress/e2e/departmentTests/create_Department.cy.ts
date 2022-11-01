import { departments, prisma, PrismaClient } from "@prisma/client";


const department_data = {
    dept_no: "t800",
    dept_name: "Sky-Net"
}

//begin test
describe('Department', () => {
    it('Create Department', () => {

        //ensure no duplicate will be made
        cy.deleteDepartment(department_data.dept_no)

        //create the new department with data above
        cy.addDepartment(department_data);

        //verify the new department was created by finding it and comparing found data to data used to create department
        cy.findDepartment(department_data.dept_no).then((foundEmployee) => {
            expect(foundEmployee.dept_no).to.equal(department_data.dept_no);
            expect(foundEmployee.dept_name).to.equal(department_data.dept_name);
        });

        //clean up any created departments during this test for sake of other tests
        cy.deleteDepartment(department_data.dept_no);
    })
});