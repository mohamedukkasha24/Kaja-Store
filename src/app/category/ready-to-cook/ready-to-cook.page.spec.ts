import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadyToCookPage } from './ready-to-cook.page';

describe('ReadyToCookPage', () => {
  let component: ReadyToCookPage;
  let fixture: ComponentFixture<ReadyToCookPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToCookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
