import { dept_manager, PrismaClient } from "@prisma/client";

type DepartmentManagerData = {
    emp_no: number,
    dept_no: string,
    from_date: Date,
    to_date: Date
}

export class Department_Managers {
    constructor(private readonly prismaDepartmentManager: PrismaClient['dept_manager']) { }

    /**
    * Add a manager to the desired department.
    * 
    * Data must be formatted as:
    *   DepartmentManagerData = {
    *        emp_no: number,
    *        dept_no: string,
    *        from_date: Date,
    *        to_date: Date
    *    }
    * 
    * Note: This will fail if the department or the manager is not already created.
    */
    async addDepartmentManager(data: DepartmentManagerData): Promise<dept_manager | null> {
        return this.prismaDepartmentManager.create({ data: data });
    }

    /**
    * Deletes an manager from the entered department.
    */
    async deleteDepartmentManager(managerNumbers: [number], departmentNumbers: [string]): Promise<number> {
        return this.prismaDepartmentManager.deleteMany({
            where: {
                emp_no: {
                    in: managerNumbers
                },
                dept_no: {
                    in: departmentNumbers
                }
            }
        }).then((result) => result.count);
    }

    /**
    * Searches for a manager in the entered department. 
    */
    async findByEmployeeNoAndDepartmentNo(emp_no: number, dept_no: string): Promise<dept_manager | null> {
        return this.prismaDepartmentManager.findUnique({
            where: {
                emp_no_dept_no: {
                    emp_no: emp_no,
                    dept_no: dept_no
                }
            }
        });
    }

    /**
    * Updates a manager in the desired department.
    * 
    * Data must be formatted as:
    *   DepartmentManagerData = {
    *        emp_no: number,
    *        dept_no: string,
    *        from_date: Date,
    *        to_date: Date
    *    }
    * 
    * Note: This searches for an manager based on the emp_no and the dept_no so, 
    *   those values cannot be updated.
    */
    async updateDepartmentManager(data: DepartmentManagerData): Promise<dept_manager | null> {
        return this.prismaDepartmentManager.update({
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
