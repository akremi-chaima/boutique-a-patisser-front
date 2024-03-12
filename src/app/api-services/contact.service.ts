import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { ContactInterface } from '../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  /**
   * Send message
   */
  send(contact: ContactInterface): Observable<any> {
    return this.apiService.post<any>('contact', contact);
  }
}
