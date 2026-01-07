export interface ComplaintAction {
  actionDate: string;
  actionBy: string;        // Admin / Staff name
  notes: string;
}

export interface Complaint {
  id: string;
  customerName: string;
  category: 'Payment' | 'Booking' | 'Cleanliness' | 'Service';
  title: string;
  description: string;
  submittedDate: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed' | 'Escalated';
  assignedStaff?: string;
  priority: 'Low' | 'Medium' | 'High';
  actions: ComplaintAction[];
}
