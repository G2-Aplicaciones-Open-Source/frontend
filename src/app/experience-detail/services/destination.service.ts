// src/app/features/experience-detail/services/destination.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Destination {
  id: number;
  name: string;
  address: string;
  district: string;
  city: string;
  state: string;
  country: string;
}

@Injectable({ providedIn: 'root' })
export class DestinationService {
  private basePath = `${environment.serverBasePath}/destinations`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Destination> {
    return this.http.get<Destination>(`${this.basePath}/${id}`);
  }
}
