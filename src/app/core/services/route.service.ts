import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Route } from '../models/loyalty.model';

@Injectable({ providedIn: 'root' })
export class RouteService {
  private apiUrl = environment.apiUrl + '/public/routes';
  private adminUrl = environment.apiUrl + '/admin/routes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Route[]>> {
    return this.http.get<ApiResponse<Route[]>>(this.apiUrl);
  }

  getPopular(): Observable<ApiResponse<Route[]>> {
    return this.http.get<ApiResponse<Route[]>>(`${this.apiUrl}/popular`);
  }

  create(route: Partial<Route>): Observable<ApiResponse<Route>> {
    return this.http.post<ApiResponse<Route>>(this.adminUrl, route);
  }

  update(id: number, route: Partial<Route>): Observable<ApiResponse<Route>> {
    return this.http.put<ApiResponse<Route>>(`${this.adminUrl}/${id}`, route);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.adminUrl}/${id}`);
  }
}
