import { employees, salaries, employees_gender, PrismaClient } from '@prisma/client'
import { Employees } from '../../employee'
import { Salaries } from '../../salary'
import { test_employee } from '../../data/employee_data';
import { test_salary } from '../../data/salary_data';
import { expect } from '../../helpers';

const prisma = new PrismaClient()

async function main(prisma: PrismaClient) {
    const employees = new Employees(prisma.employees);
    const salaries = new Salaries(prisma.salaries);
    const employee_data = await test_employee();
    const new_emp_no = employee_data.emp_no;
    const new_salary_date = new Date('1995-12-17T00:00:00.000Z');
    const expected_salary_information = await test_salary(new_emp_no, 42, new_salary_date, new_salary_date);
    let error_count = 0;

    // Clean up step to ensure that the employee & salary to be added do not 
    //  already exist in the database.
    await employees.deleteEmployees([new_emp_no]);
    await salaries.deleteSalaries([new_emp_no]);

    // add employee for new salary
    const addedEmployee: employees | null = await employees.addEmployee({
        emp_no: new_emp_no,
        birth_date: employee_data.birth_date,
        first_name: employee_data.first_name,
        last_name: employee_data.last_name,
        gender: employee_data.gender,
        hire_date: employee_data.hire_date,
    })

    // add new salary for said employee
    await salaries.addSalary(expected_salary_information);
    const salary: salaries | null = await salaries.findSalary(new_emp_no);

     // Employee number validation
     error_count = error_count + expect(salary?.emp_no, expected_salary_information.emp_no);

     // Salary amount validation
     error_count = error_count + expect(salary?.salary, expected_salary_information.salary);

     // Salary from date validation
     error_count = error_count + expect(salary?.from_date.toDateString(), expected_salary_information.from_date.toDateString());

     // Salary to date validation
     error_count = error_count + expect(salary?.to_date.toDateString(), expected_salary_information.to_date.toDateString());
 
     // Clean Up Step
     await employees.deleteEmployees([new_emp_no]);
     await salaries.deleteSalaries([new_emp_no]);
 
     // Output results
     console.log(`\nNumber of Errors found: ${error_count}\n`);
}

main(prisma)
    .catch((e) => {
        console.error(e);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });