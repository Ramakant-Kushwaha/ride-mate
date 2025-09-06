import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { NotificationComponent } from './components/notification/notification.component';
import { RideFilterComponent } from './components/ride-filter/ride-filter.component';
import { RideListComponent } from './components/ride-list/ride-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RideService } from './services/ride.service';
import { NotificationService } from './services/notification.service';
import { StorageService } from './services/storage.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    AddRideComponent,
    NotificationComponent,
    RideFilterComponent,
    RideListComponent,
    HomePageComponent,
    NavBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
  providers: [RideService, NotificationService, StorageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
