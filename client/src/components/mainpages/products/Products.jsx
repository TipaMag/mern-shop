import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../../redux/products-reducer';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ProductItem } from '../utils/product_item/ProductItem';


const useStyles = makeStyles(() => ({
    productsContainer: {
        flexGrow: 1,
    }
}))

export const Products = () => {
    const classes = useStyles();
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className={classes.producsContainer}>
            <Grid container spacing={3}>
                {products.map(product =>
                    <ProductItem key={product._id} {...product}/>
                )}
            </Grid>
        </div>
    )
}