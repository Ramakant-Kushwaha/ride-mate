import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IRideDetails } from '../../models/ride.model';

@Component({
  selector: 'app-ride-card',
  templateUrl: './ride-card.component.html',
  styleUrl: './ride-card.component.css',
})
export class RideCardComponent {
  @Input() ride!: IRideDetails;
  @Output() openBookingWindow: EventEmitter<IRideDetails> = new EventEmitter();
  constructor() {}

  getSeatsClass(vacantSeats: number): string {
    if (vacantSeats <= 1) return 'seats-critical';
    if (vacantSeats <= 2) return 'seats-low';
    return 'seats-available';
  }

  public openBookingModal(ride: IRideDetails) {
    this.openBookingWindow.emit(ride);
  }
}
