import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvidadosDialog } from './convidados-dialog';

describe('ConvidadosDialog', () => {
  let component: ConvidadosDialog;
  let fixture: ComponentFixture<ConvidadosDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConvidadosDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConvidadosDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
