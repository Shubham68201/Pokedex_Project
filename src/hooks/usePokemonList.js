import axios from "axios";
import { useEffect, useState } from "react";
import "../components/PokemonList/PokemonList.css";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: null,
    prevUrl: null,
  });

  async function downloadPokemons() {
    //iterting over the array of pokemons and using their url, to create an array of promises
    //that will download those 20 pokemons
     
      // setIsLoading(true);
      setPokemonListState((prev) => ({ ...prev, isLoading: true }));
      const response = await axios.get(pokemonListState.pokedexUrl); //this downloads list of 20 pokemons

      const pokemonResults = response.data.results; //we get the array of pokemons from results

      console.log("reponse ise", response.data.pokemon);

      console.log(pokemonListState);
      setPokemonListState((state) => ({
        ...state,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      //passing that promise array to axios.all
      const pokemonData = await axios.all(pokemonResultPromise); //array of 20 pokemon detailed data
      console.log(pokemonData);

      //now iterate on the data of each pokemon, and extract id, name, image, types
      const pokeListResult = pokemonData.map((pokedata) => {
        const pokemon = pokedata.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          types: pokemon.types,
        };
      });
      console.log(pokeListResult);
      // setPokemonList(pokeListResult);
      // setIsLoading(false);
      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
  }

  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
