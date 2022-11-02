import { departments, prisma, PrismaClient } from "@prisma/client";


const dept1_data = {
    dept_no: "v003",
    dept_name: "vault 3"
}

const dept2_data = {
    dept_no: "v111",
    dept_name: "vault 111"
}

const dept3_data = {
    dept_no: "v076",
    dept_name: "vault 76"
}

//Begin Test

describe("Department", () => {
    it("Get Latest Department", () => {

        //ensure no copies will be created:
        cy.deleteDepartment(dept1_data.dept_no);
        cy.deleteDepartment(dept2_data.dept_no);
        cy.deleteDepartment(dept3_data.dept_no);

        //Create depts
        cy.addDepartment(dept1_data);
        cy.addDepartment(dept2_data);
        cy.addDepartment(dept3_data);

        cy.getLastDepartmentAdded().then((dept_no_found) => {
            expect(dept_no_found).to.equal(dept2_data.dept_no);
        })

        //clean up
        cy.deleteDepartment(dept1_data.dept_no);
        cy.deleteDepartment(dept2_data.dept_no);
        cy.deleteDepartment(dept3_data.dept_no);

    })
});