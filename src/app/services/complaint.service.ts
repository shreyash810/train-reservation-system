import { Injectable } from '@angular/core';
import { Complaint } from '../models/complaint.model';

@Injectable({ providedIn: 'root' })
export class ComplaintService {

  private complaints: Complaint[] = [
    {
      id: 'CMP101',
      customerName: 'Amit Patil',
      category: 'Payment',
      title: 'Payment deducted but ticket not generated',
      description: 'Amount deducted but ticket not confirmed.',
      submittedDate: '2025-01-01',
      status: 'Open',
      priority: 'High',
      actions: []
    },
    {
      id: 'CMP102',
      customerName: 'Sneha Joshi',
      category: 'Cleanliness',
      title: 'Dirty coach',
      description: 'Coach was unclean during travel.',
      submittedDate: '2025-01-02',
      status: 'In Progress',
      assignedStaff: 'Ramesh (Cleaning)',
      priority: 'Medium',
      actions: [
        {
          actionDate: '2025-01-02 10:30',
          actionBy: 'Ramesh',
          notes: 'Reported to maintenance team'
        }
      ]
    },
    {
      id: 'CMP103',
      customerName: 'Rahul Kulkarni',
      category: 'Booking',
      title: 'Seat not allocated',
      description: 'Seat number missing on ticket.',
      submittedDate: '2025-01-03',
      status: 'Open',
      assignedStaff: 'Ramesh (Cleaning)',  
      priority: 'Low',
      actions: []
    }
  ];

  getAllComplaints() {
    return this.complaints;
  }

  getComplaintsForStaff(staff: string) {
    return this.complaints.filter(c => c.assignedStaff === staff);
  }

  assignComplaint(id: string, staff: string) {
    const c = this.complaints.find(c => c.id === id);
    if (c) {
      c.assignedStaff = staff;
      c.status = 'In Progress';
    }
  }

  updateStatus(id: string, status: Complaint['status']) {
    const c = this.complaints.find(c => c.id === id);
    if (c) c.status = status;
  }

  addAction(id: string, by: string, note: string) {
    const c = this.complaints.find(c => c.id === id);
    if (c) {
      c.actions.push({
        actionDate: new Date().toLocaleString(),
        actionBy: by,
        notes: note
      });
    }
  }
}
