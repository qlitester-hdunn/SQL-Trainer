import { employees_gender, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {

  const updated_employee = await prisma.employees.updateMany({
    where: {
      first_name: 'Cindy',
      last_name: 'LouWho',
      gender: employees_gender.F,
    },
    data: { 
        gender: employees_gender.M,
      },
  });

  console.log(`${updated_employee} records updated`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });