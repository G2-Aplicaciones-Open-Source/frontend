import { Component, Input } from '@angular/core';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-base-carousel',
  templateUrl: './base-carousel.component.html',
  styleUrls: ['./base-carousel.component.scss']
})
export class BaseCarouselComponent {
  @Input() experiences: Experience[] = [];
  currentIndex = 0;

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.experiences.length) % this.experiences.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.experiences.length;
  }
}
