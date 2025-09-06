import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  public today: Date = new Date();
  title = 'Ride Mate';

  public features = [
    {
      icon: '🚗',
      title: 'Share Your Ride',
      description: 'Add your vehicle and offer rides to colleagues',
      action: 'Add Ride',
      route: '/add-ride',
      color: '#3498db',
    },
    {
      icon: '🔍',
      title: 'Find a Ride',
      description: 'Browse available rides and book your seat',
      action: 'Browse Rides',
      route: '/rides',
      color: '#27ae60',
    },
    {
      icon: '⏰',
      title: 'Real-time Updates',
      description: 'Get instant updates on ride availability',
      action: 'View Dashboard',
      route: '/rides',
      color: '#f39c12',
    },
  ];

  constructor(private router: Router, private rideService: RideService) {}

  ngOnInit(): void {
    this.updateDateTime();
  }

  ngOnDestroy(): void {}

  private updateDateTime(): void {
    this.today = new Date();
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  onFeatureAction(feature: any): void {
    this.navigateTo(feature.route);
  }
}
