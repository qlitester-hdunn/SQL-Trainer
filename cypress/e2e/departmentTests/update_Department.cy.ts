import { departments, prisma, PrismaClient } from "@prisma/client";


const department_data = {
    dept_no: "t800",
    dept_name: "Sky-Net"
}

const update_data = {
    dept_no: "t800",
    dept_name: "Arnold"
}
//Begin Test
describe("Department", () => {
    it("Update Department", () => {
        //Ensure department does not exist before creation
        cy.deleteDepartment(department_data.dept_no);
        //Create new department
        cy.addDepartment(department_data);
        //update new department
        cy.updateDepartment(update_data);
        //verify the department contains the updated value, instead of it's original value
        cy.findDepartment(department_data.dept_no).then((foundDepartment) => {
            expect(foundDepartment.dept_name).to.equal(update_data.dept_name);
        });
        //clean up
        cy.deleteDepartment(department_data.dept_no);

    })
});
