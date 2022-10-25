import { Employees } from "../classes/employee";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/**
* Base department employee data to be used in most tests.
*/
export async function test_department_employee(
    dept_no_passed?: string,
    emp_no_passed?: number,
    from_date_passed?: Date,
    to_date_passed?: Date
) {
    const employees = new Employees(prisma.employees);
    const latest_emp_no = await employees.getLatestAddedEmployeeNo();

    const department_employee_data = {
        emp_no: emp_no_passed || latest_emp_no + 1,
        dept_no: dept_no_passed || 't001',
        from_date: from_date_passed || new Date('2022-08-17T00:00:00.000Z'),
        to_date: to_date_passed || new Date('2022-10-17T00:00:00.000Z')
    }
    return department_employee_data;
}