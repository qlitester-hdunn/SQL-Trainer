import { salaries, employees, employees_gender, PrismaClient } from "@prisma/client";
import { Employees } from './employee';

type SalaryData = {
  emp_no: number,
  salary: number,
  from_date: Date,
  to_date: Date,
}

type EmployeeData = {
  emp_no: number,
  birth_date: Date,
  first_name: string,
  last_name: string,
  gender: employees_gender,
  hire_date: Date
}

const prisma = new PrismaClient();

export class Salaries {
  constructor(private readonly prismaSalary: PrismaClient['salaries']) { }

  async addSalary(data: SalaryData): Promise<number> {
    return this.prismaSalary.createMany({
      data: [{
        emp_no: data.emp_no,
        salary: data.salary,
        from_date: data.from_date,
        to_date: data.to_date,
      }]
    }).then((result) => result.count);
  }

  async deleteSalaries(employeeNumbers: [number]): Promise<number> {
    return this.prismaSalary.deleteMany({
      where: {
        emp_no: {
          in: employeeNumbers
        }
      }
    }).then((result) => result.count);
  }

  async findSalary(employeeNumbers: number): Promise<salaries | null> {
    return this.prismaSalary.findFirst({
      where: {
        emp_no: employeeNumbers,
      }
    })
  }

  async getLatestAddedSalaryEmpNo(): Promise<number> {
    const latest_employee_number = await this.prismaSalary.findMany({ orderBy: { emp_no: 'desc' } });
    return latest_employee_number[0].emp_no;
  }

  async updateSalary(data: SalaryData): Promise<salaries | null> {
    return this.prismaSalary.update({
      data: data,
      where: {
        emp_no_from_date: {
          emp_no: data.emp_no,
          from_date: data.from_date,
        }
      }
    })
  }
}
