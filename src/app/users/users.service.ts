import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api.service';
import { UserModel } from '../model/user-model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private apiService: ApiService) {}

  getAllUsers(): Observable<any> {
    return this.apiService.getAll('user/getAllUsers');
  }

  deleteUser(userId: any) {
    return this.apiService.delete(`user/${userId}`);
  }

  updateUser(user: UserModel): Observable<any> {
    return this.apiService.update(`user/updateuser`, user);
  }
}
