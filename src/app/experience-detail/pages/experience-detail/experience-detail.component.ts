// src/app/features/experience-detail/pages/experience-detail/experience-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ExperienceService, Experience } from '../../services/experience.service';
import { ActivatedRoute } from '@angular/router';
import {AvailabilityCheckerComponent} from '../../components/availability-checker/availability-checker.component';
import {CommonModule} from '@angular/common';
import {ReviewListComponent} from '../../components/review-list/review-list.component';
import {FavoriteService} from '../../services/favorite.service';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';

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

  isFavorite = false;
  userId: number = JSON.parse(localStorage.getItem('user') || '{}').profileId || 1; // Default to 1 if not found

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService,
    private favoriteService: FavoriteService
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

    this.favoriteService.getByUser(this.userId).subscribe(favs => {
      this.isFavorite = favs.some(f => f.experienceId === this.experienceId);
    });
  }

  toggleAvailability(): void {
    this.showAvailability = !this.showAvailability;
  }

  toggleFavorite(): void {
    if (this.isFavorite) {
      this.favoriteService.remove(this.userId, this.experienceId).subscribe(() => {
        this.isFavorite = false;
      });
    } else {
      this.favoriteService.add({ userId: this.userId, experienceId: this.experienceId }).subscribe(() => {
        this.isFavorite = true;
      });
    }
  }

}
