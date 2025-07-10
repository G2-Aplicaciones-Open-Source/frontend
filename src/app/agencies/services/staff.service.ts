import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../model/staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private baseUrl = 'http://localhost:8091/api/v1';

  constructor(private http: HttpClient) { }

  getStaffByAgencyId(agencyId: number): Observable<Staff[]> {
    return this.http.get<Staff[]>(`${this.baseUrl}/agencies/${agencyId}/staff`);
  }

  getStaffById(id: number): Observable<Staff> {
    return this.http.get<Staff>(`${this.baseUrl}/staff/${id}`);
  }

  addStaff(staff: Omit<Staff, 'id'>): Observable<Staff> {
    return this.http.post<Staff>(`${this.baseUrl}/staff`, staff);
  }

  updateStaff(id: number, staff: Staff): Observable<Staff> {
    return this.http.put<Staff>(`${this.baseUrl}/staff/${id}`, staff);
  }

  deleteStaff(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/staff/${id}`);
  }
}
