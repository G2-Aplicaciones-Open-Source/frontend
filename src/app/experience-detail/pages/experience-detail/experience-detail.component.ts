// src/app/features/experience-detail/pages/experience-detail/experience-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';

import { ExperienceService, Experience } from '../../services/experience.service';
import { FavoriteService } from '../../../profiles/services/favorite.service';
import { ExperienceMediaService, ExperienceMedia } from '../../services/experience-media.service';
import { ReviewService, Review } from '../../services/review.service';
import { AgencyService } from '../../services/agency.service';
import { DestinationService } from '../../services/destination.service';

import { AvailabilityCheckerComponent } from '../../components/availability-checker/availability-checker.component';
import { ReviewListComponent } from '../../components/review-list/review-list.component';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [
    CommonModule,
    AvailabilityCheckerComponent,
    ReviewListComponent,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule
  ],
  templateUrl: './experience-detail.html',
  styleUrls: ['./experience-detail.scss']
})
export class ExperienceDetailComponent implements OnInit {
  experienceId!: number;
  experience!: Experience;
  isLoading = true;
  isFavorite = false;
  userId: number = JSON.parse(localStorage.getItem('user') || '{}').profileId || 2;

  experienceMedias: ExperienceMedia[] = [];
  backgroundImageUrl: string = '';
  carouselImages: ExperienceMedia[] = [];

  agencyName = '';
  categoryName = '';
  destinationFull = '';
  rating = 0;

  suggestions: Array<{ id: number; title: string; imageUrl: string; rating: number }> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private experienceService: ExperienceService,
    private favoriteService: FavoriteService,
    private experienceMediaService: ExperienceMediaService,
    private reviewService: ReviewService,
    private agencyService: AgencyService,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.experienceId = Number(this.route.snapshot.paramMap.get('id'));

    this.experienceService.getExperienceById(this.experienceId).subscribe({
      next: (data) => {
        this.experience = data;
        this.loadExtras();
        this.loadFavorites();
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  private loadExtras(): void {
    this.experienceMediaService.getMediaByExperienceId(this.experienceId).subscribe(media => {
      this.experienceMedias = media;
      const fondo = media.find(m => m.caption.toLowerCase().includes('fondo'));
      this.backgroundImageUrl = fondo?.mediaUrl || '';
      this.carouselImages = media.filter(m => !m.caption.toLowerCase().includes('fondo'));
    });

    this.reviewService.getByExperienceId(this.experienceId).subscribe(reviews => {
      const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
      this.rating = reviews.length ? sum / reviews.length : 0;
    });

    this.agencyService.getById((this.experience as any).agencyId).subscribe(agency => {
      this.agencyName = agency.name;
    });

    this.categoryName = (this.experience as any).category?.categoryName || 'No definido';

    this.destinationService.getById((this.experience as any).destinationId).subscribe(dest => {
      this.destinationFull = `${dest.name} - ${dest.address}, ${dest.district}, ${dest.state}, ${dest.country}`;
    });

    this.loadSuggestions();
  }

  private loadFavorites(): void {
    this.favoriteService.getFavoritesByUser(this.userId).subscribe(favs => {
      this.isFavorite = favs.some(f => f.experienceId === this.experienceId);
    });
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.userId, this.experienceId).subscribe(() => this.isFavorite = false);
    } else {
      this.favoriteService.addFavorite(this.userId, this.experienceId).subscribe(() => this.isFavorite = true);
    }
  }

  private loadSuggestions(): void {
    const ids = [1, 2, 3].filter(id => id !== this.experienceId);
    ids.forEach(id => {
      this.experienceService.getExperienceById(id).subscribe(exp => {
        this.reviewService.getByExperienceId(id).subscribe(reviews => {
          const avg = reviews.length ? reviews.reduce((a, b) => a + b.rating, 0) / reviews.length : 0;
          this.experienceMediaService.getMediaByExperienceId(id).subscribe(medias => {
            const fondo = medias.find(m => m.caption.toLowerCase().includes('fondo'));
            this.suggestions.push({
              id: exp.id,
              title: exp.title,
              rating: avg,
              imageUrl: fondo?.mediaUrl || ''
            });
          });
        });
      });
    });
  }

  goToExperience(id: number): void {
    this.router.navigate(['/experiences', id]);
  }
}
