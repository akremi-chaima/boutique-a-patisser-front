import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CollectionInterface } from '../models/collection.interface';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  constructor(private apiService: ApiService) {}

  /**
   * Get collections list
   */
  getList(): Observable<Array<CollectionInterface>> {
    return this.apiService.get<Array<CollectionInterface>>('collections');
  }

  /**
   * Get collection
   * @param id
   */
  get(id: number): Observable<CollectionInterface> {
    return this.apiService.get<CollectionInterface>('collection/' + id);
  }

  /**
   * Create collection
   * @param collection
   */
  create(collection: CollectionInterface): Observable<any> {
    return this.apiService.post<any>('add/collection', collection);
  }

  /**
   * Update collection
   * @param collection
   */
  update(collection: CollectionInterface): Observable<any> {
    return this.apiService.put<any>('update/collection', collection);
  }



}
