import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasAdm } from './reservas-adm';

describe('ReservasAdm', () => {
  let component: ReservasAdm;
  let fixture: ComponentFixture<ReservasAdm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasAdm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservasAdm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
