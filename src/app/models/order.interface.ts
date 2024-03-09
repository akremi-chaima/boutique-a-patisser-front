import { OrderContentInterface } from './order-content.interface';

export interface OrderInterface {
  id: number;
  createdAt : string;
  firstName : string;
  lastName : string;
  email : string;
  phoneNumber : string;
  status : string;
  content : Array<OrderContentInterface>;
}
