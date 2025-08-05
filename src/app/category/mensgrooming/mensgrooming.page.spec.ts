import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensgroomingPage } from './mensgrooming.page';

describe('MensgroomingPage', () => {
  let component: MensgroomingPage;
  let fixture: ComponentFixture<MensgroomingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MensgroomingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
