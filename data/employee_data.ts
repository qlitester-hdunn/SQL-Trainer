import { employees_gender, PrismaClient } from '@prisma/client';
import { Employees } from "../classes/employee";

const prisma = new PrismaClient()

/**
* Base employee data to be used in most tests.
*
* Note: The emp_no for this employee is incremented off of the latest 
*   added employee.
*/
export async function test_employee(
    emp_no_passed?: number,
    birth_date_passed?: Date,
    first_name_passed?: string,
    last_name_passed?: string,
    gender_passed?: employees_gender,
    hire_date_passed?: Date
) {
    const employees = new Employees(prisma.employees);
    const latest_added_employee_no = await employees.getLatestAddedEmployeeNo();
    const employee_data = {
        emp_no: emp_no_passed || latest_added_employee_no + 1,
        birth_date: birth_date_passed || new Date('1995-12-17T00:00:00.000Z'),
        first_name: first_name_passed || "Test",
        last_name: last_name_passed || "Tester",
        gender: gender_passed || employees_gender.M,
        hire_date: hire_date_passed || new Date('2022-10-20T00:00:00.000Z')
    };
    return employee_data;
}
