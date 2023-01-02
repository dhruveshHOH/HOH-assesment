import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingvpVericationComponent } from './pendingvp-verication.component';

describe('PendingvpVericationComponent', () => {
  let component: PendingvpVericationComponent;
  let fixture: ComponentFixture<PendingvpVericationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingvpVericationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingvpVericationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
