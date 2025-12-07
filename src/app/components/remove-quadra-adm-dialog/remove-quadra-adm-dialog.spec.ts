import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveQuadraAdmDialog } from './remove-quadra-adm-dialog';

describe('RemoveQuadraAdmDialog', () => {
  let component: RemoveQuadraAdmDialog;
  let fixture: ComponentFixture<RemoveQuadraAdmDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveQuadraAdmDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveQuadraAdmDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
