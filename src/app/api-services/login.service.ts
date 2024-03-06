import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LoginInterface } from '../models/login.interface';
import { LoginResponseInterface } from '../models/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private apiService: ApiService) {}

  /**
   * Get user token
   * @param data
   */
  login(data: LoginInterface): Observable<LoginResponseInterface> {
    return this.apiService.post<LoginResponseInterface>('login', data);
  }
}
