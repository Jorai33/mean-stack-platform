import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMileageComponent } from './new-mileage.component';

describe('NewMileageComponent', () => {
  let component: NewMileageComponent;
  let fixture: ComponentFixture<NewMileageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewMileageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
