import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { addingToCart } from '../../../../redux/user-reducer';
import { makeStyles } from '@material-ui/core/styles';

import { Checkbox, Grid, Typography, Card, CardActionArea, CardContent, CardMedia, Button, CardActions } from '@material-ui/core';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';


const useStyles = makeStyles({
    cardMedia: {
        padding: '10px',
        boxSizing: 'border-box',
        objectFit: 'contain',
    },
});

export const ProductItem = ({ isAdmin, isAuth, product, handleProductDelete }) => {
    const dispatch = useDispatch()
    const classes = useStyles()

    const onAddingToCart = () => {
        dispatch(addingToCart(product))
    }

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card>
                {
                    isAdmin && <Checkbox checked={product.checked} inputProps={{ 'aria-label': 'primary checkbox' }} />
                }
                
                <CardActionArea component={RouterLink} to={`/detail/${product._id}`}>
                    <CardMedia
                        className={classes.cardMedia}
                        component="img"
                        alt={product.title}
                        height="250"
                        image={product.images.url}
                        title={product.title}
                    />
                </CardActionArea>

                <CardContent>
                    <Typography variant="h5" component="h2" noWrap>
                        {product.title}
                    </Typography>
                    <Typography variant="h6" color='secondary' component="p">
                        {`₴ ${product.price}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" noWrap>
                        {product.description}
                    </Typography>
                </CardContent>

                <CardActions style={{ justifyContent: 'space-around' }}>
                    {
                        isAdmin ?
                            <>
                                <Button variant='contained' fullWidth color='inherit' startIcon={<DeleteIcon />} 
                                    onClick={e => handleProductDelete(product._id, product.images.public_id)}
                                >
                                    delete
                                </Button>
                                <Button variant='outlined' fullWidth color="primary" endIcon={<EditIcon />}
                                    component={RouterLink} to={`/edit_product/${product._id}`}>
                                    edit
                                </Button>
                            </> :
                            <>
                                <Button variant='contained' fullWidth color='inherit' startIcon={<ShoppingCartIcon />}
                                    onClick={onAddingToCart}>
                                    buy
                                </Button>
                                <Button variant='outlined' fullWidth color="primary" endIcon={<ArrowForwardIcon />}
                                    component={RouterLink} to={`/detail/${product._id}`}>
                                    view
                                </Button>
                            </>
                    }
                </CardActions>
            </Card>
        </Grid>
    );
}
