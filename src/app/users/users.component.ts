import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { faEdit, faTrash, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  faEdit = faEdit;
  faTrash = faTrash;
  faUserCog = faUserCog;
  users: any = [];

  constructor(
    private userService: UsersService,
    private modalService: NgbModal
  ) {}

  userlist = [
    {
      fullName: 'Test',
      id: '11',
    },
    {
      fullName: 'Test2',
      id: '22',
    },
  ];

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((res) => {
      this.users = res;
    });
  }

  onEditClick() {}

  onTrashClick() {
    if (confirm('Are you sure to delete ')) {
      console.log('Implement delete functionality here');
    }
  }

  assignUser(user: any) {
    this.modalService.dismissAll();
  }

  onUserAssign(assignContent: any) {
    const modalRef = this.modalService.open(assignContent, {
      backdropClass: 'light-blue-backdrop',
      size: 'sm',
      centered: true,
      scrollable: true,
    });
  }

  get f() {
    return this.form.controls;
  }
}
