import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ReservationService } from '../../../core/services/reservation.service';
import { LoyaltyService } from '../../../core/services/loyalty.service';
import { NotificationService } from '../../../core/services/notification.service';
import { Reservation } from '../../../core/models/reservation.model';
import { LoyaltyAccount } from '../../../core/models/loyalty.model';
import { User } from '../../../core/models/user.model';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ClientDashboardComponent implements OnInit {
  user: User | null = null;
  recentReservations: Reservation[] = [];
  totalReservations = 0;
  pendingReservations = 0;
  loyaltyPoints = 0;
  unreadNotifs = 0;

  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private loyaltyService: LoyaltyService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    this.reservationService.getMyReservations(0, 5).subscribe(res => {
      if (res.success) {
        this.recentReservations = res.data.content;
        this.totalReservations = res.data.totalElements;
        this.pendingReservations = this.recentReservations.filter(r => r.status === 'PENDING').length;
      }
    });
    this.loyaltyService.getAccount().subscribe(res => {
      if (res.success) this.loyaltyPoints = res.data.availablePoints;
    });
    this.notificationService.getUnreadCount().subscribe(res => {
      if (res.success) this.unreadNotifs = res.data;
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'badge-warning', 'CONFIRMED': 'badge-info', 'IN_PROGRESS': 'badge-primary',
      'COMPLETED': 'badge-success', 'CANCELLED': 'badge-danger', 'REFUNDED': 'badge-neutral'
    };
    return map[status] || 'badge-neutral';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'En attente', 'CONFIRMED': 'Confirmée', 'IN_PROGRESS': 'En cours',
      'COMPLETED': 'Terminée', 'CANCELLED': 'Annulée', 'REFUNDED': 'Remboursée'
    };
    return map[status] || status;
  }
}
