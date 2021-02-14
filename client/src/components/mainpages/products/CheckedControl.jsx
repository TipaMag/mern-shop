import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { productsActions, deleteSomeProducts } from '../../../redux/products-reducer';

import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
    formControl: {
        width: '100%',
        margin: '15px 0'
    },
    formGroup: {
        justifyContent: 'flex-end'
    },
    button: {
        marginLeft: '20px'
    }
}))

export const CheckedControl = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [isCheckedAll, setCheckedAll] = useState(false)

    const handleCheckAll = () => {
        dispatch(productsActions.setCheckAll(!isCheckedAll))
        setCheckedAll(!isCheckedAll)
    }
    const handleSelectedProductDelete = () => {
        let result = window.confirm('Are you sure you want to delete all this products?')
        if(result) {
            dispatch(deleteSomeProducts())
        }
    }

    return (
        <FormControl component="fieldset" className={classes.formControl}>
            <FormGroup aria-label="position" row className={classes.formGroup}>
                <FormControlLabel
                    value="start"
                    control={<Checkbox checked={isCheckedAll} onChange={handleCheckAll} />}
                    label="Select all"
                    labelPlacement="start"
                />
                <Button variant="outlined" color="primary" className={classes.button} onClick={handleSelectedProductDelete}>
                    delete selected
                </Button>
            </FormGroup>
        </FormControl>
    )
}