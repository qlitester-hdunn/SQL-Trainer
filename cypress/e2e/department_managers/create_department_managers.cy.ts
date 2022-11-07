import { Department_Managers } from "../../../classes/department_managers";
import { employees_gender } from "@prisma/client";

const department_manager_data = {
    emp_no: 500001,
    dept_no: "t800",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1995-12-17T00:00:00.000Z'
};

const department_data = {
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

describe('DepartmentManager', () => {
    it('Add Department Manager', () => { 

        cy.deleteDepartment(department_data.dept_no)
        cy.deleteDepartmentManager(department_manager_data.dept_no)
        cy.deleteEmployee(employee_data.emp_no)

        cy.addDepartment(department_data)
        cy.addEmployee(employee_data)
        cy.addDepartmentManager(department_manager_data)
        
        cy.findDepartmentManager(department_manager_data).then((found_manager) => {
            expect(found_manager.emp_no).to.equal(department_manager_data.emp_no)
            expect(found_manager.dept_no).to.equal(department_manager_data.dept_no)
            expect(found_manager.from_date).to.equal(department_manager_data.from_date)
            expect(found_manager.to_date).to.equal(department_manager_data.to_date)
        })
    });
});