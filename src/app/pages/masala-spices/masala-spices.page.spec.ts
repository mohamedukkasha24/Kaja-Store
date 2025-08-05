import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasalaSpicesPage } from './masala-spices.page';

describe('MasalaSpicesPage', () => {
  let component: MasalaSpicesPage;
  let fixture: ComponentFixture<MasalaSpicesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasalaSpicesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
