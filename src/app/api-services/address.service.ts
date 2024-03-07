import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { AddressInterface } from "../models/address.interface";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private apiService: ApiService) {}

  /**
   * Get addresses list
   */
  getList(): Observable<Array<AddressInterface>> {
    return this.apiService.get<Array<AddressInterface>>('addresses');
  }


  /**
   * Get address
   */
  get(): Observable<AddressInterface> {
    return this.apiService.get<AddressInterface>('private/address');
  }

  /**
   * Update address
   * @param address
   */
  update(address: AddressInterface): Observable<any> {
    return this.apiService.put<any>('update/address', address);
  }
}
