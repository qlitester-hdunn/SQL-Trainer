/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable<Subject> {
        /**
        * Adds the entered Employee.
        */
        addEmployee(employee_data: any): Chainable<any>;

        /**
     * updates the entered Employee.
     */
        updateEmployee(employee_data: any): Chainable<any>;

        /**
        * Deletes the entered Employee.
        */
        deleteEmployee(employee_data: any): Chainable<any>;

        /**
        * Finds the entered Employee.
        */
        findEmployee(employee_number: any): Chainable<any>;

        /**
         * Returns the number of the last Employee added.
         */
        getLastEmployeeAdded(): Chainable<any>;


        //BEGIN DEPARTMENT INDEX


        //creates the entered department
        addDepartment(department_data: any): Chainable<any>;

        //finds department based on department number
        findDepartment(dept_no: any): Chainable<any>;

        //updates the desired department with entered data
        updateDepartment(department_data: any): Chainable<any>;

        //deletes the desired department
        deleteDepartment(department_data: any): Chainable<any>;

        getLastDepartmentAdded(): Chainable<any>;

        //BEGIN SALARY INDEX
        addSalary(salary_data: any): Chainable<any>;

        findSalary(employee_number: any): Chainable<any>;

        deleteSalaries(employee_numbers: any): Chainable<any>;

        getMostRecentSalariesEmpNo(): Chainable<any>;

        updateSalary(salary_data: any): Chainable<any>;




        //BEGIN TITLE INDEX
        addTitle(title_data: any): Chainable<any>;

        deleteTitle(employee_numbers: any): Chainable<any>;

        findTitle(employee_number: any): Chainable<any>;

        getMostRecentTitle(): Chainable<any>;

        updateTitle(title_data: any): Chainable<any>;

        //BEGIN DEPARTMENT MANAGER INDEX
        addDepartmentManager(DepartmentManagerData: any): Chainable<any>;

        deleteDepartmentManager(department_manager_data: any): Chainable<any>;

        findDepartmentManager(department_manager_data: any): Chainable<any>;

        updateDepartmentManager(department_manager_data: any): Chainable<any>;

        //Begin Department Employee index
        addDepartmentEmployee(Department_Employee_data: any): Chainable<any>;

        deleteDepartmentEmployee(departmentEmployeeEmpNO: any, departmentEmployeeDepNo: any): Chainable<any>;

        updateDepartmentEmployee(Department_Employee_data: any): Chainable<any>;

        findDepartmentEmployee(Department_Employee_data: any): Chainable<any>;
    }
}