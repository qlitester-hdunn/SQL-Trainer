import { employees, titles, employees_gender, PrismaClient } from '@prisma/client'
import { Employees } from '../../employee'
import { Titles } from '../../title'
import { test_employee } from '../../data/employee_data';
import { test_title, secondary_title } from '../../data/title_data';
import { expect } from '../../helpers';

const prisma = new PrismaClient()

async function main(prisma: PrismaClient) {
    const employees = new Employees(prisma.employees);
    const titles = new Titles(prisma.titles);
    const employee_data = await test_employee();
    const new_emp_no = employee_data.emp_no;
    const new_title_date = new Date('1995-12-17T00:00:00.000Z');
    const expected_title_information = await test_title(new_emp_no, 'Engineer', new_title_date, new_title_date);
    let error_count = 0;

    // Clean up step to ensure that the employee & title to be added do not 
    //  already exist in the database.
    await employees.deleteEmployees([499991]);
    await titles.deleteTitles([499991]);
    await employees.deleteEmployees([new_emp_no]);
    await titles.deleteTitles([new_emp_no]);

    // add employee for new title
    const addedEmployee: employees | null = await employees.addEmployee({
        emp_no: new_emp_no,
        birth_date: employee_data.birth_date,
        first_name: employee_data.first_name,
        last_name: employee_data.last_name,
        gender: employee_data.gender,
        hire_date: employee_data.hire_date,
    })

    // add new title for said employee
    const new_title_count = await titles.addTitle(expected_title_information);
    const title: titles | null = await titles.findTitle(new_emp_no);

     // Employee number validation
     error_count = error_count + expect(title?.emp_no, expected_title_information.emp_no);

     // Title validation
     error_count = error_count + expect(title?.title, expected_title_information.title);

     // Title from date validation
     error_count = error_count + expect(title?.from_date.toDateString(), expected_title_information.from_date.toDateString());

     // Title to date validation
     error_count = error_count + expect(title?.to_date?.toDateString(), expected_title_information.to_date.toDateString());
 
     // Clean Up Step
     await employees.deleteEmployees([new_emp_no]);
     await titles.deleteTitles([new_emp_no]);
 
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