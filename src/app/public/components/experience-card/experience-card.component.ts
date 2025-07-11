import { Component, Input } from '@angular/core';
import { Experience } from '../../../shared/models/experience.model';
import {NgIf} from '@angular/common';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  selector: 'app-experience-card',
  templateUrl: './experience-card.component.html',
  styleUrls: ['./experience-card.component.scss'],
  imports: [
    NgIf,
    TranslatePipe
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
