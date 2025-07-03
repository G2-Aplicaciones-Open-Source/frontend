import { Component } from '@angular/core';

interface CarouselItem {
  imageUrl: string;
  title: string;
}

@Component({
  selector: 'app-base-carousel',
  templateUrl: './base-carousel.component.html',
  styleUrls: ['./base-carousel.component.scss'],
})
export class BaseCarouselComponent {
  items: CarouselItem[] = [
    {
      imageUrl: 'https://denomades.imgix.net/destinos/puno/350/lago-titicaca.jpg',
      title: '1. Isla de los Uros',
    },
    {
      imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Machu_Picchu%2C_Peru_%282018%29.jpg',
      title: '2. Machu Picchu',
    },
    {
      imageUrl: 'https://www.boletomachupicchu.com/gutblt/wp-content/images/cusco-sacred-valley-incas.jpg',
      title: '3. Valle Sagrado',
    },
    {
      imageUrl: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/7c/b9/ba/photo0jpg.jpg?w=900&h=500&s=1',
      title: '4. Islas Ballestas',
    },
  ];

  currentIndex = 0;

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
  }
}
