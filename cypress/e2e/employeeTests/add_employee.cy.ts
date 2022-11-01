import { employees, employees_gender, prisma, PrismaClient } from "@prisma/client";

const employee_data = {
  emp_no: 500001,
  birth_date: '1995-12-17T00:00:00.000Z',
  first_name: "InitialCyTest",
  last_name: "Person",
  gender: employees_gender.M,
  hire_date: '1995-12-17T00:00:00.000Z'
};


describe('Employee', () => {
  it('Add Employee', () => {
    // Make sure employee to be added does not already exist
    cy.deleteEmployee(employee_data.emp_no);

    cy.addEmployee(employee_data);
    cy.findEmployee(employee_data.emp_no).then((foundEmployee) => {
      expect(foundEmployee.emp_no).to.equal(employee_data.emp_no);
      expect(foundEmployee.birth_date).to.equal(employee_data.birth_date);
      expect(foundEmployee.first_name).to.equal(employee_data.first_name);
      expect(foundEmployee.last_name).to.equal(employee_data.last_name);
      expect(foundEmployee.gender).to.equal(employee_data.gender);
      expect(foundEmployee.hire_date).to.equal(employee_data.hire_date);
    });

    // Clean Up Step
    cy.deleteEmployee(employee_data.emp_no);
  })
});