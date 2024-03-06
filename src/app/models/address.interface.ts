import { UserInterface } from './user.interface';

export interface AddressInterface {
  id: number|null;
  city : string;
  zipCode : number;
  street : string;
  userId : UserInterface;

}
