import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FruitsAndVegetablesPage } from './fruits-and-vegetables.page';

describe('FruitsAndVegetablesPage', () => {
  let component: FruitsAndVegetablesPage;
  let fixture: ComponentFixture<FruitsAndVegetablesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FruitsAndVegetablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
