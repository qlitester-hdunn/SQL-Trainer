import { employees, employees_gender, PrismaClient } from '@prisma/client'
import { Employees } from './employee'
import { pluralize } from './helpers'

const prisma = new PrismaClient()

async function main(prisma: PrismaClient) {
  const employees = new Employees(prisma.employees);

  // CREATE (ADD):
  const addedEmployee: employees | null = await employees.addEmployee({
    emp_no: 1444444443,
    birth_date: new Date(),
    first_name: "Test",
    last_name: "Person",
    gender: employees_gender.M,
    hire_date: new Date()
  })
  const employee = await employees.findByEmployeeNo(1444444443)
  console.log(`\nEmployee Created! Welcome:`);
  console.log(employee);


  // UPDATE:
  const updateEmployee: employees | null = await employees.updateEmployee({
    emp_no: 1444444443,
    birth_date: new Date(),
    first_name: 'Test',
    last_name: 'Person',
    gender: employees_gender.F,
    hire_date: new Date(),
  })
  const updated_employee = await employees.findByEmployeeNo(1444444443)
  console.log(`\nEmployee Information Update!:`);
  console.log(updated_employee);

  // DESTROY (DELETE):
  const deletedEmployeeCount = await employees.deleteEmployees([1444444443])
  console.log(`\n${deletedEmployeeCount} ${pluralize(deletedEmployeeCount, "record")} deleted\n`);
}

main(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });