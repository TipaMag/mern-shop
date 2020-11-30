import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Grid } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        // maxWidth: 345,
    },
});

export const ProductItem = (props) => {
    const classes = useStyles()

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.root}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={props.title}
                        height="200"
                        image={props.images.url}
                        title={props.title}
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {props.title}
                        </Typography>
                        <Typography variant="h6" color='secondary' component="p">
                            {props.price}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {props.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{ justifyContent: 'space-around' }}>
                    <Button variant='contained' fullWidth color='inherit' startIcon={<ShoppingCartIcon />}>
                        buy
                    </Button>
                    <Button 
                        variant='contained' 
                        fullWidth 
                        color="primary" 
                        endIcon={<ArrowForwardIcon />}
                        component={RouterLink} to={`/detail/${props._id}`}
                    >
                        view
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
