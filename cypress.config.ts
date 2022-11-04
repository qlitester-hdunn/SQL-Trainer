import { defineConfig } from "cypress";
import { employees_gender, employees, departments, PrismaClient } from "@prisma/client";
import { Employees } from './classes/employee';
import { Departments } from "./classes/departments";
import { Salaries } from "./classes/salary";
import { empty } from "@prisma/client/runtime";
import { Titles } from "./classes/title";
import { Department_Employees } from "./classes/department_employees";
import { Department_Managers } from "./classes/department_managers";
import { test_title } from "./data/title_data";
import { any } from "cypress/types/bluebird";
import milliseconds from "mocha/lib/ms";

const prisma = new PrismaClient();
const employee = new Employees(prisma.employees);
const department = new Departments(prisma.departments);
const salaries = new Salaries(prisma.salaries);
const title = new Titles(prisma.titles);
const department_employees = new Department_Employees(prisma.dept_emp);
const department_managers = new Department_Managers(prisma.dept_manager);

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
        getLastEmployeeAdded: Number => {
          return employee.getLatestAddedEmployeeNo();
        },

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
        },

        getLastDepartmentAdded: empty => {
          return department.getLatestAddedDepartmentNo();
        },

        //BEGIN SALARIES TASKS

        addSalary: salaryData => {
          return salaries.addSalary(salaryData)
        },
        findSalary: employeeNumber => {
          return salaries.findSalary(employeeNumber)
        },
        updateSalary: salaryData => {
          return salaries.updateSalary(salaryData)
        },
        getMostRecentSalariesEmpNo: () => {
          return salaries.getLatestAddedSalaryEmpNo()
        },
        deleteSalaries: employeeNumber => {
          return salaries.deleteSalaries(employeeNumber)
        },

        //Title configs
        addTitle: titleData => {
          return title.addTitle(titleData);
        },
        findTitle: employeeNumber => {
          return title.findTitle(employeeNumber);
        },
        updateTitle: titleData => {
          return title.updateTitle(titleData);
        },
        getMostRecentTitle: () => {
          return title.getLatestAddedTitleEmpNo();
        },
        deleteTitle: employeeNumber => {
          return title.deleteTitles(employeeNumber);
        },

        // DEPT MANAGERS 
        addDepartmentManager: departmentManagerData => {
          return department_managers.addDepartmentManager(departmentManagerData);
        },
        deleteDepartmentManager: departmentManagerData => {
          return department_managers.deleteDepartmentManager(departmentManagerData.emp_no, departmentManagerData.dept_no);
        },
        findDepartmentManager: departmentManagerData => {
          return department_managers.findByEmployeeNoAndDepartmentNo(departmentManagerData.emp_no, departmentManagerData.dept_no)
        },
        updateDepartmentManager: departmentManagerData => {
          return department_managers.updateDepartmentManager(departmentManagerData)
        },

        // DEPT EMPLOYEES
        addDepartmentEmployee: departmentEmployeeData => {
          return department_employees.addDepartmentEmployee(departmentEmployeeData);
        },

        deleteDepartmentEmployee: ({ departmentEmployeeEmpNo, departmentEmployeeDataDeptNo }) => {
          return department_employees.deleteDepartmentEmployee(departmentEmployeeEmpNo, departmentEmployeeDataDeptNo);
        },

        updateDepartmentEmployee: departmentEmployeeData => {
          return department_employees.updateDepartmentEmployee(departmentEmployeeData);
        },

        findDepartmentEmployee: ({ departmentEmployeeEmpNo, departmentEmployeeDataDeptNo }) => {
          return department_employees.findByEmployeeNoAndDepartmentNo(departmentEmployeeEmpNo, departmentEmployeeDataDeptNo);
        }
      });
    },
  },
});
