import {Component, inject, OnInit} from '@angular/core';
import {FavoriteService} from '../../services/favorite.service';
import {Experience, ExperienceService} from '../../../experience-detail/services/experience.service';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule
  ],
  templateUrl: './favorites.html',
  styleUrl: './favorites.scss'
})
export class Favorites implements OnInit {
  private favoriteService = inject(FavoriteService);
  private experienceService = inject(ExperienceService);
  favorites: Experience[] = [];
  userId: number = 0;

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');
    this.userId = storedUserId ? Number(storedUserId) : 0;

    if (!this.userId) {
      console.error('Usuario no autenticado');
      return;
    }

    this.loadFavorites();
  }


  loadFavorites() {
    this.favorites = [];

    this.favoriteService.getFavoritesByUser(this.userId).subscribe(favs => {
      const experienceCalls = favs.map(fav =>
        this.experienceService.getExperienceById(fav.experienceId)
      );
      forkJoin(experienceCalls).subscribe(experiences => {
        this.favorites = experiences;
      });
    });
  }

  removeFavorite(experienceId: number) {
    this.favoriteService.removeFavorite(this.userId, experienceId).subscribe(() => {
      this.favorites = this.favorites.filter(e => e.id !== experienceId);
    });
  }
}
