import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Excursion } from '../models/excursion.model';

@Injectable({ providedIn: 'root' })
export class ExcursionService {
  private apiUrl = environment.apiUrl + '/public/excursions';
  private adminUrl = environment.apiUrl + '/admin/excursions';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Excursion[]>> {
    return this.http.get<ApiResponse<Excursion[]>>(this.apiUrl);
  }

  getById(id: number): Observable<ApiResponse<Excursion>> {
    return this.http.get<ApiResponse<Excursion>>(`${this.apiUrl}/${id}`);
  }

  create(excursion: Partial<Excursion>): Observable<ApiResponse<Excursion>> {
    return this.http.post<ApiResponse<Excursion>>(this.adminUrl, excursion);
  }

  update(id: number, excursion: Partial<Excursion>): Observable<ApiResponse<Excursion>> {
    return this.http.put<ApiResponse<Excursion>>(`${this.adminUrl}/${id}`, excursion);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.adminUrl}/${id}`);
  }
}
