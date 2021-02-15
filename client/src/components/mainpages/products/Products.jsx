import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, productsActions } from '../../../redux/products-reducer';
import { addingToCart } from '../../../redux/user-reducer';

import { ProductItem } from '../utils/product_item/ProductItem';
import { Filters } from './Filters';
import { CheckedControl } from './CheckedControl';

import Grid from '@material-ui/core/Grid';
import { LoadMore } from './LoadMore';


export const Products = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const products = useSelector(state => state.products.products.products)

    const handleAddingToCart = (product) => {
        dispatch(addingToCart(product))
    }
    const handleProductDelete = (id, imagePublicID) => {
        if (isAdmin) {
            let result = window.confirm('Are you sure you want to delete this product?')
            if (result) {
                dispatch(deleteProduct(id, imagePublicID))
            }
        }
    }
    const handleCheck = (id) => {
        dispatch(productsActions.setCheck(id))
    }

    return (
        <Grid container>
            <Filters />
            {isAdmin && <CheckedControl isAdmin={isAdmin} />}
            <Grid container spacing={3}>
                {products &&
                    products.map((product) =>
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
            {products && <LoadMore/>}
        </Grid>
    )
}