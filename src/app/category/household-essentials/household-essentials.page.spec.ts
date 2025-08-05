import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HouseholdEssentialsPage } from './household-essentials.page';

describe('HouseholdEssentialsPage', () => {
  let component: HouseholdEssentialsPage;
  let fixture: ComponentFixture<HouseholdEssentialsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseholdEssentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
