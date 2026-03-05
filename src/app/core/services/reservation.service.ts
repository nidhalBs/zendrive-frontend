import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { CreateReservationRequest, Reservation } from '../models/reservation.model';
import { Page } from '../models/loyalty.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = environment.apiUrl + '/reservations';

  constructor(private http: HttpClient) {}

  create(request: CreateReservationRequest): Observable<ApiResponse<Reservation>> {
    return this.http.post<ApiResponse<Reservation>>(this.apiUrl, request);
  }

  getMyReservations(page = 0, size = 10): Observable<ApiResponse<Page<Reservation>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Reservation>>>(`${this.apiUrl}/my`, { params });
  }

  getById(id: number): Observable<ApiResponse<Reservation>> {
    return this.http.get<ApiResponse<Reservation>>(`${this.apiUrl}/${id}`);
  }

  getByReference(reference: string): Observable<ApiResponse<Reservation>> {
    return this.http.get<ApiResponse<Reservation>>(`${this.apiUrl}/reference/${reference}`);
  }

  cancel(id: number, reason: string): Observable<ApiResponse<Reservation>> {
    const params = new HttpParams().set('reason', reason);
    return this.http.put<ApiResponse<Reservation>>(`${this.apiUrl}/${id}/cancel`, null, { params });
  }
}
