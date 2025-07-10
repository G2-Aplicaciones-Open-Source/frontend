import { Component, Input, OnInit, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { loadStripe, Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { environment} from '../../../../environments/environment';

@Component({
  selector: 'app-stripe-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stripe-payment.html',
  styleUrls: ['./stripe-payment.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StripePaymentComponent implements OnInit {
  @Input({ required: true }) clientSecret!: string;

  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card!: StripeCardElement;

  processing: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');
  success: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    this.initStripe().then();
  }

  async initStripe(): Promise<void> {
    this.stripe = await loadStripe(environment.stripePublicKey);
    if (!this.stripe || !this.clientSecret) {
      this.errorMessage.set('Stripe no se ha podido inicializar');
      return;
    }

    this.elements = this.stripe.elements({ clientSecret: this.clientSecret });
    const cardElement = this.elements.create('card');
    cardElement.mount('#card-element');

    this.card = cardElement;
  }

  async handlePayment(): Promise<void> {
    this.processing.set(true);
    this.errorMessage.set('');

    if (!this.stripe || !this.elements) {
      this.errorMessage.set('Stripe no se ha inicializado correctamente');
      this.processing.set(false);
      return;
    }

    const { error } = await this.stripe.confirmCardPayment(this.clientSecret, {
      payment_method: {
        card: this.card,
      }
    });

    if (error) {
      this.errorMessage.set(error.message || 'Error al procesar el pago');
      this.processing.set(false);
    } else {
      this.success.set(true);
      this.processing.set(false);
    }
  }
}
