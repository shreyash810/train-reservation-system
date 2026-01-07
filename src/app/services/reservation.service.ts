import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation.model';

@Injectable({ providedIn: 'root' })
export class ReservationService {

  private reservations: Reservation[] = [
    {
      reservationId: 'RES101',
      passengerName: 'Amit Patil',
      trainNumber: '12001',
      trainName: 'Shatabdi Express',
      reservationDate: '2025-01-10',
      status: 'Confirmed'
    },
    {
      reservationId: 'RES102',
      passengerName: 'Sneha Joshi',
      trainNumber: '11010',
      trainName: 'Deccan Queen',
      reservationDate: '2025-01-12',
      status: 'Pending'
    },
    {
      reservationId: 'RES103',
      passengerName: 'Rahul Kulkarni',
      trainNumber: '12124',
      trainName: 'Deccan Express',
      reservationDate: '2025-01-15',
      status: 'Cancelled'
    }
  ];

  search(criteria: any): Reservation[] {
    return this.reservations.filter(r =>
      (!criteria.reservationId || r.reservationId.includes(criteria.reservationId)) &&
      (!criteria.passengerName || r.passengerName.toLowerCase().includes(criteria.passengerName.toLowerCase())) &&
      (!criteria.trainNumber || r.trainNumber.includes(criteria.trainNumber)) &&
      (!criteria.status || r.status === criteria.status) &&
      (!criteria.reservationDate || r.reservationDate === criteria.reservationDate)
    );
  }
}
