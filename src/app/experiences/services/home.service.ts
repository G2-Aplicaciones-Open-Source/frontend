import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExperienceMedia, Experience } from '../../shared/models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private baseUrl = 'http://localhost:8091/api/v1'; // Puedes cambiar a environment.apiUrl si lo prefieres

  constructor(private http: HttpClient) {}

  getAllExperiences(): Observable<ExperienceWithMedia[]> {
    return this.http.get<Experience[]>(`${this.baseUrl}/experiences`).pipe(
      switchMap((experiences) =>
        forkJoin(
          experiences.map((exp) =>
            this.getMediaByExperienceId(exp.id).pipe(
              map((media) => ({ ...exp, media }))
            )
          )
        )
      )
    );
  }

  getMediaByExperienceId(experienceId: number): Observable<ExperienceMedia[]> {
    return this.http.get<ExperienceMedia[]>(
      `${this.baseUrl}/experience-media/experience/${experienceId}`
    );
  }
}

export interface ExperienceWithMedia extends Experience {
  media: ExperienceMedia[];
}
