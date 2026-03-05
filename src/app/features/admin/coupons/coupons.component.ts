import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-coupons',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class AdminCouponsComponent implements OnInit {
  coupons: any[] = [];
  showForm = false;
  editingCoupon: any = null;
  form: any = {};

  constructor(private adminService: AdminService) {}

  ngOnInit(): void { this.loadCoupons(); }

  loadCoupons(): void {
    this.adminService.getAllCoupons().subscribe(res => {
      if (res.success) this.coupons = res.data.content;
    });
  }

  resetForm(): void {
    this.editingCoupon = null;
    this.form = { code: '', description: '', discountType: 'PERCENTAGE', discountValue: 10,
      maxUsage: 0, startDate: '', endDate: '', minOrderAmount: 0, maxDiscountAmount: 0, active: true };
  }

  generateCode(): void {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    this.form.code = 'ZD-' + Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  editCoupon(c: any): void {
    this.editingCoupon = c;
    this.form = { ...c };
    this.showForm = true;
  }

  saveCoupon(): void {
    const obs = this.editingCoupon
      ? this.adminService.updateCoupon(this.editingCoupon.id, this.form)
      : this.adminService.createCoupon(this.form);
    obs.subscribe(() => { this.showForm = false; this.loadCoupons(); });
  }

  toggleCoupon(c: any): void {
    this.adminService.toggleCoupon(c.id).subscribe(() => { c.active = !c.active; });
  }

  deleteCoupon(c: any): void {
    if (confirm(`Supprimer le coupon "${c.code}" ?`)) {
      this.adminService.deleteCoupon(c.id).subscribe(() => this.loadCoupons());
    }
  }
}
