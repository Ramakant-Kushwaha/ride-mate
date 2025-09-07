import { Injectable } from '@angular/core';
import { IRideDetails, Ride } from '../models/ride.model';
import { DateUtils } from '../utils/date.utils';
import { NotificationService } from './notification.service';

@Injectable()
export class RideService {
  private rides: IRideDetails[] = [];

  public employeesBookedRides: Map<
    string,
    Array<{ time: string; source: string; destination: string }>
  > = new Map();

  constructor(private ns: NotificationService) {}

  public addRide(ride: Ride): void {
    const employeeRides = this.employeesBookedRides.get(ride.employeeId) ?? [];

    const alreadyBooked = employeeRides.some(
      (emp) =>
        this.compareDates(ride.time, emp.time) &&
        emp.source.toLowerCase() === ride.pickupPoint.toLowerCase() &&
        emp.destination.toLowerCase() === ride.destination.toLowerCase()
    );

    if (alreadyBooked) {
      this.ns.show(
        `You have already booked a ride for ${DateUtils.getDate(
          ride.time
        )}, try for another day`,
        'error'
      );
      return;
    }

    // Add ride
    this.rides.push(ride);
    this.employeesBookedRides.set(ride.employeeId, [
      ...employeeRides,
      {
        time: ride.time,
        source: ride.pickupPoint,
        destination: ride.destination,
      },
    ]);

    this.ns.show('Ride added successfully', 'success');
  }

  public bookARide(id: string, passengerEmployeeId: string): boolean {
    const rideDetail: IRideDetails | undefined = this.rides.find(
      (ride) => ride.id === id
    );

    if (
      rideDetail &&
      !this.checkUserHasAlreadyBookedARide(
        passengerEmployeeId,
        rideDetail.bookedBy
      )
    ) {
      rideDetail.bookedBy.push(passengerEmployeeId);
      rideDetail.vacantSeats -= 1;
      return true;
    } else {
      this.ns.show(
        'You have already booked this ride. Please try another one.',
        'error'
      );
      return false;
    }
  }

  getRides(): any[] {
    return this.rides;
  }

  public getFilteredRides(filter: any): any[] {
    return this.rides.filter((ride) => {
      return Object.keys(filter).every((key) => {
        if (key === 'time') {
          return this.compareDates(ride.time, filter.time);
        } else if (filter[key] === 'All Vehicles') {
          return true;
        }
        return (ride as any)[key] === (filter as any)[key];
      });
    });
  }

  getRideById(id: number): any | undefined {
    // return this.rides.find(ride => ride.id === id);
  }

  private checkUserHasAlreadyBookedARide(
    passengerEmployeeId: string,
    allPassengers: string[]
  ): boolean {
    const hasPassengers: string | undefined = allPassengers.find(
      (passenger) => passengerEmployeeId === passenger
    );

    return hasPassengers !== undefined;
  }

  private compareDates(t1: any, t2: any): boolean {
    const d1 = new Date(t1);
    const d2 = new Date(t2);

    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }
}
