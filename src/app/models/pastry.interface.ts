import { CategoryInterface } from './category.interface';
import { FlavourInterface } from './flavour.interface';
import { SubCollectionInterface } from './subCollection.interface'

export interface PastryInterface {
  id: number|null;
  name : string;
  price : number;
  description : string;
  isVisible : boolean;
  category : CategoryInterface;
  subCollection : SubCollectionInterface;
  flavour: FlavourInterface;
  picture: string;
  formats: Array<string>|null;
}
