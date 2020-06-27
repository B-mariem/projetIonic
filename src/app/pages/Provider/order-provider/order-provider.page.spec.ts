import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProviderPage } from './order-provider.page';

describe('OrderProviderPage', () => {
  let component: OrderProviderPage;
  let fixture: ComponentFixture<OrderProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
