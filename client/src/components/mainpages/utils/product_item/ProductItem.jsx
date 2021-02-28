import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Checkbox, Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Button, CardActions, Box } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const useStyles = makeStyles({
    card: props => ({
        backgroundColor: props ? '#b916161c' : ''
    }),
    cardMedia: {
        height: '200px',
        padding: '10px',
        boxSizing: 'border-box',
        objectFit: 'contain',
    },
    cardContent: {
        padding: '0 10px'
    },
    cardActions: {
        justifyContent: 'space-around'
    }
});

export const ProductItem = ({ mainPage, isAdmin, product, handleAddingToCart, handleProductDelete, handleCheck }) => {
    const classes = useStyles(product.checked)

    const onScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <Grid item xs={6} sm={4} md={3}>
            <Card className={classes.card} elevation={3}>
                <CardActionArea component={RouterLink} to={`/detail/${product._id}`}
                    onClick={onScrollTop}
                >
                    <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        alt={product.title}
                        image={product.images.url}
                        title={product.title}
                    />
                </CardActionArea>

                <CardContent className={classes.cardContent}>
                    <Typography variant="h6" component="h2" noWrap>
                        {product.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" noWrap>
                        {product.description}
                    </Typography>
                    <Typography variant="h6" color='secondary' component="p">
                        {`₴ ${product.price}`}
                    </Typography>
                </CardContent>

                <CardActions className={classes.cardActions}>
                    {
                        isAdmin ?
                            <>
                                <Box style={{marginRight: 'auto'}}>
                                    <IconButton aria-label="delete" onClick={e => handleProductDelete(product._id, product.images.public_id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="edit" component={RouterLink} to={`/edit_product/${product._id}`}>
                                        <EditIcon />
                                    </IconButton>
                                </Box>
                                {mainPage &&
                                    <Checkbox
                                        className={classes.checkBox}
                                        checked={product.checked}
                                        onChange={() => handleCheck(product._id)}
                                    />
                                }
                            </> :
                            <>
                                <Button variant='contained' fullWidth color='inherit' startIcon={<ShoppingCartIcon />}
                                    onClick={() => handleAddingToCart(product)}>
                                    buy
                                </Button>
                                <Button variant='outlined' fullWidth color="primary" endIcon={<ArrowForwardIcon />}
                                    component={RouterLink} to={`/detail/${product._id}`}
                                    onClick={onScrollTop}
                                >
                                    view
                                </Button>
                            </>
                    }
                </CardActions>
            </Card>
        </Grid>
    );
}
