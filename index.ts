import { dept_emp, departments, employees, employees_gender, PrismaClient } from '@prisma/client'
import { Employees } from './employee'
import { Departments } from './departments'
import { Department_Employees } from './department_employees'
import { pluralize } from './helpers'

const prisma = new PrismaClient()

async function main(prisma: PrismaClient) {
  const departments = new Departments(prisma.departments);
  const employees = new Employees(prisma.employees);
  const department_employees = new Department_Employees(prisma.dept_emp);

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

  // ADD DEPARTMENT
  await departments.addDepartment({
    dept_no: 't001',
    dept_name: 'Test Automation'
  });
  const addedDepartment = await departments.findByDepartmentNo('t001');
  console.log(`\nDepartment Created:`);
  console.log(addedDepartment);

  // UPDATE DEPARTMENT
  await departments.updateDepartment({
    dept_no: 't001',
    dept_name: 'Test Automation Update'
  });
  const updatedDepartment = await departments.findByDepartmentNo('t001');
  console.log(`\nDepartment Updated:`);
  console.log(updatedDepartment);

  // Most recently added department number
  const most_recent_department_no = await departments.getLatestAddedDepartmentNo();
  console.log(`\nMost Recently Added Department Number:`);
  console.log(most_recent_department_no);

  // ADD DEPARTMENT EMPLOYEE
  await department_employees.addDepartmentEmployee({
    emp_no: 12345,
    dept_no: 't001',
    from_date: new Date(),
    to_date: new Date()
  });
  const addedDepartmentEmployee = await department_employees.findByEmployeeNoAndDepartmentNo(12345, 't001');
  console.log(`\nDepartment Employee Created:`);
  console.log(addedDepartmentEmployee);

  // UPDATE DEPARTMENT EMPLOYEE
  await department_employees.updateDepartmentEmployee({
    emp_no: 12345,
    dept_no: 't001',
    from_date: new Date(),
    to_date: new Date()
  });
  const updatedDepartmentEmployee = await department_employees.findByEmployeeNoAndDepartmentNo(12345, 't001');
  console.log(`\nDepartment Employee Updated:`);
  console.log(updatedDepartmentEmployee);

  // DELETE DEPARTMENT EMPLOYEE
  const deletedDepartmentEmployeeCount = await department_employees.deleteDepartmentEmployee([12345], ['t001']);
  console.log(`\n${deletedDepartmentEmployeeCount} ${pluralize(deletedDepartmentEmployeeCount, "record")} deleted\n`);

  // DELETE DEPARTMENT
  const deletedDepartmentCount = await departments.deleteDepartment(['t001'])
  console.log(`\n${deletedDepartmentCount} ${pluralize(deletedDepartmentCount, "record")} deleted\n`);
}

main(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  }).finally(async () => {
    await prisma.$disconnect();
  });