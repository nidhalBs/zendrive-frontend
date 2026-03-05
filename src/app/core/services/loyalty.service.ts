import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Coupon, LoyaltyAccount, LoyaltyTransaction, Page } from '../models/loyalty.model';

@Injectable({ providedIn: 'root' })
export class LoyaltyService {
  private apiUrl = environment.apiUrl + '/loyalty';

  constructor(private http: HttpClient) {}

  getAccount(): Observable<ApiResponse<LoyaltyAccount>> {
    return this.http.get<ApiResponse<LoyaltyAccount>>(`${this.apiUrl}/account`);
  }

  getTransactions(page = 0, size = 10): Observable<ApiResponse<Page<LoyaltyTransaction>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<LoyaltyTransaction>>>(`${this.apiUrl}/transactions`, { params });
  }

  validateCoupon(code: string): Observable<ApiResponse<Coupon>> {
    return this.http.get<ApiResponse<Coupon>>(`${this.apiUrl}/coupons/validate/${code}`);
  }
}
