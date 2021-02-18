import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { getCategories } from '../../../redux/categories-reducer';
import { getProducts, productsActions } from '../../../redux/products-reducer';


export const Filters = () => {
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const { category, sort, search } = useSelector(state => state.products.filters)

    const [localSearch, setLocalSearch] = useState('')
    
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch, category, sort, search])

    useEffect(() => {
        if(categories.length === 0) {
            dispatch(getCategories())
        }
    }, [categories.length, dispatch])

    const handleChangeCategory = (value) => {
        dispatch(productsActions.setFilterCategory(value))
    }
    const handleChangeSortBy = (value) => {
        dispatch(productsActions.setFilterSort(value))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebouncedSearch = useCallback(_.debounce((value) => { // fix
        dispatch(productsActions.setFilterSearch(value))
        }, 1000)
    , [])
        

    return (
        <Grid container spacing={2} style={{marginBottom: '10px'}}>
            <Grid item xs={12} sm={6}>
                <TextField label="Search" variant="outlined" style={{width: '100%'}}
                    value={localSearch}
                    onChange={e => { setLocalSearch(e.target.value); handleDebouncedSearch(e.target.value) }}
                />
            </Grid>

            <Grid item xs={6} sm={3}>
                <FormControl variant="outlined" style={{width: '100%'}}>
                    <InputLabel id="category">Category:</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        label="category"
                        value={category}
                        onChange={e => handleChangeCategory(e.target.value)}
                        defaultValue={category}
                    >
                        <MenuItem value="all">
                            <em>All categories</em>
                        </MenuItem>
                        {categories?.length > 0 &&
                            categories.map(category => (
                                <MenuItem key={category._id} value={category.name}>
                                    {category.name}
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>
            </Grid>

            <Grid item xs={6} sm={3}>
                <FormControl variant="outlined" style={{width: '100%'}}>
                    <InputLabel id="sort-by">Sort by:</InputLabel>
                    <Select
                        labelId="sort-by"
                        id="sort-by"
                        label="sort-by"
                        value={sort}
                        onChange={e => handleChangeSortBy(e.target.value)}
                        defaultValue={sort}
                    >
                        <MenuItem value="-createdAt">
                            <em>Newest</em>
                        </MenuItem>
                        <MenuItem value='oldest'>Oldest</MenuItem>
                        <MenuItem value='-sold'>Best sales</MenuItem>
                        <MenuItem value='-price'>Price: Hight-Low</MenuItem>
                        <MenuItem value='price'>Price: Low-Hight</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}