import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViagemCadastroPage1Component } from './viagem-cadastro-page1.component';

describe('ViagemCadastroPage1Component', () => {
  let component: ViagemCadastroPage1Component;
  let fixture: ComponentFixture<ViagemCadastroPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViagemCadastroPage1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViagemCadastroPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

