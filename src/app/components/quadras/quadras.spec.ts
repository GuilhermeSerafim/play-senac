import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Quadras } from './quadras';

describe('Quadras', () => {
  let component: Quadras;
  let fixture: ComponentFixture<Quadras>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Quadras]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Quadras);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
