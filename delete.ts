import { employees_gender, PrismaClient } from '@prisma/client';

const pluralize = (num: number, word: string, plural = word + "s") =>
  [1, -1].includes(Number(num)) ? word : plural;

const prisma = new PrismaClient();

async function main() {

  const deleted_employee = await prisma.employees.deleteMany({
    where: { 
      first_name: 'Cindy',
      last_name: 'LouWho',
    },
  });

  console.log(`${deleted_employee.count} ${pluralize(deleted_employee.count, "record")} deleted`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });