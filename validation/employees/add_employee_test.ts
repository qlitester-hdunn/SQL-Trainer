import { PrismaClient } from "@prisma/client";
import { Employees } from "../../classes/employee";
import { test_employee } from "../../data/employee_data";
import { expect } from "../../helpers";

const prisma = new PrismaClient();

async function main(prisma: PrismaClient) {
  const employees = new Employees(prisma.employees);
  const expected_employee_information = await test_employee();
  let error_count = 0;

  await employees.deleteEmployees([expected_employee_information.emp_no]);

  await employees.addEmployee({
    emp_no: expected_employee_information.emp_no,
    birth_date: expected_employee_information.birth_date,
    first_name: expected_employee_information.first_name,
    last_name: expected_employee_information.last_name,
    gender: expected_employee_information.gender,
    hire_date: expected_employee_information.hire_date,
  });

  const employee = await employees.findByEmployeeNo(
    expected_employee_information.emp_no
  );

  // Employee number validation
  error_count += expect(employee?.emp_no, expected_employee_information.emp_no);

  // Birth date validation
  error_count += expect(
    employee?.birth_date.toDateString(),
    expected_employee_information.birth_date.toDateString()
  );

  // First name validation
  error_count += expect(
    employee?.first_name,
    expected_employee_information.first_name
  );

  // Last name validation
  error_count += expect(
    employee?.last_name,
    expected_employee_information.last_name
  );

  // Gender validation
  error_count += expect(employee?.gender, expected_employee_information.gender);

  // Hire date validation
  error_count += expect(
    employee?.hire_date.toDateString(),
    expected_employee_information.hire_date.toDateString()
  );

  await employees.deleteEmployees([expected_employee_information.emp_no]);

  console.log(`\nNumber of Errors found: ${error_count}\n`);
}

main(prisma)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
