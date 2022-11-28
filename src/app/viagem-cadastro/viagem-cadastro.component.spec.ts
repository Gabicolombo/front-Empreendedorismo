import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagemCadastroComponent } from './viagem-cadastro.component';

describe('ViagemCadastroComponent', () => {
  let component: ViagemCadastroComponent;
  let fixture: ComponentFixture<ViagemCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViagemCadastroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViagemCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

