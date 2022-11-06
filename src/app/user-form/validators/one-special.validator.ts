import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function oneSpecialCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const check = control.value
      .split('')
      .some((char) => specialCharacters.includes(char));
    return check ? null : { special: { value: control.value } };
  };
}

const specialCharacters = [
  ' ',
  '!',
  '"',
  '#',
  '$',
  '%',
  '&',
  "'",
  '(',
  ')',
  '*',
  '+',
  ',',
  '-',
  '.',
  '/',
  ':',
  ';',
  '<',
  '=',
  '>',
  '?',
  '@',
  '[',
  '\\',
  ']',
  '^',
  '_',
  '`',
  '{',
  '|',
  '}',
  '~',
];
