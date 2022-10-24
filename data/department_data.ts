/**
* Base department data to be used in most tests.
*/
export function test_department(dept_no_passed?: string, dept_name_passed?: string) {
    const department_data = {
        dept_no: dept_no_passed || 't001',
        dept_name: dept_name_passed || 'Test Automation'
    }
    return department_data;
}