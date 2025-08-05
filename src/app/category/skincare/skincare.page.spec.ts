import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SkincarePage } from './skincare.page';

describe('SkincarePage', () => {
  let component: SkincarePage;
  let fixture: ComponentFixture<SkincarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SkincarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
