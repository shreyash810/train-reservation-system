import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint.model';
import { formatDateToDDMMYYYY } from '../../utils/date-utils';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent {

  complaints: Complaint[] = [];
  filtered: Complaint[] = [];

  selected: Complaint | null = null;

  searchText = '';
  statusFilter = '';
  categoryFilter = '';

  page = 1;
  pageSize = 3;

  constructor(private service: ComplaintService) {
    this.complaints = this.service.getAllComplaints();
    this.filtered = [...this.complaints];
  }

  /* ---------- FILTERING ---------- */
  filterComplaints() {
    this.page = 1;
    this.selected = null;
    this.filtered = this.complaints.filter(c =>
      (!this.searchText ||
        c.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        c.id.toLowerCase().includes(this.searchText.toLowerCase())
      ) &&
      (!this.statusFilter || c.status === this.statusFilter) &&
      (!this.categoryFilter || c.category === this.categoryFilter)
    );
  }

  /* ---------- PAGINATION ---------- */
  get paginatedComplaints() {
    const start = (this.page - 1) * this.pageSize;
    return this.filtered.slice(start, start + this.pageSize);
  }

  next() {
    if (this.page * this.pageSize < this.filtered.length) {
      this.page++;
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
    }
  }

  /* ---------- SELECTION ---------- */
  selectComplaint(c: Complaint) {
    this.selected = c;
  }

  /* ---------- ACTIONS ---------- */
  assign(id: string, staff: string) {
    if (!staff) return;
    this.service.assignComplaint(id, staff);
    alert(`Staff ${staff} notified via email`);
  }

  updateStatus(id: string, status: Complaint['status']) {
    this.service.updateStatus(id, status);
  }

  addAction(id: string, note: string) {
    if (!note.trim()) return;
    this.service.addAction(id, 'Admin', note);
  }

  formatDate(date: string): string {
    return formatDateToDDMMYYYY(date);
  }
}
