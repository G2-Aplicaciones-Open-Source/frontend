// src/app/features/experience-detail/pages/experience-detail/experience-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ExperienceService, Experience } from '../../services/experience.service';
import { ActivatedRoute } from '@angular/router';
import {AvailabilityCheckerComponent} from '../../components/availability-checker/availability-checker.component';
import {CommonModule} from '@angular/common';
import {ReviewListComponent} from '../../components/review-list/review-list.component';
import {FavoriteService} from '../../../profiles/services/favorite.service';
import { ExperienceMediaService } from '../../services/experience-media.service'
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {ExperienceMedia} from '../../model/experience-media.model';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [CommonModule, AvailabilityCheckerComponent, ReviewListComponent, MatIcon, MatIconButton],
  templateUrl: './experience-detail.html',
  styleUrls: ['./experience-detail.scss']
})
export class ExperienceDetailComponent implements OnInit {
  experienceId!: number;
  experience!: Experience;
  isLoading = true;
  showAvailability = false;

  experienceMedias: ExperienceMedia[] = [];
  isFavorite = false;
  userId: number = JSON.parse(localStorage.getItem('user') || '{}').profileId || 1; // Default to 1 if not found

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private favoriteService: FavoriteService,
    private experienceMediaService: ExperienceMediaService
  ) {}

  ngOnInit(): void {
    this.experienceId = Number(this.route.snapshot.paramMap.get('id'));
    this.experienceService.getExperienceById(this.experienceId).subscribe({
      next: (data) => {
        this.experience = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
    this.loadMedia();
    this.favoriteService.getFavoritesByUser(this.userId).subscribe(favs => {
      this.isFavorite = favs.some(f => f.experienceId === this.experienceId);
    });
  }

  toggleAvailability(): void {
    this.showAvailability = !this.showAvailability;
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteService.removeFavorite(this.userId, this.experienceId).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.favoriteService.addFavorite(this.userId, this.experienceId).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }


  loadMedia(): void {
    this.experienceMediaService.getByExperienceId(this.experienceId).subscribe({
      next: (medias) => {
        this.experienceMedias = medias;
      },
      error: () => {
        console.warn('No se pudieron cargar las imágenes de la experiencia');
      }
    });
  }
}
