import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { faEdit, faTrash, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModel } from '../model/user-model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faUserCog = faUserCog;
  user: UserModel = new UserModel();
  users: UserModel[] = [];
  dropdownSettings: IDropdownSettings = {};
  constructor(
    private userService: UsersService,
    private modalService: NgbModal
  ) {}

  form = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
    age: new FormControl('', [Validators.required, Validators.max(50)]),
    sex: new FormControl('', [Validators.required, Validators.max(10)]),
    isAdmin: new FormControl(),
    email: new FormControl('', [Validators.required, Validators.max(100)]),
  });
  ngOnInit(): void {
    this.getAllUsers();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'userId',
      textField: 'userFullName',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false,
    };
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  onEditClick(content: any, user: UserModel) {
    const modalRef = this.modalService.open(content, {
      backdropClass: 'light-blue-backdrop',
    });
    this.form.patchValue({
      email: user.email,
      age: user.age,
      sex: user.sex,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
    });
    this.user.id = user.id;
  }

  onTrashClick(user: any) {
    if (confirm('Are you sure to delete ')) {
      this.userService.deleteUser(user.id).subscribe((res) => {
        this.users = this.users.filter((x) => x.id !== user.id);
      });
    }
  }

  assignUser(user: any) {
    this.modalService.dismissAll();
  }

  onUserAssign(assignContent: any) {
    const modalRef = this.modalService.open(assignContent, {
      backdropClass: 'light-blue-backdrop',
      size: 'sm',
    });
  }

  submit() {
    this.user.firstName = this.form.value.firstName;
    this.user.lastName = this.form.value.lastName;
    this.user.sex = this.form.value.sex;
    this.user.email = this.form.value.email;
    this.user.isAdmin = this.form.value.isAdmin;
    this.user.age = this.form.value.age;
    this.user.createdDate = new Date();
    this.userService.updateUser(this.user).subscribe(
      (res: UserModel) => {
        const itemIndex = this.users.findIndex((x) => x.id === this.user.id);
        this.users[itemIndex] = res;
        this.modalService.dismissAll();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onSelect(event: any) {
    console.log(event);
  }

  get f() {
    return this.form.controls;
  }
}
