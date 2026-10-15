import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoyaltyService } from '../../../core/services/loyalty.service';
import { LoyaltyAccount, LoyaltyTransaction } from '../../../core/models/loyalty.model';

@Component({
  selector: 'app-client-loyalty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.scss']
})
export class ClientLoyaltyComponent implements OnInit {
  account: LoyaltyAccount | null = null;
  transactions: LoyaltyTransaction[] = [];
  couponCode = '';
  couponMessage = '';
  couponValid = false;

  constructor(private loyaltyService: LoyaltyService) {}

  ngOnInit(): void {
    this.loyaltyService.getAccount().subscribe(res => { if (res.success) this.account = res.data; });
    this.loyaltyService.getTransactions().subscribe(res => { if (res.success) this.transactions = res.data.content; });
  }

  validateCoupon(): void {
    if (!this.couponCode) return;
    this.loyaltyService.validateCoupon(this.couponCode).subscribe({
      next: res => { this.couponValid = true; this.couponMessage = `Code valide ! Réduction de ${res.data.discountPercentage}%`; },
      error: () => { this.couponValid = false; this.couponMessage = 'Code invalide ou expiré.'; }
    });
  }
}
