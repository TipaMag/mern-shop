import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProducts, getProducts } from '../../../redux/products-reducer';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { ProductItem } from '../utils/product_item/ProductItem';


const useStyles = makeStyles(() => ({
    productsContainer: {
        flexGrow: 1,
    }
}))

export const Products = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    const handleProductDelete = (id, imagePublicID) => {
        if (isAdmin) {
            let result = window.confirm('Are you sure you want to delete this product?')
            if(result) {
                dispatch(deleteProducts(id, imagePublicID))
            }
        }
    }

    if (!products) return null
    return (
        <div className={classes.producsContainer}>
            <Grid container spacing={3}>
                {products.map(product =>
                    <ProductItem key={product._id}
                        isAdmin={isAdmin}
                        isAuth={isAuth}
                        product={product}
                        handleProductDelete={handleProductDelete}
                    />
                )}
            </Grid>
        </div>
    )
}