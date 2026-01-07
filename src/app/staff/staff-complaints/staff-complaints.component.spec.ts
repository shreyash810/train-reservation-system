import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffComplaintsComponent } from './staff-complaints.component';

describe('StaffComplaintsComponent', () => {
  let component: StaffComplaintsComponent;
  let fixture: ComponentFixture<StaffComplaintsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StaffComplaintsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
