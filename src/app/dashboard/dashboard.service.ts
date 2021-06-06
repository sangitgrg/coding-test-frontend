import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { ReviewModal } from '../modal/review-modal';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private apiService: ApiService) {}

  getAllReviewsForAdmin() {
    return this.apiService.getAll('review/getAllReviews');
  }

  getReviewsAssignedToMe() {
    return this.apiService.getAll(
      `review/getReviewsAssignedToMe/${localStorage.getItem('userId')}`
    );
  }

  updateReview(reviewId: string, reviewModel: ReviewModal) {
    return this.apiService.update(`review/${reviewId}`, reviewModel);
  }
}
