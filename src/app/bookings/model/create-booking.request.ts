export interface CreateBookingRequest {
  userId: number;
  availabilityId: number;
  ticketTypeId: number;
  quantity: number;
  bookingDate: string;
}
