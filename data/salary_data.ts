import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

/**
* Base salary data to be used in most tests.
*
* Note: The emp_no is passed by the call
*/
export async function test_salary(
    emp_no_passed?: number,
    salary_passed?: number,
    from_date_passed?: Date,
    to_date_passed?: Date,
) {
    const latest_added_employee = await prisma.employees.findMany({ orderBy: { emp_no: 'desc' } });
    const latest_added_employee_no = latest_added_employee[0].emp_no;
    const salary_data = {
        emp_no: emp_no_passed || latest_added_employee_no,
        salary: salary_passed || 42,
        from_date: from_date_passed || new Date(),
        to_date: to_date_passed || new Date(),
    };
    return salary_data;

}