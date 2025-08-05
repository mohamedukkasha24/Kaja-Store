import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReadyToEatPage } from './ready-to-eat.page';

describe('ReadyToEatPage', () => {
  let component: ReadyToEatPage;
  let fixture: ComponentFixture<ReadyToEatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToEatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
