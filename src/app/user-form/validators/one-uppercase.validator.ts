import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function oneUppercaseCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const check = control.value.split('').some((char) => char.match(/[A-Z]/));
    return check ? null : { upper: { value: control.value } };
  };
}
