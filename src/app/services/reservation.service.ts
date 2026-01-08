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
      source: 'Mumbai',
      destination: 'Pune',

      departureDay: 'Day 1',
      departureTime: '08:00 AM',
      arrivalDay: 'Day 1',
      arrivalTime: '10:00 AM',
      totalKms: 134,

      reservationDate: '2025-01-10',
      status: 'Confirmed'
    },
    {
      reservationId: 'RES102',
      passengerName: 'Sneha Joshi',
      trainNumber: '11010',
      trainName: 'Deccan Queen',
      source: 'Mumbai',
      destination: 'Pune',

      departureDay: 'Day 1',
      departureTime: '08:00 PM',
      arrivalDay: 'Day 1',
      arrivalTime: '10:30 PM',
      totalKms: 134,

      reservationDate: '2025-01-11',
      status: 'Pending'
    },
    {
      reservationId: 'RES103',
      passengerName: 'Rahul Kulkarni',
      trainNumber: '12124',
      trainName: 'Duranto Express',
      source: 'Kochi',
      destination: 'Amritsar',

      departureDay: 'Day 1',
      departureTime: '03:00 AM',
      arrivalDay: 'Day 3',
      arrivalTime: '06:30 PM',
      totalKms: 1504,

      reservationDate: '2025-01-12',
      status: 'Confirmed'
    },
    {
      reservationId: 'RES104',
      passengerName: 'Neha Deshmukh',
      trainNumber: '12123',
      trainName: 'Intercity Express',
      source: 'Nashik',
      destination: 'Mumbai',

      departureDay: 'Day 1',
      departureTime: '11:00 PM',
      arrivalDay: 'Day 2',
      arrivalTime: '04:00 AM',
      totalKms: 223,

      reservationDate: '2025-01-13',
      status: 'Cancelled'
    },
    {
      reservationId: 'RES105',
      passengerName: 'Rohit More',
      trainNumber: '11009',
      trainName: 'Chennai Express',
      source: 'Chennai',
      destination: 'Mumbai',

      departureDay: 'Day 1',
      departureTime: '09:00 AM',
      arrivalDay: 'Day 2',
      arrivalTime: '10:00 PM',
      totalKms: 800,

      reservationDate: '2025-01-14',
      status: 'Confirmed'
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

  cancelReservation(id: string) {
    const r = this.reservations.find(r => r.reservationId === id);
    if (r) r.status = 'Cancelled';
  }

  editReservation(id: string, newStatus: string) {
    const r = this.reservations.find(r => r.reservationId === id);
    if (r) r.status = newStatus as any;
  }
}
