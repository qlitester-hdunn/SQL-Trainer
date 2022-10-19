import { departments, PrismaClient } from "@prisma/client";

type DepartmentData = {
    dept_no: string,
    dept_name: string
}

export class Departments {
    constructor(private readonly prismaDepartment: PrismaClient['departments']) { }

    async addDepartment(data: DepartmentData): Promise<departments | null> {
        return this.prismaDepartment.create({ data: data })
    }

    async deleteDepartment(departmentNumbers: [string]): Promise<number> {
        return this.prismaDepartment.deleteMany({
            where: {
                dept_no: {
                    in: departmentNumbers
                }
            }
        }).then((result) => result.count);
    }

    async findByDepartmentNo(departmentNo: string): Promise<departments | null> {
        return this.prismaDepartment.findUnique({
            where: {
                dept_no: departmentNo,
            }
        })
    }

    async getLatestAddedDepartmentNo(): Promise<string> {
        const latest_department_number = await this.prismaDepartment.findMany({ orderBy: { dept_no: 'desc' } });
        return latest_department_number[0].dept_no;
    }

    async updateDepartment(data: DepartmentData): Promise<departments | null> {
        return this.prismaDepartment.update({
            data: data,
            where: {
                dept_no: data.dept_no
            }
        })
    }
}
