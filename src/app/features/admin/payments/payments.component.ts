import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentService } from '../../../core/services/payment.service';
import { Payment } from '../../../core/models/payment.model';

@Component({
  selector: 'app-admin-payments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class AdminPaymentsComponent implements OnInit {
  payments: Payment[] = [];
  selectedPayment: Payment | null = null;
  statusFilter = '';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;
  totalRevenue = 0;
  completedPayments = 0;
  pendingPayments = 0;
  refundedAmount = 0;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void { this.loadPayments(); this.loadStats(); }

  loadPayments(): void { this.loadPage(0); }

  loadStats(): void {
    this.paymentService.getStats().subscribe(res => {
      if (res.success) {
        this.totalRevenue = res.data.totalRevenue;
        this.completedPayments = res.data.completedPayments;
        this.pendingPayments = res.data.pendingPayments;
        this.refundedAmount = res.data.refundedAmount;
      }
    });
  }

  loadPage(page: number): void {
    this.paymentService.getAll(page, 15, this.statusFilter).subscribe(res => {
      if (res.success) {
        this.payments = res.data.content;
        this.totalPages = res.data.totalPages;
        this.totalElements = res.data.totalElements;
        this.currentPage = res.data.number;
      }
    });
  }

  refundPayment(p: Payment): void {
    if (confirm(`Rembourser ${p.amount} TND pour la réservation #${p.reservationId} ?`)) {
      this.paymentService.refund(p.id).subscribe(() => { this.loadPage(this.currentPage); this.loadStats(); });
    }
  }

  viewDetails(p: Payment): void { this.selectedPayment = p; }

  getStatusClass(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'badge-warning', 'COMPLETED': 'badge-success', 'REFUNDED': 'badge-info', 'FAILED': 'badge-danger' };
    return map[status] || 'badge-neutral';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'En attente', 'COMPLETED': 'Complété', 'REFUNDED': 'Remboursé', 'FAILED': 'Échoué' };
    return map[status] || status;
  }

  getMethodLabel(method: string): string {
    const map: Record<string, string> = { 'CREDIT_CARD': 'Carte bancaire', 'CASH': 'Espèces', 'BANK_TRANSFER': 'Virement', 'ONLINE': 'En ligne' };
    return map[method] || method;
  }
}
