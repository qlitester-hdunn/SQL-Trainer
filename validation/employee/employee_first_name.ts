import { employees, employees_gender, PrismaClient } from '@prisma/client'
import { Employees } from '../../employee'

const prisma = new PrismaClient()

async function main(prisma: PrismaClient) {
    const employees = new Employees(prisma.employees);
    const latest_added_employee_no = await employees.getLatestAddedEmployeeNo();

    const expected_employee_information = {
        emp_no: latest_added_employee_no + 1,
        birth_date: new Date(),
        first_name: "Test",
        last_name: "Tester",
        gender: employees_gender.M,
        hire_date: new Date()
    }

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