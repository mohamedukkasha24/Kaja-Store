import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrockeriesPage } from './crockeries.page';

describe('CrockeriesPage', () => {
  let component: CrockeriesPage;
  let fixture: ComponentFixture<CrockeriesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrockeriesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
