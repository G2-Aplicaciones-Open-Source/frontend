// src/app/features/experience-detail/services/availability.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Availability} from '../model/availability.model';
import { CreateAvailabilityRequest } from '../model/create-availability.request';
import {UpdateAvailabilityRequest} from '../model/update-availability.request';
import {TicketTypeRequest} from '../model/ticket-type.request';

@Injectable({
  providedIn: 'root'
})
export class AvailabilityService {
  private basePath = `${environment.serverBasePath}/availabilities`;

  constructor(private http: HttpClient) {}

  getAllAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.basePath}`);
  }

  getAvailabilityById(id: number): Observable<Availability> {
    return this.http.get<Availability>(`${this.basePath}/${id}`);
  }

  createAvailability(experienceId: number, data: CreateAvailabilityRequest): Observable<Availability> {
    return this.http.post<Availability>(`${environment.serverBasePath}/experiences/${experienceId}/availabilities`, data);
  }

  updateAvailability(availabilityId: number, data: UpdateAvailabilityRequest): Observable<Availability> {
    return this.http.put<Availability>(`${this.basePath}/${availabilityId}`, data);
  }

  deleteAvailability(availabilityId: number): Observable<void> {
    return this.http.delete<void>(`${this.basePath}/${availabilityId}`);
  }

  createTicketType(availabilityId: number, data: TicketTypeRequest): Observable<any> {
    return this.http.post(`${this.basePath}/${availabilityId}/ticket-types`, data);
  }

  getByExperienceId(experienceId: number): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.basePath}/experience/${experienceId}`);
  }
}
