import { PrismaClient } from '@prisma/client';
import { Employees } from '../../employee';
import { Departments } from '../../departments';
import { Department_Managers } from '../../department_managers';
import { test_department } from "../../data/department_data";
import { test_department_manager } from '../../data/department_manager_data';
import { test_employee } from '../../data/employee_data';
import { expect } from '../../helpers';

const prisma = new PrismaClient()

async function main(prisma: PrismaClient) {
    const employees = new Employees(prisma.employees);
    const departments = new Departments(prisma.departments);
    const department_managers = new Department_Managers(prisma.dept_manager);
    const expected_employee_information = await test_employee();
    const expected_department_information = test_department();
    const expected_department_manager_information = await test_department_manager(expected_department_information.dept_no);
    let error_count = 0;

    // Clean up step to ensure that the department to be added does not 
    //  already exist in the database.
    await departments.deleteDepartment([expected_department_manager_information.dept_no]);

    // Adds necessary data to DB for adding a department manager
    await departments.addDepartment({
        dept_no: expected_department_manager_information.dept_no,
        dept_name: expected_department_information.dept_name
    });
    await employees.addEmployee({
        emp_no: expected_department_manager_information.emp_no,
        birth_date: expected_employee_information.birth_date,
        first_name: expected_employee_information.first_name,
        last_name: expected_employee_information.last_name,
        gender: expected_employee_information.gender,
        hire_date: expected_employee_information.hire_date
    });

    // Adds a department manager
    await department_managers.addDepartmentManager(
        expected_department_manager_information
    );

    const department_manager = await department_managers.findByEmployeeNoAndDepartmentNo(
        expected_department_manager_information.emp_no,
        expected_department_manager_information.dept_no
    );

    // Employee number validation
    error_count = error_count + expect(
        department_manager?.emp_no,
        expected_department_manager_information.emp_no
    );

    // Department number validation
    error_count = error_count + expect(
        department_manager?.dept_no,
        expected_department_manager_information.dept_no
    );

    // From date validation
    error_count = error_count + expect(
        department_manager?.from_date.toDateString(),
        expected_department_manager_information.from_date.toDateString()
    );

    // To date validation
    error_count = error_count + expect(
        department_manager?.to_date.toDateString(),
        expected_department_manager_information.to_date.toDateString()
    );

    // Clean Up Step
    await department_managers.deleteDepartmentManager(
        [expected_department_manager_information.emp_no],
        [expected_department_manager_information.dept_no]
    );
    await employees.deleteEmployees([expected_department_manager_information.emp_no])
    await departments.deleteDepartment([expected_department_manager_information.dept_no]);

    // Logs the number of errors found to the console
    console.log(`\nNumber of Errors found: ${error_count}\n`);
}

main(prisma)
    .catch((e) => {
        console.error(e);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });