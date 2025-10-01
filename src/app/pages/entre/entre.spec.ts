import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Entre } from './entre';

describe('Entre', () => {
  let component: Entre;
  let fixture: ComponentFixture<Entre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Entre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Entre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
