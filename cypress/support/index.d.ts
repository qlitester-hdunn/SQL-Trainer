/// <reference types="cypress" />


declare namespace Cypress {
    interface Chainable<Subject> {
        /**
        * Adds the entered Employee.
        */
        addEmployee(employee_data: any): Chainable<any>;

        /**
     * Adds the entered Employee.
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
    }
}