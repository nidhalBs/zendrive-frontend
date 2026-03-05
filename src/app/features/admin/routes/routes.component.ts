import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouteService } from '../../../core/services/route.service';

@Component({
  selector: 'app-admin-routes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class AdminRoutesComponent implements OnInit {
  routes: any[] = [];
  showForm = false;
  editingRoute: any = null;
  form: any = {};

  constructor(private routeService: RouteService) {}

  ngOnInit(): void { this.loadRoutes(); }

  loadRoutes(): void {
    this.routeService.getAll().subscribe(res => {
      if (res.success) this.routes = res.data;
    });
  }

  resetForm(): void {
    this.editingRoute = null;
    this.form = { origin: '', destination: '', distanceKm: 0, estimatedDuration: '',
      basePrice: 0, type: 'AIRPORT_TRANSFER', originLat: 0, originLng: 0,
      destinationLat: 0, destinationLng: 0, description: '', active: true, popular: false };
  }

  editRoute(r: any): void {
    this.editingRoute = r;
    this.form = { ...r };
    this.showForm = true;
  }

  saveRoute(): void {
    const obs = this.editingRoute
      ? this.routeService.update(this.editingRoute.id, this.form)
      : this.routeService.create(this.form);
    obs.subscribe(() => { this.showForm = false; this.loadRoutes(); });
  }

  deleteRoute(r: any): void {
    if (confirm(`Supprimer l'itinéraire "${r.origin} → ${r.destination}" ?`)) {
      this.routeService.delete(r.id).subscribe(() => this.loadRoutes());
    }
  }
}
