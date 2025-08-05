import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FemininecarePage } from './femininecare.page';

describe('FemininecarePage', () => {
  let component: FemininecarePage;
  let fixture: ComponentFixture<FemininecarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FemininecarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
