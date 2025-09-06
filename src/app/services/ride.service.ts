export class RideService {
    private rides: any[] = [];

    addRide(ride: any): void {
        this.rides.push(ride);
    }

    updateRide(id: number, updatedRide: any): void {
        const index = this.rides.findIndex(ride => ride.id === id);
        if (index !== -1) {
            this.rides[index] = updatedRide;
        }
    }

    getRides(): any[] {
        return this.rides;
    }

    getRideById(id: number): any | undefined {
        return this.rides.find(ride => ride.id === id);
    }
}