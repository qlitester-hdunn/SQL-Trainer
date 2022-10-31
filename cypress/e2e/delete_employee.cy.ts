import { employees, employees_gender, prisma, PrismaClient } from "@prisma/client";

const employee_data = {
    emp_no: 500001,
    birth_date: '1995-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
};

//create employee with data above
//after creation, ensure employee exists
//delete the employee
//search for employee, ensuring it comes back as null

