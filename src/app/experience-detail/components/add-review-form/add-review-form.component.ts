import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-review-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './add-review-form.component.html',
  styleUrls: ['./add-review-form.component.scss']
})
export class AddReviewFormComponent {
  @Input() experienceId!: number;
  @Input() userId!: number;
  @Output() reviewSubmitted = new EventEmitter<void>();

  comment: string = '';
  rating: number = 5;

  @Input() submitReview!: (review: { comment: string; rating: number }) => void;

  handleSubmit() {
    if (this.comment.trim() && this.rating > 0) {
      this.submitReview({ comment: this.comment, rating: this.rating });
      this.reviewSubmitted.emit();
      this.comment = '';
      this.rating = 5;
    }
  }
}
