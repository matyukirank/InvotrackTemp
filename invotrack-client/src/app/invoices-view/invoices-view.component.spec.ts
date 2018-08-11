import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesViewComponent } from './invoices-view.component';

describe('InvoicesViewComponent', () => {
  let component: InvoicesViewComponent;
  let fixture: ComponentFixture<InvoicesViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvoicesViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoicesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
