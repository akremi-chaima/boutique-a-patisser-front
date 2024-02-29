import {PastryInterface} from "./pastry.interface";
export interface PastriesPaginatorInterface {
  data: Array<PastryInterface>;
  currentPage: number;
  totalItems: number;
}
