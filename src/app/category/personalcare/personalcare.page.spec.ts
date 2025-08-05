import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalcarePage } from './personalcare.page';

describe('PersonalcarePage', () => {
  let component: PersonalcarePage;
  let fixture: ComponentFixture<PersonalcarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalcarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
