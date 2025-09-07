export interface IRideDetails {
  employeeId: string;
  vehicleType: 'Bike' | 'Car';
  vehicleNo: string;
  vacantSeats: number;
  time: string;
  pickupPoint: string;
  destination: string;
  bookedBy: string[];
  id?: string;
}

export class Ride {
  employeeId: string;
  vehicleType: 'Bike' | 'Car';
  vehicleNo: string;
  vacantSeats: number;
  time: string;
  pickupPoint: string;
  destination: string;
  id: string;
  bookedBy: string[];

  constructor(data: IRideDetails) {
    this.employeeId = data.employeeId;
    this.vehicleType = data.vehicleType;
    this.vehicleNo = data.vehicleNo;
    this.vacantSeats = data.vacantSeats;
    this.time = data.time;
    this.pickupPoint = data.pickupPoint;
    this.destination = data.destination;
    this.id = this.generateId();
    this.bookedBy = data.bookedBy ?? [];
  }

  private generateId(): string {
    return `ride_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
