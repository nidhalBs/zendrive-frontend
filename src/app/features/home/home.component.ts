import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../core/services/vehicle.service';
import { RouteService } from '../../core/services/route.service';
import { ReviewService } from '../../core/services/review.service';
import { ExcursionService } from '../../core/services/excursion.service';
import { Vehicle } from '../../core/models/vehicle.model';
import { Route } from '../../core/models/loyalty.model';
import { Review } from '../../core/models/review.model';
import { Excursion } from '../../core/models/excursion.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  vehicles: Vehicle[] = [];
  popularRoutes: Route[] = [];
  reviews: Review[] = [];
  excursions: Excursion[] = [];
  bookingTab: 'transfer' | 'excursion' = 'transfer';

  services = [
    { icon: 'flight', title: 'Transfert Aéroport', description: 'Service ponctuel de transfert depuis et vers tous les aéroports.' },
    { icon: 'hotel', title: 'Transfert Hôtel', description: 'Transport confortable entre votre hôtel et vos destinations.' },
    { icon: 'explore', title: 'Excursions Privées', description: 'Découvrez les plus beaux sites avec un guide personnel.' },
    { icon: 'star', title: 'Service VIP', description: 'Un service d\'exception avec des véhicules haut de gamme.' }
  ];

  constructor(
    private vehicleService: VehicleService,
    private routeService: RouteService,
    private reviewService: ReviewService,
    private excursionService: ExcursionService
  ) {}

  ngOnInit(): void {
    this.vehicleService.getAll().subscribe(res => { if (res.success) this.vehicles = res.data.slice(0, 3); });
    this.routeService.getPopular().subscribe(res => { if (res.success) this.popularRoutes = res.data.slice(0, 3); });
    this.reviewService.getPublicReviews().subscribe(res => { if (res.success) this.reviews = res.data.slice(0, 3); });
    this.excursionService.getAll().subscribe(res => { if (res.success) this.excursions = res.data.slice(0, 4); });
  }

  getStars(rating: number): number[] {
    return Array(Math.round(rating)).fill(0);
  }
}
