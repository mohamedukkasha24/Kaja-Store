import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChilledAndDairyfoodsPage } from './chilled-and-dairyfoods.page';

describe('ChilledAndDairyfoodsPage', () => {
  let component: ChilledAndDairyfoodsPage;
  let fixture: ComponentFixture<ChilledAndDairyfoodsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ChilledAndDairyfoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
