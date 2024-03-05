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
    const formData: FormData = new FormData();
    if (pastry.picture) {
      // @ts-ignore
      formData.append('file', pastry.picture);
    } else {
      // @ts-ignore
      formData.append('file', null);
    }
    formData.append('name', pastry.name);
    formData.append('description', pastry.description);
    // @ts-ignore
    formData.append('price', pastry.price);
    // @ts-ignore
    formData.append('isVisible', pastry.isVisible);
    // @ts-ignore
    formData.append('categoryId', pastry.categoryId);
    // @ts-ignore
    formData.append('subCollectionId', pastry.subCollectionId);
    // @ts-ignore
    formData.append('flavourId', pastry.flavourId);
    return this.apiService.postFile('add/pastry', formData);
  }

  /**
   * Update pastry
   * @param pastry
   */
  update(pastry: HandlePastryInterface): Observable<any> {
    const formData: FormData = new FormData();
    if (pastry.picture) {
      // @ts-ignore
      formData.append('file', pastry.picture);
    } else {
      // @ts-ignore
      formData.append('file', null);
    }
    // @ts-ignore
    formData.append('id', pastry.id);
    formData.append('name', pastry.name);
    formData.append('description', pastry.description);
    // @ts-ignore
    formData.append('price', pastry.price);
    // @ts-ignore
    formData.append('isVisible', pastry.isVisible);
    // @ts-ignore
    formData.append('categoryId', pastry.categoryId);
    // @ts-ignore
    formData.append('subCollectionId', pastry.subCollectionId);
    // @ts-ignore
    formData.append('flavourId', pastry.flavourId);
    return this.apiService.postFile('update/pastry', formData);
  }


}
