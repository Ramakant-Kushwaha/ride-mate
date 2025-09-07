import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static vehicleNumber(control: AbstractControl): ValidationErrors | null {
    const value = control.value;

    if (!value) {
      return { required: true };
    }

    const vehicleNumberPattern =
      /^([A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{1,4}|[0-9]{2}BH[0-9]{4}[A-Z]{1,2})$/;

    if (!vehicleNumberPattern.test(value.replace(/\s+/g, '').toUpperCase())) {
      return { invalidVehicleNumber: true };
    }

    return null;
  }
}
