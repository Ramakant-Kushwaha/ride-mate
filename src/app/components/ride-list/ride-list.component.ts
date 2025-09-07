import { Component, OnInit } from '@angular/core';
import { Ride } from '../../models/ride.model';
import { NotificationService } from '../../services/notification.service';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-ride-list',
  templateUrl: './ride-list.component.html',
  styleUrls: ['./ride-list.component.css'],
})
export class RideListComponent implements OnInit {
  availableRides: Ride[] = [];
  loading = true;
  showBookingModal = false;
  selectedRide: any | null = null;
  passengerEmployeeId = '';
  isBooking = false;

  // Filter properties
  filters: any = {};
  vehicleTypes = ['Bike', 'Car'];
  showFilters = false;

  constructor(
    private rideService: RideService,
    private ns: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadRides();
    this.loading = false;
  }

  ngOnDestroy(): void {}

  loadRides(): void {
    this.loading = true;
    this.availableRides = this.rideService.getFilteredRides(this.filters);

    this.loading = false;
  }

  onFilterChange(): void {
    this.loadRides();
  }

  clearFilters(): void {
    this.filters = {};
    this.loadRides();
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  openBookingModal(ride: Ride): void {
    this.selectedRide = ride;
    this.passengerEmployeeId = '';
    this.showBookingModal = true;
  }

  closeBookingModal(): void {
    this.showBookingModal = false;
    this.selectedRide = null;
    this.passengerEmployeeId = '';
  }

  bookRide(passengerEmployeeId: string): void {
    if (!this.selectedRide || !passengerEmployeeId.trim()) {
      this.ns.show('Please enter your Employee ID', 'error');
      return;
    }

    this.isBooking = true;
    const result = this.rideService.bookARide(
      this.selectedRide.id,
      passengerEmployeeId.trim()
    );

    if (result) {
      this.closeBookingModal();
      this.ns.show('Booking confirmed successfully!', 'success');
    }

    this.isBooking = false;
  }

  getSeatsClass(vacantSeats: number): string {
    if (vacantSeats <= 1) return 'seats-critical';
    if (vacantSeats <= 2) return 'seats-low';
    return 'seats-available';
  }

  onModalClick(event: Event): void {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeBookingModal();
    }
  }
}
