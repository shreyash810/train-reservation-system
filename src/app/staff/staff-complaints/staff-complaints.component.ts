import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { Complaint } from '../../models/complaint.model';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './staff-complaints.component.html',
  styleUrls: ['./staff-complaints.component.css']
})
export class StaffComplaintsComponent {

  staffName = 'Ramesh (Cleaning)';
  complaints: Complaint[];
  selected: Complaint | null = null;

  constructor(private service: ComplaintService) {
    this.complaints = this.service.getComplaintsForStaff(this.staffName);
  }

  select(c: Complaint) {
    this.selected = c;
  }

  updateStatus(id: string, status: Complaint['status']) {
    this.service.updateStatus(id, status);
  }

  logAction(id: string, note: string) {
    this.service.addAction(id, this.staffName, note);
  }
}
