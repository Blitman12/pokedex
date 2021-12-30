import React, { useEffect, useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import { IMAGE_API_URL, POKEMON_API_URL } from '../config'



export default function Pokedex() {
    const [pokemonData, setPokemonData] = useState(null);

    useEffect(() => {
        axios.get(`${POKEMON_API_URL}?limit=151`)
        .then(response => {
            if (response.status >= 200 && response.status < 300) {
                const { results } = response.data
                let newPokemonData = []
                results.forEach((pokemon, index) => {
                    index++
                    let pokeObject = {
                        id: index,
                        url: `${IMAGE_API_URL}${index}.png`,
                        name: pokemon.name
                    }
                    newPokemonData.push(pokeObject)
                });
            setPokemonData(newPokemonData)
            }
        })
    }, [])

    return (
        <Box>
            {pokemonData ? pokemonData.map((pokemon) => {
                return <h1>{pokemon.name}</h1>
            }) : <CircularProgress  style={{ marginTop: 100 }}/>}
        </Box>
    )
};
