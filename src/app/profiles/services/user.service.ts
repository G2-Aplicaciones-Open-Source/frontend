import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  roles: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath = `${environment.serverBasePath}`;

  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.basePath}/users/${id}`);
  }
}
