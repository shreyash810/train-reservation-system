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

  currentPage = 1;
  pageSize = 2;

  constructor(private service: ReservationService) {}

  search() {
    this.results = this.service.search(this.criteria);
    this.currentPage = 1;
  }

  get paginatedResults() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.results.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.currentPage * this.pageSize < this.results.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  cancelReservation(id: string) {
    alert(`Reservation ${id} cancelled`);
  }

  editReservation(id: string) {
    alert(`Edit reservation ${id}`);
  }
}
