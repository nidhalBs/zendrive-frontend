import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { VehicleService } from '../../core/services/vehicle.service';
import { Vehicle } from '../../core/models/vehicle.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent implements OnInit {
  step = 1;
  tripType = 'TRANSFER';
  pickup = '';
  dropoff = '';
  pickupDate = '';
  pickupTime = '';
  passengers = 1;
  transferType = 'ONE_WAY';
  flightNumber = '';
  specialRequests = '';
  couponCode = '';
  vehicles: Vehicle[] = [];
  selectedVehicle: Vehicle | null = null;

  constructor(private vehicleService: VehicleService, private router: Router) {}

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe(res => {
      if (res.success) this.vehicles = res.data;
    });
  }

  selectVehicle(v: Vehicle): void { this.selectedVehicle = v; }

  nextStep(): void {
    if (this.step < 3) this.step++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  confirmBooking(): void {
    this.router.navigate(['/auth/login']);
  }
}
