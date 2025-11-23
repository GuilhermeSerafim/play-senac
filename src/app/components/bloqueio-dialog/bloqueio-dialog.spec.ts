import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueioDialog } from './bloqueio-dialog';

describe('BloqueioDialog', () => {
  let component: BloqueioDialog;
  let fixture: ComponentFixture<BloqueioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueioDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueioDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
