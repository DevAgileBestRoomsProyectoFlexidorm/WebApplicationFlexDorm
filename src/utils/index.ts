import { AbstractControl } from "@angular/forms";

/**
 * Valida que la fecha de inicio sea menor o igual a la fecha de fin
 * @param control Control de formulario
 */
export const validateDateRange = (control: AbstractControl) => {
  const startDate = control.get('startDate')?.value;
  const endDate = control.get('endDate')?.value;

  if (startDate && endDate) {
    return startDate.value <= endDate.value ? null : { dateRangeInvalid: true };
  }

  return null;
}
