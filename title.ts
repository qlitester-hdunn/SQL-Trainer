import { titles, PrismaClient } from "@prisma/client";
import { Employees } from './employee';

type TitleData = {
  emp_no: number,
  title: string,
  from_date: Date,
  to_date?: Date,
}

const prisma = new PrismaClient();

export class Titles {
  constructor(private readonly prismaTitle: PrismaClient['titles']) { }

  /**
  * Add a title to the desired employee.
  * 
  * Data must be formatted as:
  *   TitleData = {
  *        emp_no: number,
  *        title: string,
  *        from_date: Date,
  *        to_date: Date, // *OPTIONAL
  *    }
  * 
  * Note: This will fail if the employee is not already created.
  */
  async addTitle(data: TitleData): Promise<number> {
    return this.prismaTitle.createMany({
      data: [{
        emp_no: data.emp_no,
        title: data.title,
        from_date: data.from_date,
        to_date: data.to_date,
      }]
    }).then((result) => result.count);
  }

  /**
  * Deletes a title for the employee (employeeNumbers).
  */
  async deleteTitles(employeeNumbers: [number]): Promise<number> {
    return this.prismaTitle.deleteMany({
      where: {
        emp_no: {
          in: employeeNumbers
        }
      }
    }).then((result) => result.count);
  }

  /**
  * Searches for a title for a specific employee. 
  */
  async findTitle(employeeNumbers: number): Promise<titles | null> {
    return this.prismaTitle.findFirst({
      where: {
        emp_no: employeeNumbers,
      }
    })
  }

  /**
  * Returns the title number (emp_no) of the most recently added
  *   title.
  */
  async getLatestAddedTitleEmpNo(): Promise<number> {
    const latest_employee_number = await this.prismaTitle.findMany({ orderBy: { emp_no: 'desc' } });
    return latest_employee_number[0].emp_no;
  }

  /**
  * Updates a title for the employee.
  * 
  * Data must be formatted as:
  *   TitleData = {
  *        emp_no: number,
  *        title: string,
  *        from_date: Date,
  *        to_date: Date,
  *    }
  * 
  * Note: This searches for an employee based on the emp_no and the from_date so, 
  *   those values cannot be updated.
  */
  async updateTitle(data: TitleData): Promise<titles | null> {
    return this.prismaTitle.update({
      data: data,
      where: {
        emp_no_title_from_date: {
          emp_no: data.emp_no,
          title: data.title,
          from_date: data.from_date,
        }
      }
    })
  }
}
