import { defineConfig } from "cypress";
import { employees_gender, employees, PrismaClient } from "@prisma/client";
import { Employees } from './classes/employee';

const prisma = new PrismaClient();
const employee = new Employees(prisma.employees);

export default defineConfig({
  e2e: {
    viewportWidth: 1920,
    viewportHeight: 1080,
    retries: 1,
    chromeWebSecurity: false,
    video: false,
    baseUrl: 'http://localhost:3306',
    setupNodeEvents(on, config) {
      // implement node event listeners here

      // Employee tasks
      on('task', {
        addEmployee: employeeData => {
          return employee.addEmployee(employeeData);
        },
        deleteEmployee: employeeData => {
          return employee.deleteEmployees([employeeData]);
        },
        findEmployee: employeeData => {
          return employee.findByEmployeeNo(employeeData);
        },
        updateEmployee: employeeData => {
          return employee.updateEmployee(employeeData);
        },
      });
    },
  },
});
