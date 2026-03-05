import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReviewService } from '../../../core/services/review.service';
import { Review } from '../../../core/models/review.model';

@Component({
  selector: 'app-admin-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class AdminReviewsComponent implements OnInit {
  reviews: Review[] = [];
  statusFilter = '';
  currentPage = 0;
  totalPages = 1;
  totalElements = 0;

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void { this.loadReviews(); }

  loadReviews(): void { this.loadPage(0); }

  loadPage(page: number): void {
    this.reviewService.getAll(page, 10, this.statusFilter).subscribe(res => {
      if (res.success) {
        this.reviews = res.data.content;
        this.totalPages = res.data.totalPages;
        this.totalElements = res.data.totalElements;
        this.currentPage = res.data.number;
      }
    });
  }

  approve(r: Review): void { this.reviewService.updateStatus(r.id, 'APPROVED').subscribe(() => { r.status = 'APPROVED'; }); }
  reject(r: Review): void { this.reviewService.updateStatus(r.id, 'REJECTED').subscribe(() => { r.status = 'REJECTED'; }); }
  feature(r: Review): void { this.reviewService.updateStatus(r.id, 'FEATURED').subscribe(() => { r.status = 'FEATURED'; }); }
  unfeature(r: Review): void { this.reviewService.updateStatus(r.id, 'APPROVED').subscribe(() => { r.status = 'APPROVED'; }); }

  deleteReview(r: Review): void {
    if (confirm('Supprimer cet avis ?')) {
      this.reviewService.delete(r.id).subscribe(() => this.loadPage(this.currentPage));
    }
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'badge-warning', 'APPROVED': 'badge-success', 'REJECTED': 'badge-danger', 'FEATURED': 'badge-primary' };
    return map[status] || 'badge-neutral';
  }

  getStatusLabel(status: string): string {
    const map: Record<string, string> = { 'PENDING': 'En attente', 'APPROVED': 'Approuvé', 'REJECTED': 'Rejeté', 'FEATURED': 'Mis en avant' };
    return map[status] || status;
  }
}
