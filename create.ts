import { employees_gender, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const new_employee_number = await prisma.employees.count() + 1;

  const created_employee = await prisma.employees.create({
    data: { 
        emp_no: new_employee_number + 1,
        birth_date: new Date(),
        first_name: 'Cindy',
        last_name: 'LouWho',
        gender: employees_gender.F,
        hire_date: new Date(),
      },
  });

  console.log(created_employee);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });