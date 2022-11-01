import { employees, employees_gender, prisma, PrismaClient } from "@prisma/client";

const employee_data = {
    emp_no: 500001,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
};

describe("Employee", () => {
    it("delete Employee", () => {

        cy.deleteEmployee(employee_data.emp_no);
        //create employee with data above
        cy.addEmployee(employee_data);

        //after creation, make sure the employee exists in the database
        cy.findEmployee(employee_data.emp_no).then((foundEmployee) => {
            expect(foundEmployee.emp_no).to.equal(employee_data.emp_no);
            expect(foundEmployee.birth_date).to.equal(employee_data.birth_date);
            expect(foundEmployee.first_name).to.equal(employee_data.first_name);
            expect(foundEmployee.last_name).to.equal(employee_data.last_name);
            expect(foundEmployee.gender).to.equal(employee_data.gender);
            expect(foundEmployee.hire_date).to.equal(employee_data.hire_date);
        });

        //delete the employee
        cy.deleteEmployee(employee_data.emp_no);

        //search for employee, ensuring it comes back as null
        cy.findEmployee(employee_data.emp_no).then((foundEmployee) => {
            expect(foundEmployee).to.equal(null);
        });
    })
});


