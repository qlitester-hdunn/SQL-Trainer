import { departments, PrismaClient } from "@prisma/client";

type DepartmentData = {
    dept_no: string,
    dept_name: string
}