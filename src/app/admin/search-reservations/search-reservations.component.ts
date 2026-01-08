import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservationService } from '../../services/reservation.service';
import { Reservation } from '../../models/reservation.model';

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
  selected?: Reservation;

  page = 1;
  pageSize = 3;

  constructor(private service: ReservationService) {}

  isValidInput(): boolean {
    const textRegex = /^[a-zA-Z0-9\s-]*$/;
    return (
      textRegex.test(this.criteria.reservationId) &&
      textRegex.test(this.criteria.passengerName) &&
      textRegex.test(this.criteria.trainNumber)
    );
  }
  
  formatDate(dateStr:string): string {
    if (!dateStr) return '';

    const parts = dateStr.split('-');
    if (parts.length !==3) return dateStr;

    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return day + '-' + month + '-' + year;
  }
  search() {
    if (!this.isValidInput()) {
      alert('Invalid input detected. Please correct the fields.');
      return;
    }
    this.results = this.service.search(this.criteria);
    this.page = 1;
  }

  get paginatedResults() {
    const start = (this.page - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  next() {
    if (this.page * this.pageSize < this.results.length) this.page++;
  }

  prev() {
    if (this.page > 1) this.page--;
  }

  viewTrainDetails(r: Reservation) {
    this.selected = r;
  }

  cancel(id: string) {
    this.service.cancelReservation(id);
  }

  edit(r: Reservation) {
    if (r.status === 'Cancelled'){
      alert('Cancelled reservations cannot be edited');
      return;
    }
    r.status = r.status === 'Confirmed' ? 'Pending' : 'Confirmed';
  }
}
