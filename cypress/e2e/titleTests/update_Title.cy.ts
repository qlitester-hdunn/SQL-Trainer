import { titles, employees, employees_gender, PrismaClient } from "@prisma/client";

const titleData = {
    emp_no: 500001,
    title: "Overseer",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1999-12-17T00:00:00.000Z'
}

const employeeData = {
    emp_no: 500001,
    birth_date: '1975-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
};
/*apparently you CANNOT update title name, only to_date.
 title name may act as guid, preventing an update when attempting to change it, even with the existing empNo*/
const updateData = {
    emp_no: 500001,
    title: "Overseer",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1997-12-17T00:00:00.000Z'
}

describe("Title", () => {
    it("Update Title", () => {

        //ensure no employee/title exist with above info
        cy.deleteEmployee(employeeData.emp_no);
        cy.deleteTitle(titleData.emp_no);

        //Creation
        cy.addEmployee(employeeData);
        cy.addTitle(titleData);

        cy.updateTitle(updateData);

        cy.findTitle(titleData.emp_no).then((foundTitle) => {
            expect(foundTitle.title).to.equal(updateData.title);
            expect(foundTitle.to_date).to.equal(updateData.to_date);
        })

        //cleanup
        cy.deleteEmployee(employeeData.emp_no);
        cy.deleteTitle(titleData.emp_no);
    })
})