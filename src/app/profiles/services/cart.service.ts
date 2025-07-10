import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Cart } from '../model/cart.model';
import { CartItem } from '../model/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = `${environment.serverBasePath}/carts`;

  constructor(private http: HttpClient) {}

  getCart(userId: number): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/${userId}`);
  }

  createCart(userId: number): Observable<Cart> {
    return this.http.post<Cart>(`${this.baseUrl}`, { userId });
  }

  addItem(userId: number, item: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(`${this.baseUrl}/${userId}/items`, item);
  }

  updateItem(userId: number, item: { availabilityId: number; newQuantity: number }): Observable<CartItem> {
    return this.http.put<CartItem>(`${this.baseUrl}/${userId}/items`, item);
  }

  removeItem(userId: number, availabilityId: number): Observable<void> {
    return this.http.request<void>('delete', `${this.baseUrl}/${userId}/items`, {
      body: { availabilityId }
    });
  }

  clearCart(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${userId}`);
  }

  countItems(userId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/${userId}/items/count`);
  }
}
