import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { faEdit, faTrash, faUsersCog } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeAssignedModel } from '../model/employee-assigned-model';
import { ReviewModal } from '../model/review-model';
import { ReviewService } from '../review/review.service';
import { UsersAssignedService } from './users-assigned.service';

@Component({
  selector: 'app-users-assigned',
  templateUrl: './users-assigned.component.html',
  styleUrls: ['./users-assigned.component.css'],
})
export class UsersAssignedComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faUsersCog = faUsersCog;
  employeeAssigned: EmployeeAssignedModel[] = [];
  reviewModal: ReviewModal = new ReviewModal();

  form = new FormGroup({
    rate: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(1),
    ]),
    feedBack: new FormControl(),
  });

  constructor(
    private userAssignedService: UsersAssignedService,
    private modalService: NgbModal,
    private reviewService: ReviewService,
    private jwtHelper: JwtHelperService
  ) {}

  ngOnInit(): void {
    this.getUsersAssignedToMe();
  }

  getUsersAssignedToMe() {
    const decodedToken = <any>localStorage.getItem('jwt');
    if (decodedToken) {
      const userId = this.jwtHelper.decodeToken(decodedToken).ID;
      const role = this.jwtHelper.decodeToken(decodedToken).Role;
      role === 'Admin'
        ? this.getAllUsersAssignedForAdmin()
        : this.getUsersAssignedForEmployee(userId);
    }
  }

  getUsersAssignedForEmployee(userId: any) {
    this.userAssignedService
      .getUsersAssignedToMe(userId)
      .subscribe((res) => (this.employeeAssigned = res));
  }

  getAllUsersAssignedForAdmin() {
    this.userAssignedService
      .getAllUsersAssigned()
      .subscribe((res) => (this.employeeAssigned = res));
  }

  onCreateReview(content: any, employee: EmployeeAssignedModel) {
    this.modalService.open(content, {
      backdropClass: 'light-blue-backdrop',
    });
    this.reviewModal.gotReviewedId = employee.gotReviewedId;
    this.reviewModal.reviewerId = employee.reviewerId;
  }

  submit() {
    this.reviewModal.id = '00000000-0000-0000-0000-000000000000';
    this.reviewModal.point = this.form.value.rate;
    this.reviewModal.feedBack = this.form.value.feedBack;
    this.reviewService.createreview(this.reviewModal).subscribe((res) => {
      this.modalService.dismissAll();
    });
  }

  get f() {
    return this.form.controls;
  }
}
