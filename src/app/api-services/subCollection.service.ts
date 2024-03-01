import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { SubCollectionInterface } from '../models/subCollection.interface';
import { HandleSubCollectionInterface } from '../models/handle-subCollection.interface';

@Injectable({
  providedIn: 'root'
})
export class SubCollectionService {
  constructor(private apiService: ApiService) {}

  /**
   * Get subCollections list
   */
  getList(): Observable<Array<SubCollectionInterface>> {
    return this.apiService.get<Array<SubCollectionInterface>>('sub/collections');
  }

  /**
   * Get subCollection
   * @param id
   */
  get(id: number): Observable<SubCollectionInterface> {
    return this.apiService.get<SubCollectionInterface>('sub/collection/' + id);
  }

  /**
   * Create subCollection
   * @param subCollection
   */
  create(subCollection: HandleSubCollectionInterface): Observable<any> {
    return this.apiService.post<any>('add/sub/collection', subCollection);
  }

  /**
   * Update subCollection
   * @param subCollection
   */
  update(subCollection: HandleSubCollectionInterface): Observable<any> {
    return this.apiService.put<any>('update/sub/collection', subCollection);
  }

  /**
   * Delete pastry
   * @param id
   */
  delete(id: number): Observable<any> {
    return this.apiService.delete<any>('delete/sub/collection/' + id);
  }

}
