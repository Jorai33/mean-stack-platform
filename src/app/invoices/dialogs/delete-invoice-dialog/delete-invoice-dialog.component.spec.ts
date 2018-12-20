import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteInvoiceDialogComponent } from './delete-invoice-dialog.component';

describe('DeleteInvoiceDialogComponent', () => {
  let component: DeleteInvoiceDialogComponent;
  let fixture: ComponentFixture<DeleteInvoiceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteInvoiceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteInvoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
