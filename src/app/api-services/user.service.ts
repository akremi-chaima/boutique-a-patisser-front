import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserInterface } from '../models/user.interface';
import { CreateUserInterface } from '../models/create-user.interface';
import { UpdatePasswordInterface } from '../models/update-password.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  /**
   * Get user
   */
  get(): Observable<UserInterface> {
    return this.apiService.get<UserInterface>('private/user');
  }

  /**
   * Create user
   * @param user
   */
  create(user: CreateUserInterface): Observable<any> {
    return this.apiService.post<any>('add/user', user);
  }

  /**
   * Update user
   * @param user
   */
  update(user: UserInterface): Observable<any> {
    return this.apiService.put<any>('private/update/user', user);
  }

  /**
   * Update password
   * @param data
   */
  updatePassword(data: UpdatePasswordInterface): Observable<any> {
    return this.apiService.put<any>('private/update/password', data);
  }
}
