import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Pokemon } from '../model/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private urlBase: string;

  constructor() {
    // Define la URL base para acceder a la API de Pokémon.
    this.urlBase = 'https://pokeapi.co/api/v2/pokemon?limit=40&offset=0';
  }
  

  getPokemons() {
    const url = this.urlBase; // Toma la URL base para iniciar la consulta.

    if (url) {
      // Opciones para realizar la solicitud HTTP con CapacitorHttp.
      const options = {
        url, // URL inicial para obtener los Pokémon.
        headers: {}, // Encabezados HTTP, vacíos en este caso.
        params: {} // Parámetros adicionales, vacíos en este caso.
      };

      // Realiza una solicitud HTTP GET a la URL base.
      return CapacitorHttp.get(options).then(async (response) => {
        let pokemons: Pokemon[] = []; // Arreglo para almacenar los Pokémon procesados.

        console.log(response); // Muestra en consola la respuesta obtenida de la API.

        if (response.data) {
          // Extrae la lista de Pokémon de la respuesta.
          const respuesta = response.data.results;

          // Actualiza la URL base a la URL de la siguiente página.
          this.urlBase = response.data.netx;

          const promesa: Promise<HttpResponse>[] = []; // Arreglo para almacenar promesas de solicitudes HTTP.

          // Itera sobre cada Pokémon de la lista.
          for (let index = 0; index < respuesta.length; index++) {
            const pokemon = respuesta[index];
            const urlPokemon = pokemon.url; // URL para obtener los detalles del Pokémon actual.
            const options = {
              url: urlPokemon, // Configuración para obtener detalles del Pokémon.
              headers: {},
              params: {}
            };
            promesa.push(CapacitorHttp.get(options)); // Agrega la solicitud HTTP a la lista de promesas.
          }

          // Espera a que todas las solicitudes para obtener detalles se completen.
          await Promise.all(promesa).then((responses) => {
            console.log(responses); // Muestra las respuestas de todas las solicitudes.

            // Itera sobre las respuestas para procesar los datos de cada Pokémon.
            for (const response of responses) {
              const pokemonData = response.data; // Detalles del Pokémon.
              console.log(pokemonData);

              const pokemonObj = new Pokemon(); // Crea una nueva instancia de la clase Pokémon.

              // Asigna propiedades al objeto Pokémon.
              pokemonObj.orden = pokemonData.order; // Orden del Pokémon en la Pokédex.
              pokemonObj.nombre = pokemonData.name; // Nombre del Pokémon.
              pokemonObj.tipo1 = pokemonData.types[0].type.name; // Primer tipo del Pokémon.
              if (pokemonData.types[1]) {
                pokemonObj.tipo2 = pokemonData.types[1].type.name; // Segundo tipo, si existe.
              }
              pokemonObj.sprite = pokemonData.sprites.front_default; // URL del sprite del Pokémon.
              pokemonObj.alto = pokemonData.height / 10; // Altura en metros.
              pokemonObj.peso = pokemonData.weight / 10; // Peso en kilogramos.
              pokemonObj.habilidades = pokemonData.abilities
                .filter(ab => !ab.is_hidden) // Filtra habilidades visibles.
                .map(ab => ab.ability.name); // Mapea para obtener solo los nombres.

              // Busca la habilidad oculta, si existe.
              const habilidadOculta = pokemonData.abilities.find(ab => ab.is_hidden);
              if (habilidadOculta) {
                pokemonObj.habilidadOculta = habilidadOculta.ability.name; // Asigna habilidad oculta.
              }

              // Agrega el objeto Pokémon al arreglo de Pokémon.
              pokemons.push(pokemonObj);
            }
          });
        }
        return pokemons; // Devuelve la lista de Pokémon procesados.
      });
    }
    return null; // Devuelve null si la URL base no está definida.
  }  

}
