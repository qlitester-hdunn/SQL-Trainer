import { PrismaClient } from '@prisma/client';
import { Departments } from '../../classes/departments';
import { test_department } from "../../data/department_data";
import { expect } from '../../helpers';

const prisma = new PrismaClient();

async function main(prisma: PrismaClient) {
    const departments = new Departments(prisma.departments)
    const expected_department_information = test_department();
    let error_count = 0;

    // Clean up step to ensure that the department to be added does not 
    //  already exist in the database.
    await departments.deleteDepartment([expected_department_information.dept_no]);

    await departments.addDepartment({
        dept_no: expected_department_information.dept_no,
        dept_name: expected_department_information.dept_name
    });

    const department = await departments.findByDepartmentNo(expected_department_information.dept_no);

    // Department number validation
    error_count = error_count + expect(department?.dept_no, expected_department_information.dept_no);

    // Department name validation
    error_count = error_count + expect(department?.dept_name, expected_department_information.dept_name);

    // Clean Up Step
    await departments.deleteDepartment([expected_department_information.dept_no]);

    console.log(`\nNumber of Errors found: ${error_count}\n`);
}

main(prisma)
    .catch((e) => {
        console.error(e);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });