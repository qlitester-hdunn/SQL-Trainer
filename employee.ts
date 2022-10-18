import { employees, employees_gender, PrismaClient } from "@prisma/client";

type EmployeeData = {
  emp_no: number,
  birth_date: Date,
  first_name: string,
  last_name: string,
  gender: employees_gender,
  hire_date: Date
}

export class Employees {
  constructor(private readonly prismaEmployee: PrismaClient['employees'])  {}

  async findByEmployeeNo(employeeNo: number): Promise<employees | null> {
    return this.prismaEmployee.findUnique({ 
      where: { 
        emp_no: employeeNo,
      }
    })
  }

  async addEmployee(data: EmployeeData): Promise<employees | null> {
    return this.prismaEmployee.create({ data: data })
  }

  async updateEmployee(data: EmployeeData): Promise<employees | null> {
    return this.prismaEmployee.update({ 
      data: data,
      where: {
        emp_no: data.emp_no
      }
    })
  }

  async deleteEmployees(employeeNumbers: [number]): Promise<number> {
    return this.prismaEmployee.deleteMany({ 
      where: { 
        emp_no: { 
          in: employeeNumbers 
        } 
      }
    }).then((result) => result.count);
  }
}
