import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams, Link as RouterLink } from 'react-router-dom'

import { addingToCart } from '../../../redux/user-reducer';
import { getProducts, deleteProduct } from '../../../redux/products-reducer';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { ProductItem } from '../utils/product_item/ProductItem';


const useStyles = makeStyles({
    card: {
        display: 'flex',
        width: "100%",
        margin: '0 auto'
    },
    imageCard: {
        objectFit: 'contain',
        height: "300px",
    }
});

export const ProductDetail = () => {
    const dispatch = useDispatch()
    const classes = useStyles()
    const params = useParams()
    const history = useHistory()
    const [detailProduct, setDetailProduct] = useState([])

    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const products = useSelector(state => state.products.products.products)

    useEffect(() => {
        if(!products) {
            dispatch(getProducts())
        }
        if (params.id && products) {
            products.forEach(product => {
                if (product._id === params.id) {
                    setDetailProduct(product)
                } 
            })
        }
    }, [params.id, products, dispatch])

    const onAddingToCart = () => {
        dispatch(addingToCart(detailProduct))
    }
    const handleProductDelete = (id, imagePublicID) => {
        if (isAdmin) {
            let result = window.confirm('Are you sure you want to delete this product?')
            if(result) {
                dispatch(deleteProduct(id, imagePublicID))
                history.push('/')
            }
        }
    }

    if (detailProduct?.length === 0) return null
    return (
        <>
            <Card className={classes.card} component={Grid} container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <CardMedia
                        className={classes.imageCard}
                        component="img"
                        alt={detailProduct.title}
                        image={detailProduct.images.url}
                        title={detailProduct.title}
                    />
                </Grid>
                <CardContent item xs={12} sm={6} component={Grid}>
                    <Typography variant="h4" component="h2" color='textPrimary'>
                        {detailProduct.title}
                    </Typography>
                    <Typography variant="h6" color='secondary' component="p" >
                        {`₴ ${detailProduct.price}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" paragraph>
                        {detailProduct.description}
                    </Typography>
                    <Typography variant="body2" component="span" color="textSecondary">
                            {`#id: ${detailProduct.product_id}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Sold: ${detailProduct.sold}`}
                    </Typography>

                    {isAdmin ?
                        <CardActions>
                            <Button variant='contained' fullWidth color='inherit' startIcon={<DeleteIcon />} 
                                    onClick={e => handleProductDelete(detailProduct._id, detailProduct.images.public_id)}>
                                delete
                            </Button>
                            <Button variant='outlined' fullWidth color="primary" endIcon={<EditIcon />}
                                component={RouterLink} to={`/edit_product/${detailProduct._id}`}>
                                edit
                            </Button>
                        </CardActions>
                        : 
                        <CardActions>
                            <Button variant='contained' color='primary' startIcon={<ShoppingCartIcon />}
                                onClick={onAddingToCart}>
                                buy now
                            </Button>
                        </CardActions>
                    }
                </CardContent>
                <Grid item xs={12}>
                    <Typography variant="body1" color="textPrimary" component="p" paragraph>
                        {detailProduct.content}
                    </Typography>
                </Grid>
            </Card>

            <Box>
                <Typography variant="h5" component="h2" style={{margin: '10px 0'}}>
                    Related products
                </Typography>
                <Grid container spacing={2}>
                    {
                        products.map(product => {
                        return (product.category === detailProduct.category && product._id !== detailProduct._id) ?
                            <ProductItem key={product._id}
                                isAdmin={isAdmin} 
                                isAuth={isAuth}
                                product={product}
                                handleProductDelete={handleProductDelete}
                            />
                            : null
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}