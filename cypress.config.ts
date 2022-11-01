import { defineConfig } from "cypress";
import { employees_gender, employees, departments, PrismaClient } from "@prisma/client";
import { Employees } from './classes/employee';
import { Departments } from "./classes/departments";

const prisma = new PrismaClient();
const employee = new Employees(prisma.employees);
const department = new Departments(prisma.departments);

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
<<<<<<< HEAD
        getLastEmployeeAdded: Number => {
          return employee.getLatestAddedEmployeeNo();
        }
=======

        //BEGIN DEPARTMENT TASKS

        addDepartment: departmentData => {
          return department.addDepartment(departmentData);
        },
        findDepartment: departmentData => {
          return department.findByDepartmentNo(departmentData);
        },
        updateDepartment: departmentData => {
          return department.updateDepartment(departmentData);
        },
        deleteDepartment: departmentData => {
          return department.deleteDepartment([departmentData]);
        }


>>>>>>> main
      });
    },
  },
});
