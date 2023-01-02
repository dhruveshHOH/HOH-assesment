import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderPlannerComponent } from './vender-planner.component';

describe('VenderPlannerComponent', () => {
  let component: VenderPlannerComponent;
  let fixture: ComponentFixture<VenderPlannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenderPlannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderPlannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
