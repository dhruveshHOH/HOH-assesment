import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedVpComponent } from './rejected-vp.component';

describe('RejectedVpComponent', () => {
  let component: RejectedVpComponent;
  let fixture: ComponentFixture<RejectedVpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectedVpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedVpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
