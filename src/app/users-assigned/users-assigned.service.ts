import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { EmployeeAssignedModel } from '../model/employee-assigned-model';

@Injectable({
  providedIn: 'root',
})
export class UsersAssignedService {
  constructor(private apiService: ApiService) {}

  getUsersAssignedToMe(userId: any): Observable<any> {
    return this.apiService.getAll(`user/getEmployeeAssignedToMe/${userId}`);
  }

  getAllUsersAssigned(): Observable<any> {
    return this.apiService.getAll(`user/getAllAssignedEmployee`);
  }
}
