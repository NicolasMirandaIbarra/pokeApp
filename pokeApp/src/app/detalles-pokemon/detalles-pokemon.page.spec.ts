import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetallesPokemonPage } from './detalles-pokemon.page';

describe('DetallesPokemonPage', () => {
  let component: DetallesPokemonPage;
  let fixture: ComponentFixture<DetallesPokemonPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallesPokemonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
