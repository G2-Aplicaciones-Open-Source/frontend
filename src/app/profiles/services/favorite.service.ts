import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FavoriteResponse } from '../model/favorite.response';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  private baseUrl = `${environment.serverBasePath}/favorites`;

  constructor(private http: HttpClient) {}

  getFavoritesByUser(userId: number): Observable<FavoriteResponse[]> {
    return this.http.get<FavoriteResponse[]>(`${this.baseUrl}/by-user/${userId}`);
  }

  addFavorite(userId: number, experienceId: number): Observable<any> {
    const body = { userId, experienceId };
    return this.http.post(`${this.baseUrl}`, body);
  }

  removeFavorite(userId: number, experienceId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${userId}/experience/${experienceId}`);
  }
}
