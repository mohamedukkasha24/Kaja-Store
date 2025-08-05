import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StationariesPage } from './stationaries.page';

describe('StationariesPage', () => {
  let component: StationariesPage;
  let fixture: ComponentFixture<StationariesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StationariesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
