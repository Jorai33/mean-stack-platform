import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMileageComponent } from './all-mileage.component';

describe('AllMileageComponent', () => {
  let component: AllMileageComponent;
  let fixture: ComponentFixture<AllMileageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllMileageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
