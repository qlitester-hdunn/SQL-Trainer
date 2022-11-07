import { employees_gender } from "@prisma/client";

const department_manager_data1 = {
    emp_no: 500001,
    dept_no: "t800",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1995-12-17T00:00:00.000Z'
};

const department_manager_data2 = {
    emp_no: 500001,
    dept_no: "t800",
    from_date: '1995-12-16T00:00:00.000Z',
    to_date: '1995-12-19T00:00:00.000Z'
};

const department_data1 = {
    dept_no: "t800",
    dept_name: "Sky-Net"
};

const employee_data = {
    emp_no: 500001,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
  };

describe('Department Manager', () => {
    it('Delete Department Manager', () => {

        // get rid of any existing data
        cy.deleteDepartment(department_data1.dept_no)
        cy.deleteDepartmentManager(department_manager_data1.dept_no)
        cy.deleteEmployee(employee_data.emp_no)
        
        cy.addDepartment(department_data1)
        cy.addEmployee(employee_data)
        cy.addDepartmentManager(department_manager_data1)

        cy.findDepartmentManager(department_manager_data1).then((found_manager) => {
            expect(found_manager.emp_no).to.equal(department_manager_data1.emp_no);
            expect(found_manager.dept_no).to.equal(department_manager_data1.dept_no);
            expect(found_manager.from_date).to.equal(department_manager_data1.from_date);
            expect(found_manager.to_date).to.equal(department_manager_data1.to_date);
        });

        cy.updateDepartmentManager(department_manager_data2)

        cy.findDepartmentManager(department_manager_data2).then((found_manager) => {
            expect(found_manager.dept_no).to.equal(department_manager_data2.dept_no);
            expect(found_manager.from_date).to.equal(department_manager_data2.from_date);
            expect(found_manager.to_date).to.equal(department_manager_data2.to_date);
        })
    });
});