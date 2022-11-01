import { employees, employees_gender, prisma, PrismaClient } from "@prisma/client";

//start by making employee data for a new employee
const employeeData = {
    emp_no: 500001,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "OriginalName",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
};
//create updated data variable that will change one or more points of data
const updateData =
{
    emp_no: 500001,
    first_name: "updatedName",
    last_name: "lizard"
};

//begin test here
describe("Employee", () => {
    it("Add Employee", () => {

        //ensure no employee is currently created that matches the data to create
        cy.deleteEmployee(employeeData.emp_no);
        //create the new employee using the employee data object
        cy.addEmployee(employeeData);
        //after adding the employee to the data base, update the employee with the update data object
        cy.updateEmployee(updateData);
        //check to see if the employee in the database has the same data as the update data object, and the unchanged data in the 
        cy.findEmployee(updateData.emp_no).then((foundEmployee) => {
            expect(foundEmployee.emp_no).to.equal(updateData.emp_no);
            expect(foundEmployee.birth_date).to.equal(employeeData.birth_date);
            expect(foundEmployee.first_name).to.equal(updateData.first_name);
            expect(foundEmployee.last_name).to.equal(updateData.last_name);
            expect(foundEmployee.gender).to.equal(employeeData.gender);
            expect(foundEmployee.hire_date).to.equal(employeeData.hire_date);
        });

        // Clean Up Step
        cy.deleteEmployee(updateData.emp_no);

    })
});