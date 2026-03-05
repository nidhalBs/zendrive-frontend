import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { Reservation } from '../../../core/models/reservation.model';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class AdminReservationsComponent implements OnInit {
  reservations: Reservation[] = [];
  selectedReservation: Reservation | null = null;
  statusFilter = '';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;

  constructor(private adminService: AdminService, private reservationService: ReservationService) {}

  ngOnInit(): void { this.loadReservations(); }

  loadReservations(): void { this.loadPage(0); }

  loadPage(page: number): void {
    this.adminService.getAllReservations(page, 15, this.statusFilter).subscribe(res => {
      if (res.success) {
        this.reservations = res.data.content;
        this.totalPages = res.data.totalPages;
        this.totalElements = res.data.totalElements;
        this.currentPage = res.data.number;
      }
    });
  }

  viewReservation(r: Reservation): void { this.selectedReservation = r; }

  updateStatus(r: Reservation, status: string): void {
    this.adminService.updateReservationStatus(r.id, status).subscribe(() => this.loadPage(this.currentPage));
  }

  cancelReservation(r: Reservation): void {
    if (confirm('Annuler cette réservation ?')) {
      this.reservationService.cancel(r.id, 'Annulée par admin').subscribe(() => this.loadPage(this.currentPage));
    }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'badge-warning', 'CONFIRMED': 'badge-info', 'IN_PROGRESS': 'badge-primary', 'COMPLETED': 'badge-success', 'CANCELLED': 'badge-danger' };
    return map[status] || 'badge-neutral';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'En attente', 'CONFIRMED': 'Confirmée', 'IN_PROGRESS': 'En cours', 'COMPLETED': 'Terminée', 'CANCELLED': 'Annulée' };
    return map[status] || status;
  }
}
