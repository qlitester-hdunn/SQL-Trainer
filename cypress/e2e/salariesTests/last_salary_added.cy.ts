  import { employees_gender } from ".prisma/client";

const salary_data = {
    emp_no: 500001,
    salary: 42,
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1995-12-17T00:00:00.000Z'
};

const salary_data2 = {
    emp_no: 500002,
    salary: 6000,
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1995-12-17T00:00:00.100Z'
};

const employee_data1 = {
    emp_no: 500001,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
  };

const employee_data2 = {
    emp_no: 500002,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
};

describe('Salaries', () => {
    it('Update Salary', () => {
        // Make sure the salary doesn't exist.
        cy.deleteSalaries(salary_data.emp_no)
        cy.deleteEmployee(salary_data.emp_no)
        cy.deleteSalaries(salary_data2.emp_no)
        cy.deleteEmployee(salary_data2.emp_no)


        // Create the employee, then add the salary for that employee.
        cy.addEmployee(employee_data1)
        cy.addEmployee(employee_data2)
        cy.addSalary(salary_data)

        cy.getMostRecentSalariesEmpNo().then((found_number) => {
            expect(found_number).to.equal(salary_data.emp_no)
        }) 

        cy.addSalary(salary_data2)
        cy.getMostRecentSalariesEmpNo().then((found_number) => {
            expect(found_number).to.equal(salary_data2.emp_no)
        }) 
    });
});