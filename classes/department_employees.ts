import { dept_emp, PrismaClient } from "@prisma/client";

type DepartmentEmployeeData = {
    emp_no: number,
    dept_no: string,
    from_date: Date,
    to_date: Date
}

export class Department_Employees {
    constructor(private readonly prismaDepartmentEmployee: PrismaClient['dept_emp']) { }

    /**
    * Add an employee to the desired department.
    * 
    * Data must be formatted as:
    *   DepartmentEmployeeData = {
    *        emp_no: number,
    *        dept_no: string,
    *        from_date: Date,
    *        to_date: Date
    *    }
    * 
    * Note: This will fail if the department or the employee is not already created.
    */
    async addDepartmentEmployee(data: DepartmentEmployeeData): Promise<dept_emp | null> {
        return this.prismaDepartmentEmployee.create({ data: data });
    }

    /**
    * Deletes an employee from the entered department.
    */
    async deleteDepartmentEmployee(employeeNumbers: [number], departmentNumbers: [string]): Promise<number> {
        return this.prismaDepartmentEmployee.deleteMany({
            where: {
                emp_no: {
                    in: employeeNumbers
                },
                dept_no: {
                    in: departmentNumbers
                }
            }
        }).then((result) => result.count);
    }

    /**
    * Searches for an employee in the entered department. 
    */
    async findByEmployeeNoAndDepartmentNo(data: DepartmentEmployeeData): Promise<dept_emp | null> {
        return this.prismaDepartmentEmployee.findUnique({
            where: {
                emp_no_dept_no: {
                    emp_no: data.emp_no,
                    dept_no: data.dept_no
                }
            }
        });
    }

    /**
    * Updates an employee in the desired department.
    * 
    * Data must be formatted as:
    *   DepartmentEmployeeData = {
    *        emp_no: number,
    *        dept_no: string,
    *        from_date: Date,
    *        to_date: Date
    *    }
    * 
    * Note: This searches for an employee based on the emp_no and the dept_no so, 
    *   those values cannot be updated.
    */
    async updateDepartmentEmployee(data: DepartmentEmployeeData): Promise<dept_emp | null> {
        return this.prismaDepartmentEmployee.update({
            data: data,
            where: {
                emp_no_dept_no: {
                    emp_no: data.emp_no,
                    dept_no: data.dept_no
                }
            }
        });
    }
}
