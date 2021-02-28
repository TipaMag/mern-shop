import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getMoreProducts, getProducts, productsActions } from '../../../redux/products-reducer';
import { addingToCart } from '../../../redux/user-reducer';

import { ProductItem } from '../utils/product_item/ProductItem';
import { Filters } from './Filters';
import { CheckedControl } from './CheckedControl';

import Grid from '@material-ui/core/Grid';
// import { LoadMore } from './LoadMore';
import { getCategories } from '../../../redux/categories-reducer';
import { BackdropLoader } from '../../common/BackdropLoader';


export const Products = () => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const products = useSelector(state => state.products.products.products)
    const isFetching = useSelector(state => state.products.isFetching)

    const { totalCount } = useSelector(state => state.products.products)

    const categories = useSelector(state => state.categories.categories)
    const { page, limit, category, sort, search } = useSelector(state => state.products.filters)

    useEffect(() => {
        const handleScroll = () => {
            if (document.documentElement.clientHeight + window.pageYOffset !== document.body.scrollHeight) return
            if(totalCount > (page * limit)) {
                const loadMore = () => {
                    dispatch(getMoreProducts(page + 1))
                }
                loadMore()
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [dispatch, limit, page, totalCount]);

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch, limit, category, sort, search])
    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories())
        }
    }, [categories.length, dispatch])

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
        <>
            {isFetching && <BackdropLoader />}
            <Grid container>
                <Filters
                    totalCount={totalCount}
                    limit={limit}
                    categories={categories}
                    category={category} //filter
                    sort={sort}
                />
                {isAdmin && <CheckedControl />}
                <Grid container spacing={2}>
                    {products && products.map((product) =>
                        <ProductItem key={product._id}
                            mainPage
                            isAdmin={isAdmin}
                            isAuth={isAuth}
                            product={product}
                            handleAddingToCart={handleAddingToCart}
                            handleProductDelete={handleProductDelete}
                            handleCheck={handleCheck}
                        />
                    )}
                </Grid>
                {/* {products && <LoadMore />} */}
            </Grid>
        </>

    )
}