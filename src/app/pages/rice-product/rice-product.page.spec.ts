import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RiceProductPage } from './rice-product.page';

describe('RiceProductPage', () => {
  let component: RiceProductPage;
  let fixture: ComponentFixture<RiceProductPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RiceProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
