import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SnacksAndNamkeensPage } from './snacks-and-namkeens.page';

describe('SnacksAndNamkeensPage', () => {
  let component: SnacksAndNamkeensPage;
  let fixture: ComponentFixture<SnacksAndNamkeensPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SnacksAndNamkeensPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
