import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PapadsFryumsPage } from './papads-fryums.page';

describe('PapadsFryumsPage', () => {
  let component: PapadsFryumsPage;
  let fixture: ComponentFixture<PapadsFryumsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PapadsFryumsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
