import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RideService } from '../../services/ride.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  currentRoute: string = '';

  navItems = [
    { path: '/home', label: 'Home', icon: '🏠' },
    { path: '/add-ride', label: 'Add Ride', icon: '➕' },
    { path: '/rides', label: 'Available Rides', icon: '🚗' },
  ];

  constructor(private router: Router, private rideService: RideService) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;
  }

  isActiveRoute(path: string): boolean {
    return this.currentRoute === path;
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}
