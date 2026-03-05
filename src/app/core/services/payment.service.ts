import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Payment, ProcessPaymentRequest } from '../models/payment.model';
import { Page } from '../models/loyalty.model';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = environment.apiUrl + '/payments';
  private adminUrl = environment.apiUrl + '/admin/payments';

  constructor(private http: HttpClient) {}

  processPayment(request: ProcessPaymentRequest): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(`${this.apiUrl}/process`, request);
  }

  getByReservation(reservationId: number): Observable<ApiResponse<Payment>> {
    return this.http.get<ApiResponse<Payment>>(`${this.apiUrl}/reservation/${reservationId}`);
  }

  getAll(page = 0, size = 15, status?: string): Observable<ApiResponse<Page<Payment>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<Page<Payment>>>(this.adminUrl, { params });
  }

  getStats(): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(`${this.adminUrl}/stats`);
  }

  refund(paymentId: number): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(`${this.adminUrl}/${paymentId}/refund`, null);
  }
}
