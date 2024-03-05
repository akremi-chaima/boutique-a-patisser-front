import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CategoryInterface } from '../models/category.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private apiService: ApiService) {}

  /**
   * Get categories list
   */
  getList(): Observable<Array<CategoryInterface>> {
    return this.apiService.get<Array<CategoryInterface>>('categories');
  }

  /**
   * Get category
   * @param id
   */
  get(id: number): Observable<CategoryInterface> {
    return this.apiService.get<CategoryInterface>('category/' + id);
  }

  /**
   * Create category
   * @param category
   */
  create(category: CategoryInterface): Observable<any> {
    return this.apiService.post<any>('add/category', category);
  }

  /**
   * Update category
   * @param category
   */
  update(category: CategoryInterface): Observable<any> {
    return this.apiService.put<any>('update/category', category);
  }

}
