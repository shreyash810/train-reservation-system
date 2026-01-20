import { Routes } from '@angular/router';
import { AdminComplaintsComponent } from './admin/admin-complaints/admin-complaints.component';
import { StaffComplaintsComponent } from './staff/staff-complaints/staff-complaints.component';
import { SearchReservationsComponent } from './admin/search-reservations/search-reservations.component';

export const routes: Routes = [
  { path: 'admin/complaints', component: AdminComplaintsComponent },
  { path: 'staff/complaints', component: StaffComplaintsComponent },
  { path: 'admin/reservations',component: SearchReservationsComponent }
];
