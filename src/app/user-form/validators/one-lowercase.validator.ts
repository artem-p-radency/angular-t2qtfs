import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function oneLowercaseCharacterValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const check = control.value.split('').some((char) => char.match(/[a-z]/));
    return check ? null : { lower: { value: control.value } };
  };
}
