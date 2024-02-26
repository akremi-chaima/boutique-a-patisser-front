import { CategoryInterface } from './category.interface';
import { FlavourInterface } from './flavour.interface';
import { SubCollectionInterface } from './subCollection.interface';
import { PictureInterface } from './picture.interface';

export interface PastryInterface {
  id: number;
  name : string;
  price : number;
  description : string;
  isVisible : boolean;
  category : CategoryInterface;
  subCollection : SubCollectionInterface;
  flavour: FlavourInterface;
  pictures: Array<PictureInterface>;
}
