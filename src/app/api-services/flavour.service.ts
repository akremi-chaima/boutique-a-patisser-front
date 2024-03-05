import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { FlavourInterface } from '../models/flavour.interface';

@Injectable({
  providedIn: 'root'
})
export class FlavourService {
  constructor(private apiService: ApiService) {}

  /**
   * Get flavours list
   */
  getList(): Observable<Array<FlavourInterface>> {
    return this.apiService.get<Array<FlavourInterface>>('flavours');
  }

  /**
   * Get flavour
   * @param id
   */
  get(id: number): Observable<FlavourInterface> {
    return this.apiService.get<FlavourInterface>('flavour/' + id);
  }

  /**
   * Create flavour
   * @param flavour
   */
  create(flavour: FlavourInterface): Observable<any> {
    return this.apiService.post<any>('add/flavour', flavour);
  }

  /**
   * Update flavour
   * @param flavour
   */
  update(flavour: FlavourInterface): Observable<any> {
    return this.apiService.put<any>('update/flavour', flavour);
  }

  /**
   * Delete flavour
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.apiService.delete<any>('delete/flavour/' + id);
  }





}
