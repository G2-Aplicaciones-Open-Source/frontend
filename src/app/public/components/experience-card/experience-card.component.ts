import { Component, Input } from '@angular/core';
import { Experience } from '../../../shared/models/experience.model';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  imports: [
    NgIf
  ]
})
export class ExperienceCardComponent {
  @Input() experience!: Experience;
  isFavorite = false;

  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    // Aquí luego podrás emitir un evento o llamar a un servicio para persistir favoritos.
  }
}
