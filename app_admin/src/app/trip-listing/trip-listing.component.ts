import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripDataService } from '../services/trip-data.service';
import { TripCardComponent } from '../trip-card/trip-card.component';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  templateUrl: './trip-listing.component.html',
  styleUrl: './trip-listing.component.css'
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getTrips();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  getTrips(): void {
    this.tripDataService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;
        this.message = `There are ${trips.length} trips available.`;
      },
      error: (error: any) => {
        this.message = 'Unable to retrieve trips from the database.';
        console.log('Error:', error);
      }
    });
  }

  addTrip(): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }
    this.router.navigate(['add-trip']);
  }

  deleteTrip(tripCode: string): void {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
      return;
    }
    this.tripDataService.deleteTrip(tripCode).subscribe({
      next: () => this.getTrips(),
      error: (error: any) => console.log('Error:', error)
    });
  }
}
