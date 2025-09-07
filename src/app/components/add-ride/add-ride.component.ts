import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ride } from '../../models/ride.model';
import { NotificationService } from '../../services/notification.service';
import { RideService } from '../../services/ride.service';
import { DateUtils } from '../../utils/date.utils';
import { CustomValidators } from '../../validators/custom.validators';

@Component({
  selector: 'app-add-ride',
  templateUrl: './add-ride.component.html',
  styleUrls: ['./add-ride.component.css'],
})
export class AddRideComponent implements OnInit {
  public addRideForm: FormGroup;
  public isSubmitting = false;
  public minTime: string = DateUtils.getMinTime();

  public vehicleTypes = ['Bike', 'Car'];

  constructor(
    private fb: FormBuilder,
    private rideService: RideService,
    private ns: NotificationService
  ) {
    this.addRideForm = this.createForm();
  }

  ngOnInit(): void {
    this.minTime = DateUtils.getMinTime();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      employeeId: ['', [Validators.required]],
      vehicleType: ['', [Validators.required]],
      vehicleNo: ['', [Validators.required, CustomValidators.vehicleNumber]],
      vacantSeats: [
        '',
        [Validators.required, Validators.min(1), Validators.max(20)],
      ],
      time: [DateUtils.getMinTime(), [Validators.required]],
      pickupPoint: ['', [Validators.required, Validators.minLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  public onSubmit(): void {
    if (this.addRideForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const formData: any = this.addRideForm.value;

      const ride: Ride = new Ride(formData);

      this.rideService.addRide(ride);

      this.isSubmitting = false;
      this.resetForm();
    } else {
      this.markFormGroupTouched();
    }
  }

  private resetForm(): void {
    this.addRideForm.reset();
    this.minTime = DateUtils.getCurrentDate();
  }

  private markFormGroupTouched(): void {
    Object.keys(this.addRideForm.controls).forEach((key) => {
      const control = this.addRideForm.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  public getErrorMessage(fieldName: string): string {
    const fieldControl = this.addRideForm.get(fieldName);

    if (fieldControl && fieldControl.errors && fieldControl.touched) {
      const errors = fieldControl.errors;

      if (errors['required'])
        return `${this.getFieldDisplayName(fieldName)} is required`;
      if (errors['minLength'])
        return `${this.getFieldDisplayName(
          fieldName
        )} must be at least 3 characters long`;
      if (errors['min'])
        return `${this.getFieldDisplayName(fieldName)} must be at least 1`;
      if (errors['max'])
        return `${this.getFieldDisplayName(fieldName)} cannot exceed 20`;
      if (errors['invalidVehicleNumber'])
        return 'Please enter a valid vehicle number';
      if (errors['invalidTime']) return 'Please enter a valid time';
    }

    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      employeeId: 'Employee ID',
      vehicleType: 'Vehicle Type',
      vehicleNo: 'Vehicle Number',
      vacantSeats: 'Vacant Seats',
      time: 'Time',
      pickupPoint: 'Pickup Point',
      destination: 'Destination',
    };

    return displayNames[fieldName] || fieldName;
  }

  public isFieldInvalid(fieldName: string): boolean {
    const control = this.addRideForm.get(fieldName);
    return !!(control && control.errors && control.touched);
  }
}
