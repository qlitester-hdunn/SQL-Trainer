import { titles, employees, employees_gender, PrismaClient } from "@prisma/client";

const titleData1 = {
    emp_no: 50001,
    title: "Overseer",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1999-12-17T00:00:00.000Z'
}

const employeeData1 = {
    emp_no: 500001,
    birth_date: '1975-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
};

const titleData2 = {
    emp_no: 500003,
    title: "Janitor",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1999-12-17T00:00:00.000Z'
}

const employeeData2 = {
    emp_no: 500003,
    birth_date: '1975-12-17T00:00:00.000Z',
    first_name: "Init",
    last_name: "Peon",
    gender: employees_gender.M,
    hire_date: '1995-10-17T00:00:00.000Z'
};

const titleData3 = {
    emp_no: 500002,
    title: "Barber",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1999-12-17T00:00:00.000Z'
}

const employeeData3 = {
    emp_no: 500002,
    birth_date: '1975-12-17T00:00:00.000Z',
    first_name: "it",
    last_name: "eon",
    gender: employees_gender.M,
    hire_date: '1995-11-17T00:00:00.000Z'
};


describe("Title", () => {
    it("Find Last Title", () => {

        //ensure the data above does not exist before test
        cy.deleteEmployee(employeeData1.emp_no);
        cy.deleteTitle(titleData1.emp_no);
        cy.deleteEmployee(employeeData2.emp_no);
        cy.deleteTitle(titleData2.emp_no);
        cy.deleteEmployee(employeeData3.emp_no);
        cy.deleteTitle(titleData3.emp_no);
        cy.deleteTitle(499999);

        //creation
        cy.addEmployee(employeeData1);
        cy.addEmployee(employeeData2);
        cy.addEmployee(employeeData3);

        cy.addTitle(titleData1);
        cy.addTitle(titleData2);
        cy.addTitle(titleData3);

        //found empNo should equal the same empNo in title 2, as it has the highest value 
        cy.getMostRecentTitle().then((foundEmpNo) => {
            expect(foundEmpNo).to.equal(titleData2.emp_no)
        })

        cy.deleteEmployee(employeeData1.emp_no);
        cy.deleteTitle(titleData1.emp_no);
        cy.deleteEmployee(employeeData2.emp_no);
        cy.deleteTitle(titleData2.emp_no);
        cy.deleteEmployee(employeeData3.emp_no);
        cy.deleteTitle(titleData3.emp_no);

    })
})