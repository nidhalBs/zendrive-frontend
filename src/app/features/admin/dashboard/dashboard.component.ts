import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  stats: any = {
    totalRevenue: 0, totalReservations: 0, totalClients: 0,
    totalVehicles: 0, averageRating: 0, pendingReservations: 0
  };
  recentReservations: any[] = [];

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.getDashboardStats().subscribe(res => {
      if (res.success) this.stats = res.data;
    });
    this.adminService.getAllReservations(0, 5).subscribe(res => {
      if (res.success) this.recentReservations = res.data.content;
    });
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'badge-warning', 'CONFIRMED': 'badge-info', 'IN_PROGRESS': 'badge-primary',
      'COMPLETED': 'badge-success', 'CANCELLED': 'badge-danger'
    };
    return map[status] || 'badge-neutral';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = {
      'PENDING': 'En attente', 'CONFIRMED': 'Confirmée', 'IN_PROGRESS': 'En cours',
      'COMPLETED': 'Terminée', 'CANCELLED': 'Annulée'
    };
    return map[status] || status;
  }
}
