import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StaplesPage } from './staples.page';

describe('StaplesPage', () => {
  let component: StaplesPage;
  let fixture: ComponentFixture<StaplesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StaplesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
