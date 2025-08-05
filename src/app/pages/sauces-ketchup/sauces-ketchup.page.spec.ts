import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SaucesKetchupPage } from './sauces-ketchup.page';

describe('SaucesKetchupPage', () => {
  let component: SaucesKetchupPage;
  let fixture: ComponentFixture<SaucesKetchupPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SaucesKetchupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
