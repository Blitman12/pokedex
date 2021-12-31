import { TOGGLE_FAVORITE } from "./actions";

const initialData = {
    favorites: []
}

const pokemonReducer = (state = initialData, action) =>  {
    switch(action.type) {
        case TOGGLE_FAVORITE:
            let pokemon = action.payload
            let pokemonFromFavorite = state.favorites.find((favPokemon) => pokemon.id === favPokemon.id)
            return {
                ...state,
                favorites: pokemonFromFavorite ? 
                    [...state.favorites.filter((favPokemon) => pokemon.id !== favPokemon.id)] : [...state.favorites, pokemon]
            };
        default:
            return state;
    }
}

export default pokemonReducer;