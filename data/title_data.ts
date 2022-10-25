import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
* Base title data to be used in most tests.
*
* Note: The emp_no is passed by the call
*/
export async function test_title(
    emp_no_passed: number,
    title_passed: string,
    from_date_passed: Date,
    to_date_passed: Date,
) {
    const latest_added_employee = await prisma.employees.findMany({ orderBy: { emp_no: 'desc' } });
    const latest_added_employee_no = latest_added_employee[0].emp_no;
    const title_data = {
        emp_no: emp_no_passed || latest_added_employee_no,
        title: title_passed || 'Engineer',
        from_date: from_date_passed || new Date(),
        to_date: to_date_passed || new Date(),
    };
    return title_data;
}

/**
* Secondary title data to be used when a second title is needed.
*
* Note: The emp_no is passed by the call
* AND to-date is NOT passed as it's optional in the DB
* 
*/
export async function title_no_to_date(emp_no: number) {
    const title_data = {
      emp_no: emp_no,
      title: 'Engineer',
      from_date: new Date(),
    };
    return title_data;
}