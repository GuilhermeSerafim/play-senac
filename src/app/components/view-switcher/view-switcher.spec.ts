import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSwitcher } from './view-switcher';

describe('ViewSwitcher', () => {
  let component: ViewSwitcher;
  let fixture: ComponentFixture<ViewSwitcher>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSwitcher]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSwitcher);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
