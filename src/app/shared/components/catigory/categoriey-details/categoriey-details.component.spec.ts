import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieyDetailsComponent } from './categoriey-details.component';

describe('CategorieyDetailsComponent', () => {
  let component: CategorieyDetailsComponent;
  let fixture: ComponentFixture<CategorieyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieyDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
