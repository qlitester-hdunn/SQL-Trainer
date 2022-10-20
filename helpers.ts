export const pluralize = (num: number, word: string, plural = word + "s") =>
  [1, -1].includes(Number(num)) ? word : plural;

/**
* Asserts whether two values are equivalent to each other or not
*   and returns the number of errors found (1 or 0).
*
* If there is an error found it will log the entered values to the console.
*/
export function expect(value: any, expected: any) {
  let error_count = 0;
  try {
    if (value !== expected) {
      error_count = error_count + 1;
      throw new Error;
    }
  } catch (e) {
    console.log(`\nThe value: "${value}" does not match the expected value: "${expected}".\n`);
  }

  return error_count;
}