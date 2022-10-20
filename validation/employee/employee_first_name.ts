import { PrismaClient } from '@prisma/client'
import { Employees } from '../../employee'
import { test_employee } from '../../data/employee_data';

const prisma = new PrismaClient()

async function main(prisma: PrismaClient) {
    const employees = new Employees(prisma.employees);
    const expected_employee_information = await test_employee();

    await employees.addEmployee({
        emp_no: expected_employee_information.emp_no,
        birth_date: expected_employee_information.birth_date,
        first_name: expected_employee_information.first_name,
        last_name: expected_employee_information.last_name,
        gender: expected_employee_information.gender,
        hire_date: expected_employee_information.hire_date
    });

    const employee = await employees.findByEmployeeNo(expected_employee_information.emp_no);

    if (employee?.first_name !== expected_employee_information.first_name) {
        throw new Error('The recieved First Name was incorrect')
    } else {
        console.log("SUCCESS!");
    }
}

main(prisma)
    .catch((e) => {
        console.error(e);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });