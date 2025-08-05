import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstantFoodsPage } from './instant-foods.page';

describe('InstantFoodsPage', () => {
  let component: InstantFoodsPage;
  let fixture: ComponentFixture<InstantFoodsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantFoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
