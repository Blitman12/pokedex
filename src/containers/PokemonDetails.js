import React, { Component } from 'react'
import { Box, CircularProgress, Grid, Typography, Button } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import axios from 'axios'
import { POKEMON_API_URL } from '../config'
import FavoriteIcon from "@material-ui/icons/Favorite";
import { connect } from 'react-redux'

const styles = (theme) => ({
    pokedexContainer: {
        height: '84vh',
        backgroundColor: 'black',
        color: 'white',
        marginTop: 75,
        textAlign: 'center',
        borderRadius: 5,
        paddingTop: 30
    },
    textTitle: {
        textTransform: 'upperCase',
        fontFamily: 'Fantasy'
    },
    pokemonImage: {
        width: "170px",
        height: "170px"
    },
    pokemonInfo: {
        bottom: 60,
        position: 'absolute',
        width: "100%"
    },
    separator: {
        height: "0.01mm",
        width: "95%"
    },
    favorite: {
        height: 50,
        width: 50,
        marginTop: 15
    },
    text: {
        fontSize: 30
    }
})

class PokemonDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pokemon: null
        }
    }

    componentDidMount() {
        const { match } = this.props
        const { id } = match?.params
        axios.get(`${POKEMON_API_URL}/${id}`)
            .then(response => {
                if (response.status >= 200 && response.status <= 300) {
                    this.setState({ pokemon: response.data })
                }
            })
    }


    render() {
        const { pokemon } = this.state;
        const { classes } = this.props
        if (pokemon) {
            const { name, sprites, height, weight, types } = pokemon
            return (
                <Box>
                    <Box className={classes.pokedexContainer}>
                        <Typography className={classes.textTitle} variant="h1">{name}</Typography>
                        <img className={classes.pokemonImage} src={sprites.front_shiny} alt="pokemon" />
                        <Box className={classes.pokemonInfo}>
                            <hr className={classes.separator} />
                            <Grid container>
                                <Grid item md={1}>
                                    <Button className={classes.favorite}>
                                        <FavoriteIcon style={{ color: "white", fontSize: 50 }} />
                                    </Button>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography className={classes.text}>
                                        Name
                                        <br />
                                        {name}
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography className={classes.text}>
                                        Height
                                        <br />
                                        {height}m
                                    </Typography>
                                </Grid>
                                <Grid item md={2}>
                                    <Typography className={classes.text}>
                                        Weight
                                        <br />
                                        {weight}kg
                                    </Typography>
                                </Grid>
                                {types.map((type) => {
                                    const { name } = type.type
                                    return (
                                        <Grid item md={2}>
                                            <Typography className={classes.text}>
                                                Type
                                                <br />
                                                {name}
                                            </Typography>
                                        </Grid>
                                    )
                                })}
                            </Grid>
                        </Box>
                    </Box>
                </Box>
            )
        } else {
            return <CircularProgress />
        }
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(PokemonDetails));