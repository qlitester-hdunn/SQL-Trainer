import { employees_gender, PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
  const employee_to_find = {
    first_name: 'Cindy',
    last_name: 'LouWho'
  }

  const employee = await prisma.employees.findFirst({
    select: {
      emp_no: true,
      first_name: true,
      last_name: true,
      birth_date: true,
      gender: true,
      hire_date: true,
    },
    where: {
      first_name: employee_to_find.first_name,
      last_name: employee_to_find.last_name,
    }
  });

  if (employee != null){
    console.log(``);
    console.log(`EMPLOYEE FOUND!`);
    console.log(`------------------`);
    console.log(`Employee #: ${employee.emp_no}`);
    console.log(`Name: ${employee.first_name} ${employee.last_name}`);
    console.log(`Birthday: ${employee.birth_date}`);
    console.log(`Gender: ${employee.gender}`);
    console.log(`Hire Date: ${employee.hire_date}`);
    console.log(``);
  } else {
    console.log('Employee not found')
  }
  
}

main()
.then(async() => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
  process.exit(1)
})
