import { departments, PrismaClient } from "@prisma/client";

type DepartmentData = {
    dept_no: string,
    dept_name: string
}

export class Departments {
    constructor(private readonly prismaDepartment: PrismaClient['departments']) { }

    /**
    * Adds a new department with the given data.
    * 
    * Inputted Data must be formatted as:
    *   DepartmentData = {
    *        dept_no: string,
    *        dept_name: string
    *    }
    */
    async addDepartment(data: DepartmentData): Promise<departments | null> {
        return this.prismaDepartment.create({ data: data })
    }

    /**
    * Deletes every department with the given array of department
    *   numbers.
    * 
    * Note: the entered department number must be an array of strings.
    */
    async deleteDepartment(departmentNumbers: [string]): Promise<number> {
        return this.prismaDepartment.deleteMany({
            where: {
                dept_no: {
                    in: departmentNumbers
                }
            }
        }).then((result) => result.count);
    }

    /**
    * Returns the department with the given department number.
    */
    async findByDepartmentNo(departmentNo: string): Promise<departments | null> {
        return this.prismaDepartment.findUnique({
            where: {
                dept_no: departmentNo,
            }
        })
    }

    /**
    * Returns the department number of the most recently added
    *   department.
    */
    async getLatestAddedDepartmentNo(): Promise<string> {
        const latest_department_number = await this.prismaDepartment.findMany({ orderBy: { dept_no: 'desc' } });
        return latest_department_number[0].dept_no;
    }

    /**
    * Updates the department with the given data.
    * 
    * Inputted data should be formatted as: 
    *    DepartmentData = {
    *        dept_no: string,
    *        dept_name: string
    *    }
    * 
    * Note: the department being updated is selected from the
    *   dept_no value in the given data, so this value cannot
    *   be updated.
    */
    async updateDepartment(data: DepartmentData): Promise<departments | null> {
        return this.prismaDepartment.update({
            data: data,
            where: {
                dept_no: data.dept_no
            }
        })
    }
}
