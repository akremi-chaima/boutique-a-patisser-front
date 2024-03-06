export interface HandlePastryInterface {
  id: number|null;
  name : string;
  price : number;
  description : string;
  isVisible : boolean;
  categoryId : number;
  subCollectionId : number;
  flavourId: number;
  picture: string|null;
  formats: string|null;
}
