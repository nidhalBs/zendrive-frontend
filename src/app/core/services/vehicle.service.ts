import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse } from '../models/user.model';
import { Vehicle, CreateVehicleRequest } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiUrl = environment.apiUrl + '/public/vehicles';
  private adminUrl = environment.apiUrl + '/admin/vehicles';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ApiResponse<Vehicle[]>> {
    return this.http.get<ApiResponse<Vehicle[]>>(this.apiUrl);
  }

  getAvailable(passengers: number, date: string): Observable<ApiResponse<Vehicle[]>> {
    const params = new HttpParams()
      .set('passengers', passengers)
      .set('date', date);
    return this.http.get<ApiResponse<Vehicle[]>>(`${this.apiUrl}/available`, { params });
  }

  create(request: CreateVehicleRequest): Observable<ApiResponse<Vehicle>> {
    return this.http.post<ApiResponse<Vehicle>>(this.adminUrl, request);
  }

  update(id: number, request: CreateVehicleRequest): Observable<ApiResponse<Vehicle>> {
    return this.http.put<ApiResponse<Vehicle>>(`${this.adminUrl}/${id}`, request);
  }

  delete(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.adminUrl}/${id}`);
  }
}
