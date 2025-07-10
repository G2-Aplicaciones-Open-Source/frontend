import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BookingService {
  constructor(private http: HttpClient) {}

  createBooking(body: any) {
    return this.http.post<{ id: number }>('/api/v1/bookings', body);
  }

  initiatePayment(bookingId: number, paymentMethod: string = 'card') {
    return this.http.post<{ clientSecret: string }>(`/api/v1/bookings/${bookingId}/payments/initiate`, {
      bookingId,
      paymentMethod
    });
  }
  getBookingsByUser(userId: number) {
    return this.http.get(`/api/v1/bookings/by-user/${userId}`);
  }

  cancelBooking(bookingId: number, body: { userId: number, reason: string }) {
    return this.http.post(`/api/v1/bookings/${bookingId}/cancel`, body);
  }

  refundBooking(bookingId: number, body: { refundReason: string }) {
    return this.http.post(`/api/v1/bookings/${bookingId}/refunds`, body);
  }

  failPayment(body: { bookingId: number, failureReason: string }) {
    return this.http.post(`/api/v1/bookings/fail-payment`, body);
  }

}
