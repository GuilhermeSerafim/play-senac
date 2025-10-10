import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarQuadraDialog } from './criar-quadra-dialog';

describe('CriarQuadraDialog', () => {
  let component: CriarQuadraDialog;
  let fixture: ComponentFixture<CriarQuadraDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriarQuadraDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarQuadraDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
