// src/app/features/experience-detail/pages/experience-detail/experience-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ExperienceService, Experience } from '../../services/experience.service';
import { ActivatedRoute } from '@angular/router';
import {AvailabilityCheckerComponent} from '../../components/availability-checker/availability-checker.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-experience-detail',
  standalone: true,
  imports: [CommonModule, AvailabilityCheckerComponent],
  templateUrl: './experience-detail.html',
  styleUrls: ['./experience-detail.scss']
})
export class ExperienceDetailComponent implements OnInit {
  experienceId!: number;
  experience!: Experience;
  isLoading = true;
  showAvailability = false;

  constructor(
    private route: ActivatedRoute,
    private experienceService: ExperienceService
  ) {}

  ngOnInit(): void {
    this.experienceId = Number(this.route.snapshot.paramMap.get('id'));
    this.experienceService.getExperienceById(this.experienceId).subscribe({
      next: (data) => {
        this.experience = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  toggleAvailability(): void {
    this.showAvailability = !this.showAvailability;
  }
}
