import React, { useEffect, useState } from 'react'
import { Box, CircularProgress, Grid, makeStyles } from '@material-ui/core'
import axios from 'axios'
import { IMAGE_API_URL, POKEMON_API_URL } from '../config'
import PokemonCards from '../components/PokemonCards';

const useStyle = makeStyles((theme) => ({
    pokedexContainer: {
        textAlign: 'center',
        padding: "70px 10px 0px 10px",
        backgroundColor: 'rgb(69, 68, 68)'
    }
}))

export default function Pokedex() {
    const [pokemonData, setPokemonData] = useState(null);
    const classes = useStyle()

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
            {pokemonData ?
                <Grid container spacing={2} className={classes.pokedexContainer}>
                    {pokemonData.map((pokemon) => {
                        return (
                            <PokemonCards pokemon={pokemon} image={pokemon.url} key={pokemon.id}/>
                    )
                    })}
                </Grid>
                :
                <CircularProgress style={{ marginTop: 100 }} />}
        </Box>
    )
};
