import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';
import { formatDateToDDMMYYYY } from '../../utils/date-utils';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-reservations.component.html',
  styleUrls: ['./search-reservations.component.css']
})
export class SearchReservationsComponent {

  criteria = {
    reservationId: '',
    passengerName: '',
    trainNumber: '',
    status: '',
    reservationDate: ''
  };

  results: Reservation[] = [];
  selected: Reservation | null = null;

  page = 1;
  pageSize = 3;

  constructor(private service: ReservationService) {}

  /* ---------- VALIDATION ---------- */
  isValidInput(): boolean {
    const textRegex = /^[a-zA-Z0-9\s-]*$/;
    return (
      textRegex.test(this.criteria.reservationId) &&
      textRegex.test(this.criteria.passengerName) &&
      textRegex.test(this.criteria.trainNumber)
    );
  }

  /* ---------- SEARCH ---------- */
  search() {
    if (!this.isValidInput()) {
      alert('Invalid input detected. Please correct the fields.');
      return;
    }

    this.results = this.service.search(this.criteria);
    this.page = 1;
    this.selected = null;
  }

  /* ---------- PAGINATION ---------- */
  get paginatedResults() {
    const start = (this.page - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  next() {
    if (this.page * this.pageSize < this.results.length) {
      this.page++;
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
    }
  }

  /* ---------- TRAIN DETAILS ---------- */
  viewTrainDetails(r: Reservation) {
    this.selected = r;
  }

  /* ---------- ACTIONS WITH CONFIRMATION ---------- */
  cancel(id: string) {
    const ok = confirm('Are you sure you want to cancel this reservation?');
    if (!ok) return;

    this.service.cancelReservation(id);
  }

  edit(r: Reservation) {
    if (r.status === 'Cancelled') {
      alert('Cancelled reservations cannot be edited');
      return;
    }

    const newStatus = r.status === 'Confirmed' ? 'Pending' : 'Confirmed';
    const ok = confirm(`Change status to ${newStatus}?`);
    if (!ok) return;

    r.status = newStatus;
  }

  /* ---------- DATE FORMAT ---------- */
  formatDate(date: string): string {
    return formatDateToDDMMYYYY(date);
  }
}
