import { Component, Input } from '@angular/core';
import { Experience } from '../../../shared/models/experience.model';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { FavoriteService} from '../../../profiles/services/favorite.service';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  standalone: true,
  imports: [NgIf, TranslatePipe]
})
export class ExperienceCardComponent {
  @Input() experience!: Experience;
  isFavorite = false;

  userId = Number(localStorage.getItem('userId'));
  constructor(
    private router: Router,
    private favoriteService: FavoriteService
  ) {}

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.favoriteService.addFavorite(this.userId, this.experience.id).subscribe({
        next: () => {
          console.log('Agregado a favoritos');
        },
        error: err => {
          console.error('Error al agregar favorito', err);
          this.isFavorite = false; // revertir en caso de error
        }
      });
    } else {
      this.favoriteService.removeFavorite(this.userId, this.experience.id).subscribe({
        next: () => {
          console.log('Eliminado de favoritos');
        },
        error: err => {
          console.error('Error al eliminar favorito', err);
          this.isFavorite = true; // revertir en caso de error
        }
      });
    }
  }

  goToDetails() {
    this.router.navigate(['/experience-detail', this.experience.id]);
  }
}
