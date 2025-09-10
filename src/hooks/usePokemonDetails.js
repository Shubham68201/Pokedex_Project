import axios from "axios";
import { useState, useEffect } from "react";
import usePokemonList from "./usePokemonList";

function usePokemonDetails(id, pokemonName) {
  const [pokemon, setPokemon] = useState({});
  let pokemonListHookResponse = [];
  async function downloadPokemon() {
    try {
      let response;
      if (pokemonName) {
        response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        );
      } else {
        response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      }
      const pokemonOfSameTypes = await axios.get(
        `https://pokeapi.co/api/v2/type/${
          response.data.types ? response.data.types[0].type.name : "fire"
        }`
      );

      setPokemon({
        name: response.data.name,
        image: response.data.sprites.other.dream_world.front_default,
        weight: response.data.weight,
        height: response.data.height,
        types: response.data.types.map((t) => t.type.name),
        similarPokemons: pokemonOfSameTypes.data.pokemon,
      });


      setPokemonListState({
        ...pokemonListState,
        type: response.data.types ? response.data.types[0].type.name : "fire",
      });
    } catch (err) {
    }
  }

  const [pokemonListState, setPokemonListState] = useState({});

  useEffect(() => {
    downloadPokemon();
  }, []);

  return [pokemon, pokemonListState];
}

export default usePokemonDetails;
