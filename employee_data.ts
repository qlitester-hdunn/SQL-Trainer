import { employees, employees_gender, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

export async function test_employee() {
    const latest_added_employee = await prisma.employees.findMany({ orderBy: { emp_no: 'desc' } });
    const latest_added_employee_no = latest_added_employee[0].emp_no;
    const employee_data = {
        emp_no: latest_added_employee_no + 1,
        birth_date: new Date(),
        first_name: "Test",
        last_name: "Tester",
        gender: employees_gender.M,
        hire_date: new Date()
    };
    return employee_data;
}

export async function secondary_employee() {
    const latest_added_employee = await prisma.employees.findMany({ orderBy: { emp_no: 'desc' } });
    const latest_added_employee_no = latest_added_employee[0].emp_no;
    const employee_data = {
        emp_no: latest_added_employee_no + 1,
        birth_date: new Date(),
        first_name: "Test",
        last_name: "Person",
        gender: employees_gender.M,
        hire_date: new Date()
    };
    return employee_data;
}