// src/app/features/experience-detail/services/agency.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Agency {
  id: number;
  name: string;
}

@Injectable({ providedIn: 'root' })
export class AgencyService {
  private basePath = `${environment.serverBasePath}/agencies`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<Agency> {
    return this.http.get<Agency>(`${this.basePath}/${id}`);
  }
}
