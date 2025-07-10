import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../../services/cart.service';
import { ExperienceService } from '../../../experience-detail/services/experience.service';
import { AvailabilityService } from '../../../experience-detail/services/availability.services';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userId = Number(localStorage.getItem('userId'));
  cartItems: any[] = [];
  totalPrice = 0;

  constructor(
    private cartService: CartService,
    private experienceService: ExperienceService,
    private availabilityService: AvailabilityService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCart(this.userId).pipe(
      switchMap(cart => {
        const itemDetails$ = cart.items.map(item =>
          this.availabilityService.getAvailabilityById(item.availabilityId).pipe(
            switchMap(availability =>
              this.experienceService.getExperienceById(availability.experienceId).pipe(
                map(experience => ({
                  availabilityId: item.availabilityId,
                  experienceTitle: experience.title,
                  date: availability.startDateTime,
                  quantity: item.quantity,
                  price: item.price,
                  experienceId: experience.id
                }))
              )
            )
          )
        );
        return forkJoin(itemDetails$);
      })
    ).subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  updateQuantity(item: any, delta: number) {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    this.cartService.updateItem(this.userId, {
      availabilityId: item.availabilityId,
      newQuantity
    }).subscribe(updated => {
      item.quantity = updated.quantity;
      item.price = updated.price;
      this.calculateTotal();
      this.snackBar.open('Cantidad actualizada', 'Cerrar', { duration: 2000 });
    });
  }

  removeItem(item: any) {
    this.cartService.removeItem(this.userId, item.availabilityId).subscribe(() => {
      this.snackBar.open('Item eliminado del carrito', 'Cerrar', { duration: 2000 });
      this.loadCart();
    });
  }

  clearCart() {
    this.cartService.clearCart(this.userId).subscribe(() => {
      this.snackBar.open('Carrito vaciado', 'Cerrar', { duration: 2000 });
      this.cartItems = [];
      this.totalPrice = 0;
    });
  }
}
