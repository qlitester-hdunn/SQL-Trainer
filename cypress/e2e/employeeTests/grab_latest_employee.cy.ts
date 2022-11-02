import { employees, employees_gender, prisma, PrismaClient } from "@prisma/client";

const employee1_data = {
    emp_no: 500001,
    birth_date: '1995-11-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person1",
    gender: employees_gender.M,
    hire_date: '1999-12-17T00:00:00.000Z'
};
const employee2_data = {
    emp_no: 500002,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "TwoCyTest",
    last_name: "Person2",
    gender: employees_gender.F,
    hire_date: '1997-12-17T00:00:00.000Z'
};

const employee3_data = {
    emp_no: 500003,
    birth_date: '1995-10-17T00:00:00.000Z',
    first_name: "ThreeCyTest",
    last_name: "Person3",
    gender: employees_gender.M,
    hire_date: '1998-12-17T00:00:00.000Z'
};

describe('Employee', () => {
    it('Grab Latest Employee', () => {
        //ensure none of the clients above exist currently

        //create employee 1 and employee 3

        //Find the emp_no of the most recent employee, verifying it is equal to employee 3's emp_no

        // create employee 2

        //Find emp_no of the most recent employee, again verifying that it matchs employee 3's emp_no, as it has the highest emp_no

        //clean up 

    })
});