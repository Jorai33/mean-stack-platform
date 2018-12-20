import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMileageComponent } from './view-mileage.component';

describe('ViewMileageComponent', () => {
  let component: ViewMileageComponent;
  let fixture: ComponentFixture<ViewMileageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewMileageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
