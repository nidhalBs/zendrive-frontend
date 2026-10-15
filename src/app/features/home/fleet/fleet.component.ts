import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-fleet',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.scss']
})
export class FleetComponent implements OnInit {
  vehicles: Vehicle[] = [];
  filter = 'ALL';

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe(res => {
      if (res.success) this.vehicles = res.data;
    });
  }

  get filteredVehicles(): Vehicle[] {
    if (this.filter === 'ALL') return this.vehicles;
    return this.vehicles.filter(v => v.comfortLevel === this.filter);
  }
}
