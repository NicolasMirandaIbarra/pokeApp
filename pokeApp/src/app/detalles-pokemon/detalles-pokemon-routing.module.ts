import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallesPokemonPage } from './detalles-pokemon.page';

const routes: Routes = [
  {
    path: '',
    component: DetallesPokemonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallesPokemonPageRoutingModule {}
