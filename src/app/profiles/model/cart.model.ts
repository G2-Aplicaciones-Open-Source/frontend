import { CartItem } from './cart-item.model';

export interface Cart {
  cartId: number;
  userId: number;
  items: CartItem[];
}
