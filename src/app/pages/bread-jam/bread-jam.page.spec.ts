import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BreadJamPage } from './bread-jam.page';

describe('BreadJamPage', () => {
  let component: BreadJamPage;
  let fixture: ComponentFixture<BreadJamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadJamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
