import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'detalles-pokemon',
    loadChildren: () => import('./detalles-pokemon/detalles-pokemon.module').then( m => m.DetallesPokemonPageModule)
  },
  {
    path: 'lista-pokemon',
    loadChildren: () => import('./lista-pokemon/lista-pokemon.module').then( m => m.ListaPokemonPageModule)
  },
  {
    path: '',
    redirectTo: 'lista-pokemon',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
