import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoverBloqueioDialog } from './remover-bloqueio-dialog';

describe('RemoverBloqueioDialog', () => {
  let component: RemoverBloqueioDialog;
  let fixture: ComponentFixture<RemoverBloqueioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoverBloqueioDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoverBloqueioDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
