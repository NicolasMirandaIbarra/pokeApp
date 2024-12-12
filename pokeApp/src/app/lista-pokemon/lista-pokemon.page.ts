import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { Pokemon } from '../model/pokemon';

@Component({
  selector: 'app-lista-pokemon',
  templateUrl: './lista-pokemon.page.html',
  styleUrls: ['./lista-pokemon.page.scss'],
})
export class ListaPokemonPage implements OnInit {

  public pokemons: Pokemon[];

  constructor(private pokemonService: PokemonService) { this.pokemons = [] }

  ngOnInit() {
    this.masPokemon();
  }

  masPokemon() {
    const promesa = this.pokemonService.getPokemons();

    if (promesa) {
      promesa.then((result: Pokemon[]) => {
        this.pokemons = this.pokemons.concat(result);

        console.log(this.pokemons)
      })
    }
  }

}
