import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

export interface Review {
  reviewId: number;
  userId: number;
  experienceId: number;
  rating: number;
  comment: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ReviewService {
  private basePath = `${environment.serverBasePath}/reviews`;

  constructor(private http: HttpClient) {}

  getByExperienceId(experienceId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.basePath}/by-experience/${experienceId}`);
  }

  getByUserId(userId: number): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.basePath}/by-user/${userId}`);
  }

  createReview(body: Omit<Review, 'reviewId' | 'createdAt'>): Observable<Review> {
    return this.http.post<Review>(this.basePath, body);
  }

  updateReview(reviewId: number, body: Partial<Omit<Review, 'reviewId'>>): Observable<Review> {
    return this.http.put<Review>(`${this.basePath}/${reviewId}`, body);
  }
}
