import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCashComponent } from './check-cash.component';

describe('CheckCashComponent', () => {
  let component: CheckCashComponent;
  let fixture: ComponentFixture<CheckCashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckCashComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
