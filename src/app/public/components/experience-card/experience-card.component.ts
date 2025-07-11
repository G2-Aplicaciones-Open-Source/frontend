import { Component, Input } from '@angular/core';
import { Experience } from '../../../shared/models/experience.model';
import { NgIf } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Aquí luego podrás emitir un evento o llamar a un servicio para persistir favoritos.
  }

  goToDetails() {
    this.router.navigate(['/experience-detail', this.experience.id]);
  }
}
