import { CollectionInterface } from './collection.interface';

export interface SubCollectionInterface {
  id: number;
  name : string;
  isActive : boolean;
  collection : CollectionInterface;
}
