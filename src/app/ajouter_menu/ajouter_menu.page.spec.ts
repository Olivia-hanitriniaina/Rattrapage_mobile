import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ajouter_menuPage } from './ajouter_menu.page';

describe('Ajouter_menuPage', () => {
  let component: Ajouter_menuPage;
  let fixture: ComponentFixture<Ajouter_menuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ajouter_menuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ajouter_menuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
