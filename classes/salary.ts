import { salaries, PrismaClient } from "@prisma/client";

type SalaryData = {
  emp_no: number,
  salary: number,
  from_date: Date,
  to_date: Date,
}

const prisma = new PrismaClient();

export class Salaries {
  constructor(private readonly prismaSalary: PrismaClient['salaries']) { }

  /**
  * Add a salary to the desired employee.
  * 
  * Data must be formatted as:
  *   SalaryData = {
  *        emp_no: number,
  *        salary: number,
  *        from_date: Date,
  *        to_date: Date,
  *    }
  * 
  * Note: This will fail if the employee is not already created.
  */
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

  /**
  * Deletes a salary for the employee (employeeNumbers).
  */
  async deleteSalaries(employeeNumbers: [number]): Promise<number> {
    return this.prismaSalary.deleteMany({
      where: {
        emp_no: {
          in: employeeNumbers
        }
      }
    }).then((result) => result.count);
  }

  /**
  * Searches for a salary for a specific employee. 
  */
  async findSalary(employeeNumbers: number): Promise<salaries | null> {
    return this.prismaSalary.findFirst({
      where: {
        emp_no: employeeNumbers,
      }
    });
  }

  /**
  * Returns the salary number (emp_no) of the most recently added
  *   salary.
  */
  async getLatestAddedSalaryEmpNo(): Promise<number> {
    const latest_employee_number = await this.prismaSalary.findMany({ orderBy: { emp_no: 'desc' } });
    return latest_employee_number[0].emp_no;
  }

  /**
  * Updates a salary for the employee.
  * 
  * Data must be formatted as:
  *   SalaryData = {
  *        emp_no: number,
  *        salary: number,
  *        from_date: Date,
  *        to_date: Date,
  *    }
  * 
  * Note: This searches for an employee based on the emp_no and the from_date so, 
  *   those values cannot be updated.
  */
  async updateSalary(data: SalaryData): Promise<salaries | null> {
    return this.prismaSalary.update({
      data: data,
      where: {
        emp_no_from_date: {
          emp_no: data.emp_no,
          from_date: data.from_date,
        }
      }
    });
  }
}
