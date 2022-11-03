import { titles, employees, employees_gender, PrismaClient } from "@prisma/client";

const titleData = {
    emp_no: 50001,
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

describe("Title", () => {
    it("Add Title", () => {

        //ensure no employee/title exist with above info
        cy.deleteEmployee(employeeData.emp_no);
        cy.deleteTitle(titleData.emp_no);

        //Creation
        cy.addEmployee(employeeData);
        cy.addTitle(titleData);

        cy.findTitle(titleData.emp_no).then((foundTitle) => {
            expect(foundTitle.title).to.equal(titleData.title);
            expect(foundTitle.from_date).to.equal(titleData.from_date);
            expect(foundTitle.to_date).to.equal(titleData.to_date);
        })

        //cleanup
        cy.deleteEmployee(employeeData.emp_no);
        cy.deleteTitle(titleData.emp_no);
    })
})