import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenderManagerComponent } from './vender-manager.component';

describe('VenderManagerComponent', () => {
  let component: VenderManagerComponent;
  let fixture: ComponentFixture<VenderManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VenderManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VenderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
