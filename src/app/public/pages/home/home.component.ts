import { Component } from '@angular/core';
import { Experience } from '../../../shared/models/experience.model';
import {ExperienceCardComponent} from '../../components/experience-card/experience-card.component';
import {NgForOf} from '@angular/common';
import {BaseCarouselComponent} from '../../../shared/components/base-carousel/base-carousel.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ExperienceCardComponent,
    NgForOf,
    BaseCarouselComponent
  ]
})
export class HomeComponent {
  // Simulación de categorías (tabs)
  categories = ['Cultura', 'Gastronomía', 'Naturaleza', 'Deporte'];
  activeCategory = 'Cultura';
  experiences: Experience[] = [
    {
      id: 1,
      agency_id: 1,
      category_id: 1,
      destination_id: 1,
      experience_name: 'Fiesta de la Candelaria',
      description: 'Vive una de las festividades más coloridas.',
      duration: '2 días',
      meeting_point: 'Plaza principal',
      created_at: '',
      updated_at: '',
      media: [
        {
          id: 1,
          experience_id: 1,
            media_url: 'https://www.peruhop.com/wp-content/uploads/Candelaria-3-790x453.jpg',
          caption: 'Fiesta de la Candelaria',
          uploaded_at: '',
        },
      ],
    },
    {
      id: 2,
      agency_id: 2,
      category_id: 1,
      destination_id: 2,
      experience_name: 'Festejo del Cóndor',
      description: 'Disfruta del vuelo del cóndor en su hábitat natural.',
      duration: '1 día',
      meeting_point: 'Mirador de cóndores',
      created_at: '',
      updated_at: '',
      media: [
        {
          id: 2,
          experience_id: 2,
          media_url: 'https://static.nationalgeographic.es/files/styles/image_3200/public/vulturgryphusheadlinnaeus1758.jpg?w=1900&h=1323',
          caption: 'Festejo del Cóndor',
          uploaded_at: '',
        },
      ],
    },
  ];
  // Cambiar categoría activa
  setActiveCategory(category: string) {
    this.activeCategory = category;
  }
}
