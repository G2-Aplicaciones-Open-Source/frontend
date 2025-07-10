import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agency } from '../model/agency.model';

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  private apiUrl = 'http://localhost:8091/api/v1/agencies';

  constructor(private http: HttpClient) { }

  getAgencyById(agencyId: number): Observable<Agency> {
    return this.http.get<Agency>(`${this.apiUrl}/${agencyId}`);
  }

}
