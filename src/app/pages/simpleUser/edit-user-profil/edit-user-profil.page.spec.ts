import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserProfilPage } from './edit-user-profil.page';

describe('EditUserProfilPage', () => {
  let component: EditUserProfilPage;
  let fixture: ComponentFixture<EditUserProfilPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserProfilPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
