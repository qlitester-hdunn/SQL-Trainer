import { titles, employees, employees_gender, PrismaClient } from "@prisma/client";

const titleData = {
    emp_no: 50001,
    title: "Overseer",
    from_date: '1995-12-17T00:00:00.000Z',
    to_date: '1999-12-17T00:00:00.000Z'
}

const employeeData = {
    emp_no: 500001,
    birth_date: '1975-12-17T00:00:00.000Z',
    first_name: "InitialCyTest",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: '1995-12-17T00:00:00.000Z'
};