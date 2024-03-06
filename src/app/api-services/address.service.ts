import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { UserInterface } from '../models/user.interface';
import { HandleUserInterface } from '../models/handle-user.interface';
import {AddressInterface} from "../models/address.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {}

  /**
   * Get addresses list
   */
  getList(): Observable<Array<AddressInterface>> {
    return this.apiService.get<Array<AddressInterface>>('users');
  }


  /**
   * Get user
   * @param id
   */
  get(id: number): Observable<UserInterface> {
    return this.apiService.get<UserInterface>('user/' + id);
  }

  /**
   * Create user
   * @param user
   */
  create(user: HandleUserInterface): Observable<any> {
    return this.apiService.post<any>('add/user', user);
  }

  /**
   * Update user
   * @param user
   */
  update(user: HandleUserInterface): Observable<any> {
    return this.apiService.put<any>('update/user', user);
  }
}
