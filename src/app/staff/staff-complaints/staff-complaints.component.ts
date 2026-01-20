import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint.model';
import { formatDateToDDMMYYYY } from '../../utils/date-utils';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-complaints.component.html',
  styleUrls: ['./staff-complaints.component.css']
})
export class StaffComplaintsComponent {

  staffName = 'Ramesh (Cleaning)';
  complaints: Complaint[] = [];
  selected: Complaint | null = null;

  /* ---------- PAGINATION ---------- */
  page = 1;
  pageSize = 3;

  constructor(private service: ComplaintService) {
    this.complaints = this.service.getComplaintsForStaff(this.staffName);
  }

  get paginatedComplaints() {
    const start = (this.page - 1) * this.pageSize;
    return this.complaints.slice(start, start + this.pageSize);
  }

  next() {
    if (this.page * this.pageSize < this.complaints.length) {
      this.page++;
    }
  }

  prev() {
    if (this.page > 1) {
      this.page--;
    }
  }

  /* ---------- SELECTION ---------- */
  select(c: Complaint) {
    this.selected = c;
  }

  /* ---------- ACTIONS ---------- */
  updateStatus(id: string, status: Complaint['status']) {
    this.service.updateStatus(id, status);
  }

  logAction(id: string, note: string) {
    if (!note.trim()) return;
    this.service.addAction(id, this.staffName, note);
  }

  formatDate(date: string): string {
    return formatDateToDDMMYYYY(date);
  }
}
