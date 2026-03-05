import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Coupon, DashboardStats, Page, Route } from '../models/loyalty.model';
import { Reservation } from '../models/reservation.model';
import { CreateVehicleRequest, Vehicle } from '../models/vehicle.model';
import { Excursion } from '../models/excursion.model';
import { Review } from '../models/review.model';
import { Payment } from '../models/payment.model';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private apiUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<ApiResponse<DashboardStats>> {
    return this.http.get<ApiResponse<DashboardStats>>(`${this.apiUrl}/dashboard`);
  }

  // Reservations
  getAllReservations(page = 0, size = 20, status?: string, type?: string): Observable<ApiResponse<Page<Reservation>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    if (type) params = params.set('type', type);
    return this.http.get<ApiResponse<Page<Reservation>>>(`${this.apiUrl}/reservations`, { params });
  }

  updateReservationStatus(id: number, status: string, notes?: string): Observable<ApiResponse<Reservation>> {
    let params = new HttpParams().set('status', status);
    if (notes) params = params.set('notes', notes);
    return this.http.put<ApiResponse<Reservation>>(`${this.apiUrl}/reservations/${id}/status`, null, { params });
  }

  assignVehicle(reservationId: number, vehicleId: number): Observable<ApiResponse<Reservation>> {
    const params = new HttpParams().set('vehicleId', vehicleId);
    return this.http.put<ApiResponse<Reservation>>(`${this.apiUrl}/reservations/${reservationId}/assign-vehicle`, null, { params });
  }

  // Vehicles
  getAllVehicles(page = 0, size = 20): Observable<ApiResponse<Page<Vehicle>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Vehicle>>>(`${this.apiUrl}/vehicles`, { params });
  }

  createVehicle(request: CreateVehicleRequest): Observable<ApiResponse<Vehicle>> {
    return this.http.post<ApiResponse<Vehicle>>(`${this.apiUrl}/vehicles`, request);
  }

  updateVehicle(id: number, request: CreateVehicleRequest): Observable<ApiResponse<Vehicle>> {
    return this.http.put<ApiResponse<Vehicle>>(`${this.apiUrl}/vehicles/${id}`, request);
  }

  deleteVehicle(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/vehicles/${id}`);
  }

  // Excursions
  getAllExcursions(page = 0, size = 20): Observable<ApiResponse<Page<Excursion>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Excursion>>>(`${this.apiUrl}/excursions`, { params });
  }

  createExcursion(request: Partial<Excursion>): Observable<ApiResponse<Excursion>> {
    return this.http.post<ApiResponse<Excursion>>(`${this.apiUrl}/excursions`, request);
  }

  updateExcursion(id: number, request: Partial<Excursion>): Observable<ApiResponse<Excursion>> {
    return this.http.put<ApiResponse<Excursion>>(`${this.apiUrl}/excursions/${id}`, request);
  }

  deleteExcursion(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/excursions/${id}`);
  }

  // Users
  getAllUsers(page = 0, size = 20, role?: string, search?: string): Observable<ApiResponse<Page<User>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (role) params = params.set('role', role);
    if (search) params = params.set('search', search);
    return this.http.get<ApiResponse<Page<User>>>(`${this.apiUrl}/users`, { params });
  }

  updateUserRole(userId: number, role: string): Observable<ApiResponse<User>> {
    const params = new HttpParams().set('role', role);
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/${userId}/role`, null, { params });
  }

  toggleUserStatus(userId: number): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/${userId}/toggle-status`, null);
  }

  toggleUserActive(userId: number): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/${userId}/toggle-active`, null);
  }

  deleteUser(userId: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/users/${userId}`);
  }

  // Reviews
  getAllReviews(page = 0, size = 20, status?: string): Observable<ApiResponse<Page<Review>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<Page<Review>>>(`${this.apiUrl}/reviews`, { params });
  }

  moderateReview(id: number, status: string, response?: string): Observable<ApiResponse<Review>> {
    let params = new HttpParams().set('status', status);
    if (response) params = params.set('response', response);
    return this.http.put<ApiResponse<Review>>(`${this.apiUrl}/reviews/${id}/moderate`, null, { params });
  }

  // Payments
  getAllPayments(page = 0, size = 20, status?: string): Observable<ApiResponse<Page<Payment>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<Page<Payment>>>(`${this.apiUrl}/payments`, { params });
  }

  refundPayment(paymentId: number): Observable<ApiResponse<Payment>> {
    return this.http.post<ApiResponse<Payment>>(`${this.apiUrl}/payments/${paymentId}/refund`, null);
  }

  // Coupons
  getAllCoupons(page = 0, size = 20): Observable<ApiResponse<Page<Coupon>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Coupon>>>(`${this.apiUrl}/coupons`, { params });
  }

  createCoupon(coupon: Partial<Coupon>): Observable<ApiResponse<Coupon>> {
    return this.http.post<ApiResponse<Coupon>>(`${this.apiUrl}/coupons`, coupon);
  }

  updateCoupon(id: number, coupon: Partial<Coupon>): Observable<ApiResponse<Coupon>> {
    return this.http.put<ApiResponse<Coupon>>(`${this.apiUrl}/coupons/${id}`, coupon);
  }

  toggleCoupon(id: number): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/coupons/${id}/toggle`, null);
  }

  deleteCoupon(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/coupons/${id}`);
  }

  deactivateCoupon(id: number): Observable<ApiResponse<void>> {
    return this.http.put<ApiResponse<void>>(`${this.apiUrl}/coupons/${id}/deactivate`, null);
  }

  // Routes
  getAllRoutes(page = 0, size = 20): Observable<ApiResponse<Page<Route>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Route>>>(`${this.apiUrl}/routes`, { params });
  }

  createRoute(route: Partial<Route>): Observable<ApiResponse<Route>> {
    return this.http.post<ApiResponse<Route>>(`${this.apiUrl}/routes`, route);
  }

  updateRoute(id: number, route: Partial<Route>): Observable<ApiResponse<Route>> {
    return this.http.put<ApiResponse<Route>>(`${this.apiUrl}/routes/${id}`, route);
  }

  deleteRoute(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/routes/${id}`);
  }

  // Notifications
  sendNotification(notification: { userId: number; type: string; subject: string; content: string; channel: string }): Observable<ApiResponse<void>> {
    return this.http.post<ApiResponse<void>>(`${this.apiUrl}/notifications/send`, notification);
  }
}
