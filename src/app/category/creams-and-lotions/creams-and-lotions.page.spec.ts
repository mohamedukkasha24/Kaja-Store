import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreamsAndLotionsPage } from './creams-and-lotions.page';

describe('CreamsAndLotionsPage', () => {
  let component: CreamsAndLotionsPage;
  let fixture: ComponentFixture<CreamsAndLotionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreamsAndLotionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
