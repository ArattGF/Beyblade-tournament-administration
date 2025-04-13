import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPointsComponent } from './confirm-points.component';

describe('ConfirmPointsComponent', () => {
  let component: ConfirmPointsComponent;
  let fixture: ComponentFixture<ConfirmPointsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmPointsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
