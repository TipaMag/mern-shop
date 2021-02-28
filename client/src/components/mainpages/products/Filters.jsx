import React, { useState, useCallback } from 'react'
import { useDispatch } from 'react-redux';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { productsActions } from '../../../redux/products-reducer';


export const Filters = (props) => {
    const dispatch = useDispatch()
    const [search, setSearch] = useState('')

    const handleChangeCategory = (value) => {
        dispatch(productsActions.setFilterCategory(value))
    }
    const handleChangeSortBy = (value) => {
        dispatch(productsActions.setFilterSort(value))
    }
    const handleChangeLimit = (value) => {
        dispatch(productsActions.setLimit(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebouncedSearch = useCallback(_.debounce((value) => { // fix
        dispatch(productsActions.setFilterSearch(value))
        }, 1000)
    , [])
        

    return (
        <Grid container spacing={1} style={{marginBottom: '10px'}}>
            <Grid item xs={12} sm={12} md={6}>
                <TextField 
                    label="Search" 
                    variant="outlined"
                    fullWidth
                    margin="dense"

                    value={search}
                    onChange={e => { setSearch(e.target.value); handleDebouncedSearch(e.target.value) }}
                />
            </Grid>

            <Grid item xs={4} sm={4} md={2}>
                <TextField
                    id="category"
                    select
                    label="category"
                    value={props.category}
                    onChange={e => handleChangeCategory(e.target.value)}

                    fullWidth
                    variant="outlined"
                    margin="dense"
                >
                    <MenuItem value="all">
                        <em>All categories</em>
                    </MenuItem>
                    {props.categories?.length > 0 &&
                        props.categories.map(category => (
                            <MenuItem key={category._id} value={category.name}>
                                {category.name}
                            </MenuItem>
                        ))
                    }
                </TextField>
            </Grid>

            <Grid item xs={4} sm={4} md={2}>
                <TextField
                    id="sort-by"
                    select
                    label="Sort by: "
                    value={props.sort}
                    onChange={e => handleChangeSortBy(e.target.value)}

                    fullWidth
                    variant="outlined"
                    margin="dense"
                >
                    <MenuItem value="-createdAt">
                        <em>Newest</em>
                    </MenuItem>
                    <MenuItem value='oldest'>Oldest</MenuItem>
                    <MenuItem value='-sold'>Best sales</MenuItem>
                    <MenuItem value='-price'>Price: Hight-Low</MenuItem>
                    <MenuItem value='price'>Price: Low-Hight</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={4} sm={4} md={2}>
                <TextField 
                    id="limit"
                    select
                    label={`showing 1-${props.limit} of ${props.totalCount}`}
                    value={props.limit}
                    onChange={e => handleChangeLimit(e.target.value)}

                    fullWidth
                    variant="outlined"
                    margin="dense"
                >
                    <MenuItem value="12">
                        <em>12</em>
                    </MenuItem>
                    <MenuItem value='4'>4</MenuItem>
                    <MenuItem value='24'>24</MenuItem>
                    <MenuItem value='48'>48</MenuItem>
                </TextField>
            </Grid>
        </Grid>
    )
}