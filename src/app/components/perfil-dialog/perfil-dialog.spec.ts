import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDialog } from './perfil-dialog';

describe('PerfilDialog', () => {
  let component: PerfilDialog;
  let fixture: ComponentFixture<PerfilDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PerfilDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PerfilDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
