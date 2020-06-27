import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrderProviderPage } from './detail-order-provider.page';

describe('DetailOrderProviderPage', () => {
  let component: DetailOrderProviderPage;
  let fixture: ComponentFixture<DetailOrderProviderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailOrderProviderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailOrderProviderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
