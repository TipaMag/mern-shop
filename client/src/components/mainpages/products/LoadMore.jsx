import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { getMoreProducts } from '../../../redux/products-reducer';

export const LoadMore = () => {
    const dispatch = useDispatch()
    const { totalCount } = useSelector(state => state.products.products)
    const { page, limit } = useSelector(state => state.products.filters)

    const onLoadMore = () => {
        dispatch(getMoreProducts(page + 1))
    }

    return (
        <Box width="100%" display="flex" justifyContent="center" m={3}>
            {totalCount <= (page * limit) ? 
                '' : 
                <Button variant="outlined" color="primary" onClick={onLoadMore}>
                    load more
                </Button>
            }
        </Box>
    )
}