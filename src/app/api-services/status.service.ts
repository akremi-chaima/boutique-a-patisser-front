import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { StatusInterface } from '../models/status.interface';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  constructor(private apiService: ApiService) {}

  /**
   * Get status list
   */
  getList(): Observable<Array<StatusInterface>> {
    return this.apiService.get<Array<StatusInterface>>('private/status');
  }
}
