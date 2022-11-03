import { employees_gender } from ".prisma/client";

const salary_data = {
    emp_no: 500001,
    salary: 42,
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1995-12-17T00:00:00.000Z'
};

const salary_data2 = {
    emp_no: 500001,
    salary: 6000,
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1995-12-17T00:00:00.100Z'
};

const employee_data = {
    emp_no: 500001,
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

        // Create the employee, then add the salary for that employee.
        cy.addEmployee(employee_data)
        cy.addSalary(salary_data)
        cy.updateSalary(salary_data2)

        // verify the salary and to date have been updated
        cy.findSalary(salary_data.emp_no).then((foundSalary) => {
            expect(foundSalary.salary).to.equal(salary_data2.salary)
            expect(foundSalary.to_date).to.equal(salary_data2.to_date)
        });
    });
});