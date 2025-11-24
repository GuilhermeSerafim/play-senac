import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueiosAdm } from './bloqueios-adm';

describe('BloqueiosAdm', () => {
  let component: BloqueiosAdm;
  let fixture: ComponentFixture<BloqueiosAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueiosAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueiosAdm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
