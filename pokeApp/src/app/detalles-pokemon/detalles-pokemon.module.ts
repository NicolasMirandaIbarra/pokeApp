import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallesPokemonPageRoutingModule } from './detalles-pokemon-routing.module';

import { DetallesPokemonPage } from './detalles-pokemon.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallesPokemonPageRoutingModule
  ],
  declarations: [DetallesPokemonPage]
})
export class DetallesPokemonPageModule {}
