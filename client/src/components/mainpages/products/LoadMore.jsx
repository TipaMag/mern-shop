import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { getMoreProducts } from '../../../redux/products-reducer';

export const LoadMore = () => {
    const dispatch = useDispatch()
    const result = useSelector(state => state.products.products.result)
    const page = useSelector(state => state.products.filters.page)
    const limit = useSelector(state => state.products.filters.limit)

    const onLoadMore = () => {
        dispatch(getMoreProducts())
    }

    return (
        <Box width="100%" display="flex" justifyContent="center" m={3}>
            {result < (page * limit) ? 
                '' : 
                <Button variant="outlined" color="primary" onClick={onLoadMore}>
                    load more
                </Button>
            }
        </Box>
    )
}