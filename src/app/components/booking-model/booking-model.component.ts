import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRideDetails } from '../../models/ride.model';

@Component({
  selector: 'app-booking-model',
  templateUrl: './booking-model.component.html',
  styleUrl: './booking-model.component.css',
})
export class BookingModelComponent {
  @Input() public selectedRide!: IRideDetails;

  @Output() public onCloseBookingModal: EventEmitter<any> = new EventEmitter();
  @Output() public onBookRide: EventEmitter<any> = new EventEmitter();

  passengerEmployeeId = '';
  isBooking = false;

  public closeBookingModal() {
    this.onCloseBookingModal.emit();
  }

  onModalClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeBookingModal();
    }
  }

  public bookRide() {
    this.onBookRide.emit(this.passengerEmployeeId);
  }
}
