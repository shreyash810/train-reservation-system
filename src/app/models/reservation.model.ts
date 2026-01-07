export interface Reservation {
  reservationId: string;
  passengerName: string;
  trainNumber: string;
  trainName: string;
  reservationDate: string; // YYYY-MM-DD
  status: 'Confirmed' | 'Cancelled' | 'Pending';
}
