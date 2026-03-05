import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../../core/services/vehicle.service';
import { Vehicle } from '../../../core/models/vehicle.model';

@Component({
  selector: 'app-admin-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class AdminVehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];
  showForm = false;
  editingVehicle: Vehicle | null = null;
  form: any = {};

  constructor(private vehicleService: VehicleService) {}

  ngOnInit(): void { this.loadVehicles(); }

  loadVehicles(): void {
    this.vehicleService.getAll().subscribe(res => {
      if (res.success) this.vehicles = res.data;
    });
  }

  resetForm(): void {
    this.editingVehicle = null;
    this.form = { name: '', brand: '', model: '', year: 2024, maxPassengers: 4, maxBaggage: 3,
      pricePerKm: 1.5, basePrice: 20, comfortLevel: 'STANDARD', licensePlate: '',
      imageUrl: '', description: '', available: true, hasWifi: false, hasAC: true, hasCharger: false };
  }

  editVehicle(v: Vehicle): void {
    this.editingVehicle = v;
    this.form = { ...v };
    this.showForm = true;
  }

  saveVehicle(): void {
    const obs = this.editingVehicle
      ? this.vehicleService.update(this.editingVehicle.id, this.form)
      : this.vehicleService.create(this.form);
    obs.subscribe(() => { this.showForm = false; this.loadVehicles(); });
  }

  deleteVehicle(v: Vehicle): void {
    if (confirm(`Supprimer le véhicule "${v.name}" ?`)) {
      this.vehicleService.delete(v.id).subscribe(() => this.loadVehicles());
    }
  }
}
