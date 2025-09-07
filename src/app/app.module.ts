import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { BookingModelComponent } from './components/booking-model/booking-model.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RideCardComponent } from './components/ride-card/ride-card.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { NotificationService } from './services/notification.service';
import { RideService } from './services/ride.service';
import { StorageService } from './services/storage.service';

@NgModule({
  declarations: [
    AppComponent,
    AddRideComponent,
    NotificationComponent,
    RideListComponent,
    HomePageComponent,
    NavBarComponent,
    RideCardComponent,
    BookingModelComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [RideService, NotificationService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
