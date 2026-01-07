import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent {

  complaints: Complaint[];
  filtered: Complaint[];

  searchText = '';
  statusFilter = '';
  categoryFilter = '';

  constructor(private service: ComplaintService) {
    this.complaints = this.service.getAllComplaints();
    this.filtered = [...this.complaints];
  }

  filterComplaints() {
    this.filtered = this.complaints.filter(c =>
      (!this.searchText ||
        c.customerName.toLowerCase().includes(this.searchText.toLowerCase()) ||
        c.id.toLowerCase().includes(this.searchText.toLowerCase())
      ) &&
      (!this.statusFilter || c.status === this.statusFilter) &&
      (!this.categoryFilter || c.category === this.categoryFilter)
    );
  }

  assign(id: string, staff: string) {
    this.service.assignComplaint(id, staff);
    alert(`Staff ${staff} notified via email`);
  }

  updateStatus(id: string, status: Complaint['status']) {
    this.service.updateStatus(id, status);
  }

  addAction(id: string, note: string) {
    this.service.addAction(id, 'Admin', note);
  }
}
