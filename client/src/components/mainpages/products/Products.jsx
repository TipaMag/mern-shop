import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts, productsActions } from '../../../redux/products-reducer';
import { addingToCart } from '../../../redux/user-reducer';

import { ProductItem } from '../utils/product_item/ProductItem';
import { CheckedControl } from './CheckedControl';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Filters } from './Filters';


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

    const handleAddingToCart = (product) => {
        dispatch(addingToCart(product))
    }
    const handleProductDelete = (id, imagePublicID) => {
        if (isAdmin) {
            let result = window.confirm('Are you sure you want to delete this product?')
            if(result) {
                dispatch(deleteProduct(id, imagePublicID))
            }
        }
    }
    const handleCheck = (id) => {
        dispatch(productsActions.setCheck(id))
    }

    if (!products) return null
    return (
        <div className={classes.producsContainer}>
            <Filters/>
            
            {isAdmin && <CheckedControl isAdmin={isAdmin}/>}

            <Grid container spacing={3}>
                {products.map((product) =>
                    <ProductItem key={product._id}
                        isAdmin={isAdmin}
                        isAuth={isAuth}
                        product={product}
                        handleAddingToCart={handleAddingToCart}
                        handleProductDelete={handleProductDelete}
                        handleCheck={handleCheck}
                    />
                )}
            </Grid>
        </div>
    )
}