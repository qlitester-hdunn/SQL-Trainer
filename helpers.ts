import { PrismaClient } from '@prisma/client'

export const pluralize = (num: number, word: string, plural = word + "s") =>
  [1, -1].includes(Number(num)) ? word : plural;

const prisma = new PrismaClient();

const valid_attributes = ['emp_no', 'birth_date', 'first_name', 'last_name', 'gender', 'hire_date'];

enum employees_gender {
  M,
  F
}

async function set_selection(selection_passed: {}) {
  interface Selection {
    [key: string]: boolean;
  }
  let selection:Selection = {};
  
  let keys = Object.keys(selection_passed);
  let values = Object.values(selection_passed);

  for( let i = 0; i < keys.length; i++ ) {
    let key = keys[i];
    let value = values[i];

    if( !valid_attributes.includes(key) ) {
      throw `INVALID KEY: ${key}`;
    }

    if( value === false ) {
      selection[key] = false;
    } else {
      selection[key] = true;
    }
  }

  return selection;
}

export async function fetch_one_employee(selection_passed = {}, credentials_passed = {}) {
  if( Object.keys(selection_passed).length === 0 ){
    throw '\nNo selection passed\n';
  } else if( Object.keys(credentials_passed).length === 0 ){
    throw '\nNo credentials passed\n';
  } else {
    let selection =  await set_selection(selection_passed)
      .then(async(results) => { return results })
    
    const employee = await prisma.employees.findFirst({
      select: selection,
      where: credentials_passed,
    })

    if( employee === null ){
      throw '\nEmployee not found\n'
    }
    return employee;
  }
}

export const output_employee_attribute = (employee: object, desired_attribute: string) => {
  if( !valid_attributes.includes(desired_attribute) ) {
    throw `\nInvalid attribute: ${desired_attribute}\n\nValid attributes include: [${valid_attributes}]\n`
  } else if( !Object.keys(employee).includes(desired_attribute) ) {
    throw `\nEmployee object did not include a \"${desired_attribute}\" key\nMake sure it was passed in the \"Select\" parameter\n`
  } else {
    let keys = Object.keys(employee);
    let values = Object.values(employee);

    for( let i = 0; i < Object.keys(employee).length; i++ ) {
      let key = keys[i];
      let value = values[i];

      if( keys[i] === desired_attribute ) {
        return `${desired_attribute}: ${values[i]}`;
      }
    }
  }
}

export const output_all_available_employee_attribute = (employee: object) => {
  let attributes = Object.keys(employee);

  if( attributes.length === 0 ) {
    throw '\nNo attributes passed\n'
  } else {
    let invalid_attributes = [];

    for( let i = 0; i < attributes.length; i++ ) {
      let attribute = attributes[i];
      if( !valid_attributes.includes(attribute) ) {
        invalid_attributes.push(attribute);
      }
    }

    if(invalid_attributes.length > 0 ) {
      throw `\nInvalid attributes passed:\n[${invalid_attributes}]`;
    } else {
      let keys = Object.keys(employee);
      let values = Object.values(employee);
      let output = ['\nEMPLOYEE INFO:\n--------------'];
      for( let i = 0; i < attributes.length; i++ ) {
        let attribute = attributes[i];
        for( let i = 0; i < Object.keys(employee).length; i++ ) {
          let key = keys[i];
          let value = values[i];
          
          if( key === attribute ) {
            output.push(`\n${key}: ${value}`);
          }
        }
      }

      output.push('\n');
      return output.join('');
    }
  }
}