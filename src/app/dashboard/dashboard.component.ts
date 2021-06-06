import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { DashboardService } from './dashboard.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewModal } from '../modal/review-modal';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  active = 1;
  decodedToken = '';
  reviewModal: ReviewModal = new ReviewModal();
  listOfReview: any = [];
  form = new FormGroup({
    rate: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
    ]),
    feedBack: new FormControl(),
  });
  constructor(
    private dashboardService: DashboardService,
    private jwtHelper: JwtHelperService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    const role = this.jwtHelper.decodeToken(
      <string>localStorage.getItem('jwt')
    ).Role;
    role === 'Admin'
      ? this.getAllEmployeeListToReview()
      : this.getMyListToReview();
  }

  onEditClick(content: any, review: ReviewModal) {
    const modalRef = this.modalService.open(content, {
      backdropClass: 'light-blue-backdrop',
    });
    this.form.patchValue({
      rate: review.point,
      feedBack: review.feedBack,
    });
    this.reviewModal.id = review.id;
    this.reviewModal.feedBack = review.feedBack;
    this.reviewModal.point = review.point;
    this.reviewModal.reviewerId = review.reviewerId;
    this.reviewModal.gotReviewedName = review.gotReviewedName;
    this.reviewModal.gotReviewedId = review.gotReviewedId;
  }

  getMyListToReview() {
    this.dashboardService
      .getReviewsAssignedToMe()
      .subscribe((res) => (this.listOfReview = res));
  }

  getAllEmployeeListToReview() {
    this.dashboardService
      .getAllReviewsForAdmin()
      .subscribe((res) => (this.listOfReview = res));
  }

  submit() {
    this.reviewModal.point = this.form.value.rate;
    this.reviewModal.feedBack = this.form.value.feedBack;
    this.dashboardService
      .updateReview(this.reviewModal.id, this.reviewModal)
      .subscribe((res) => {
        this.getAllEmployeeListToReview();
        this.modalService.dismissAll();
      });
  }

  get f() {
    return this.form.controls;
  }
}
