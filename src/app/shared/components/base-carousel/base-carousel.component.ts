import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { Experience } from '../../../shared/models/experience.model';
interface CarouselItem {
  imageUrl: string;
  title: string;
}


@Component({
  selector: 'app-base-carousel',
  templateUrl: './base-carousel.component.html',
  styleUrls: ['./base-carousel.component.scss'],
})
export class BaseCarouselComponent implements OnChanges {
  @Input() experiences: Experience[] = [];

  items: CarouselItem[] = [];
  currentIndex = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['experiences'] && this.experiences.length > 0) {
      this.items = this.experiences
        .filter(e => e.media && e.media.length > 0)
        .map(e => ({
          imageUrl: e.media![0].mediaUrl,
          title: e.title,
        }));
    }
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }
}
