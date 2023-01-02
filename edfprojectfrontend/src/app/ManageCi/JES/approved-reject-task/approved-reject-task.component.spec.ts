import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedRejectTaskComponent } from './approved-reject-task.component';

describe('ApprovedRejectTaskComponent', () => {
  let component: ApprovedRejectTaskComponent;
  let fixture: ComponentFixture<ApprovedRejectTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedRejectTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedRejectTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
