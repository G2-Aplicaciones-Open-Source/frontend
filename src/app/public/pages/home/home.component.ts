import { Component, OnInit } from '@angular/core';

import { Experience } from '../../../shared/models/experience.model';
import { ExperienceCardComponent } from '../../components/experience-card/experience-card.component';
import { NgForOf ,NgIf} from '@angular/common';
import { BaseCarouselComponent } from '../../../shared/components/base-carousel/base-carousel.component';
import {HomeService} from "../../../experiences/services/home.service";

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
export class HomeComponent implements OnInit {
  categories = ['CULTURA', 'GASTRONOMIA', 'NATURALEZA', 'DEPORTE'];
  activeCategory = 'CULTURA';
  experiences: Experience[] = [];

  constructor(private experienceService: HomeService) {}
  carouselItemsReady = false;
  ngOnInit(): void {
    this.experienceService.getAllExperiences().subscribe({
      next: (data) => {
        console.log('Experiencias cargadas:', data);
        this.experiences = data;
        this.carouselItemsReady = data.some(e => e.media?.length > 0);
      },
      error: (err) => console.error('Error al cargar experiencias', err)
    });
  }

  setActiveCategory(category: string): void {
    this.activeCategory = category;
  }

  get filteredExperiences(): Experience[] {
    const frontendToBackendCategoryNameMap: { [key: string]: string } = {
      CULTURA: 'CULTURA',
      GASTRONOMIA: 'GASTRONOMIA',
      NATURALEZA: 'NATURALEZA',
      DEPORTE: 'DEPORTE'
    };

    const categoryName = frontendToBackendCategoryNameMap[this.activeCategory];
    return this.experiences.filter(
        (e) => e.category?.name === categoryName
    );
  }

}
