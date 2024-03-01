import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { PastryInterface } from '../models/pastry.interface';
import { HandlePastryInterface } from '../models/handle-pastry.interface';
import { PastriesPaginatorInterface } from '../models/pastries-paginator.interface';
import {PastryFilterInterface} from "../models/pastry-filter.interface";

@Injectable({
  providedIn: 'root'
})
export class PastryService {
  constructor(private apiService: ApiService) {}

  /**
   * Get pastries list
   */
  getList(): Observable<Array<PastryInterface>> {
    return this.apiService.get<Array<PastryInterface>>('pastries');
  }

  /**
   *
   * @param page
   * @param itemsPerPage
   * @param filter
   */

  getListByPaginator(page: number, itemsPerPage: number, filter: PastryFilterInterface|null): Observable<PastriesPaginatorInterface> {
    let body = {};
    if (filter) {
      body = filter;
    }
    return this.apiService.post<PastriesPaginatorInterface>('pastries/' + page + '/' + itemsPerPage, body);
  }


  /**
   * Get pastry
   * @param id
   */
  get(id: number): Observable<PastryInterface> {
    return this.apiService.get<PastryInterface>('pastry/' + id);
  }

  /**
   * Delete pastry
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.apiService.delete<any>('delete/pastry/' + id);
  }


  /**
   * Create pastry
   * @param pastry
   */
  create(pastry: HandlePastryInterface): Observable<any> {
    return this.apiService.post<any>('add/pastry', pastry);
  }

  /**
   * Update pastry
   * @param pastry
   */
  update(pastry: HandlePastryInterface): Observable<any> {
    return this.apiService.post<any>('update/pastry', pastry);
  }


}
