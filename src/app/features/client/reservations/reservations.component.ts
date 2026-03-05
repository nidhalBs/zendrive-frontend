import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReservationService } from '../../../core/services/reservation.service';
import { Reservation } from '../../../core/models/reservation.model';

@Component({
  selector: 'app-client-reservations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ClientReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  currentPage = 0;
  totalPages = 1;

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void { this.loadPage(0); }

  loadPage(page: number): void {
    this.reservationService.getMyReservations(page, 10).subscribe(res => {
      if (res.success) {
        this.reservations = res.data.content;
        this.totalPages = res.data.totalPages;
        this.currentPage = res.data.number;
      }
    });
  }

  cancelReservation(r: Reservation): void {
    if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
      this.reservationService.cancel(r.id, 'Annulée par le client').subscribe(() => this.loadPage(this.currentPage));
    }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'badge-warning', 'CONFIRMED': 'badge-info', 'IN_PROGRESS': 'badge-primary', 'COMPLETED': 'badge-success', 'CANCELLED': 'badge-danger', 'REFUNDED': 'badge-neutral' };
    return map[status] || 'badge-neutral';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'En attente', 'CONFIRMED': 'Confirmée', 'IN_PROGRESS': 'En cours', 'COMPLETED': 'Terminée', 'CANCELLED': 'Annulée', 'REFUNDED': 'Remboursée' };
    return map[status] || status;
  }
}
