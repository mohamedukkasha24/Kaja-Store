import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OralcarePage } from './oralcare.page';

describe('OralcarePage', () => {
  let component: OralcarePage;
  let fixture: ComponentFixture<OralcarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(OralcarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
