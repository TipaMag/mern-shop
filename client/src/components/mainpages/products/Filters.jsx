import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';


import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { getCategories } from '../../../redux/categories-reducer';
import {getProducts, productsActions } from '../../../redux/products-reducer';


const useStyles = makeStyles(() => ({
    filtersContainer: {
        display: 'flex',
        marginBottom: '20px'
    },
    filterSelect: {
        minWidth: '150px'
    },
    searchField: {
        flexGrow: 1,
        margin: '0 20px'
    },
    sortSelect: {
        minWidth: '170px'
    }
}))

export const Filters = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const products = useSelector(state => state.products.products)
    const filters = useSelector(state => state.products.filters)
    
    const [search, setSearch] = useState('')

    const handleChangeCategory = (value) => {
        dispatch(productsActions.setFilterCategory(value))
    }
    const handleChangeSortBy = (value) => {
        dispatch(productsActions.setFilterSort(value))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleDebouncedSearch = useCallback( _.debounce((value) => { // fix
            dispatch(productsActions.setFilterSearch(value))
        }, 1000)
    , [])


    useEffect(() => {
        if(products.length > 0) {
            dispatch(getProducts())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, filters])

    useEffect(() => {
        if(categories.length === 0) {
            dispatch(getCategories())
        }
    }, [categories.length, dispatch])

    return (
        <div className={classes.filtersContainer}>
            <FormControl variant="outlined" className={classes.filterSelect}>
                <InputLabel id="category">Category:</InputLabel>
                <Select
                    labelId="category"
                    id="category"
                    label="category"
                    value={filters.category}
                    onChange={e => handleChangeCategory(e.target.value)}
                    defaultValue={filters.category}
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

            <TextField label="Search" variant="outlined" className={classes.searchField}
                value={search}
                onChange={e =>{ setSearch(e.target.value); handleDebouncedSearch(e.target.value) } }
            />

            <FormControl variant="outlined" className={classes.sortSelect}>
                <InputLabel id="sort-by">Sort by:</InputLabel>
                <Select
                    labelId="sort-by"
                    id="sort-by"
                    label="sort-by"
                    value={filters.sort}
                    onChange={e => handleChangeSortBy(e.target.value)}
                    defaultValue={filters.sort}
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
        </div>
    )
}