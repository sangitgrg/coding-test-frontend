import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ReviewModal } from '../model/review-model';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor(private apiService: ApiService) {}

  getAllReviewsForAdmin() {
    return this.apiService.getAll('review/getAllReviews');
  }

  getReviewsAssignedToMe() {
    return this.apiService.getAll(
      `review/getReviewsAssignedToMe/${localStorage.getItem('userId')}`
    );
  }

  createreview(review: ReviewModal) {
    return this.apiService.create(`review/createreview`, review);
  }

  updateReview(reviewId: string, reviewModel: ReviewModal) {
    return this.apiService.update(`review/${reviewId}`, reviewModel);
  }
}
