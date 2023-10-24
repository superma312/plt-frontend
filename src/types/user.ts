import { Product } from './product';

export interface User {
  name: string;
  email: string;
  age?: number;
  orders: Product[];
}
