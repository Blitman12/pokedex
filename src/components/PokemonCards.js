import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardMedia, Grid, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        margin: 'auto',
        width: 130,
        height: 130
    },
    card: {
        cursor: 'pointer',
        backgroundColor: 'black',
        color: 'white',
        "&:hover": {
            backgroundColor: 'rgb(90, 90, 90)'
        }
    },
    cardContent: {
        textAlign: 'center'
    },
    link: {
        textDecoration: 'none'
    }
}))

export default function PokemonCards(props) {
    const classes = useStyles()
    const { pokemon, image } = props
    const { id, name } = pokemon

    return (
        <Grid item xs={12} sm={2}>
            <Link to={`/pokemon/${id}`} className={classes.link}>
                <Card className={classes.card}>
                    <CardMedia className={classes.cardMedia} image={image}></CardMedia>
                    <CardContent className={classes.cardContent}>
                        <Typography>
                            {name}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        </Grid>
    )
}
