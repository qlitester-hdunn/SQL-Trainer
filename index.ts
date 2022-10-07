//  @TODO for more practice: Ouput # of employees per department (limit 10 if a lot) sorted by most employees.

import { employees_gender, PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()

async function main() {
  // let numberOfEmployeesPerDepartment = [];

  const allEmployees = await prisma.employees.findMany({
    select: {
      first_name: true,
      last_name: true,
      dept_emp: {
        select: {
          departments: {
            select: {
              dept_name: true,
            }
          }
        }
      }
    },
    where: {
      gender: employees_gender.F
    },
    take: 10, 
  })

  allEmployees.forEach( (e) => {
    console.log(`${e.first_name}, ${e.last_name}, ${e.dept_emp[0].departments.dept_name}`)
  })

  const newestEmployee = await prisma.employees.findFirst({
    orderBy: {
      hire_date: "desc"
    }
  })
  const oldestEmployee = await prisma.employees.findFirst({
    orderBy: {
      hire_date: "asc"
    }
  })

  console.log(`Newest Employee: ${newestEmployee?.first_name} ${newestEmployee?.last_name} (${newestEmployee?.hire_date})`)
  console.log(`Oldest Employee: ${oldestEmployee?.first_name} ${oldestEmployee?.last_name} (${oldestEmployee?.hire_date})`)

  let demon = prisma.employees.findUnique({
    where: {
      emp_no: 666,
    }
  })

  if (demon != null) {
    console.log("Found existing demon, updating!")
    let updateEmployee = await prisma.employees.update({
      where: {
        emp_no: 666,
      },
      data: {
        first_name: "Demon",
      }
    })
    console.log(`${updateEmployee.first_name} updated!`)
  } else {
    let result = await prisma.employees.create({
      data: {
        emp_no: 666,
        first_name: "Brian",
        last_name: "Matejka",
        hire_date: new Date(),
        birth_date: new Date(),
        gender: employees_gender.M,
      }
    })

    console.log(result)
  }

  await prisma.employees.delete({
    where: {
      emp_no: 666,
    }
  })
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
