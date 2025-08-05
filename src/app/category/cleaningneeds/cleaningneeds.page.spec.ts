import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CleaningneedsPage } from './cleaningneeds.page';

describe('CleaningneedsPage', () => {
  let component: CleaningneedsPage;
  let fixture: ComponentFixture<CleaningneedsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CleaningneedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
