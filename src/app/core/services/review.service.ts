import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { CreateReviewRequest, Review } from '../models/review.model';
import { Page } from '../models/loyalty.model';

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPublicReviews(): Observable<ApiResponse<Review[]>> {
    return this.http.get<ApiResponse<Review[]>>(`${this.apiUrl}/public/reviews`);
  }

  create(request: CreateReviewRequest): Observable<ApiResponse<Review>> {
    return this.http.post<ApiResponse<Review>>(`${this.apiUrl}/reviews`, request);
  }

  getMyReviews(page = 0, size = 10): Observable<ApiResponse<Page<Review>>> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<Page<Review>>>(`${this.apiUrl}/reviews/my`, { params });
  }

  getAll(page = 0, size = 10, status?: string): Observable<ApiResponse<Page<Review>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (status) params = params.set('status', status);
    return this.http.get<ApiResponse<Page<Review>>>(`${this.apiUrl}/admin/reviews`, { params });
  }

  updateStatus(id: number, status: string): Observable<ApiResponse<Review>> {
    const params = new HttpParams().set('status', status);
    return this.http.put<ApiResponse<Review>>(`${this.apiUrl}/admin/reviews/${id}/moderate`, null, { params });
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/admin/reviews/${id}`);
  }
}
