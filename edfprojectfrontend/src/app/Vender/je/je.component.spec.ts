import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JEComponent } from './je.component';

describe('JEComponent', () => {
  let component: JEComponent;
  let fixture: ComponentFixture<JEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
