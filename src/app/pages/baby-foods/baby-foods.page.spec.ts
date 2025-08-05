import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BabyFoodsPage } from './baby-foods.page';

describe('BabyFoodsPage', () => {
  let component: BabyFoodsPage;
  let fixture: ComponentFixture<BabyFoodsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BabyFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
