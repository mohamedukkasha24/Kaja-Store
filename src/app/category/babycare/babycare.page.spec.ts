import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BabycarePage } from './babycare.page';

describe('BabycarePage', () => {
  let component: BabycarePage;
  let fixture: ComponentFixture<BabycarePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BabycarePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
