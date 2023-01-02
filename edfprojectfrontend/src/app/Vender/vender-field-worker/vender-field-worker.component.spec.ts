import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderFieldWorkerComponent } from './vender-field-worker.component';

describe('VenderFieldWorkerComponent', () => {
  let component: VenderFieldWorkerComponent;
  let fixture: ComponentFixture<VenderFieldWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenderFieldWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderFieldWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
