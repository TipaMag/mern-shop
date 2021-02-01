import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, getCategories, removeCategory, updateCategory } from '../../../redux/categories-reducer'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import ClearIcon from '@material-ui/icons/Clear';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    editBtn: {
        marginRight: 10
    }
})

export const Categories = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)

    const [category, setCategory] = useState('')
    const [id, setID] = useState('')
    const [onEdit, setOnEdit] = useState(false)

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    const addNewCategory = () => {
        dispatch(addCategory(category))
        setCategory('')
    }

    const deleteCategory = (id) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            dispatch(removeCategory(id))
        }
    }

    // edit category
    const editCategory = (id, name) => {
        setOnEdit(true)
        setCategory(name)
        setID(id)
    }
    const successEditing = () => {
        dispatch(updateCategory(id, category))
        setOnEdit(false)
        setCategory('')
        setID('')
    }
    const cancelEditing = () => {
        setOnEdit(false)
        setCategory('')
        setID('')
    }


    if (categories.length === 0) return null
    return (
        <>
            <Box style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                <TextField style={{ minWidth: '250px', marginRight: '10px' }}
                    label={onEdit ? 'Edit' : 'New category'}
                    variant="outlined"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                {onEdit ?
                    <>
                        <IconButton onClick={successEditing} color="primary" aria-label="success">
                            <DoneIcon />
                        </IconButton>
                        <IconButton onClick={cancelEditing} color="secondary" aria-label="cancel">
                            <ClearIcon />
                        </IconButton>
                    </> :
                    <IconButton onClick={addNewCategory} color="primary" aria-label="add new category">
                        <AddCircleOutlineOutlinedIcon />
                    </IconButton>
                }

            </Box>

            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="category table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'blue' }}>
                                Category
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category._id} >
                                <TableCell>{category.name}</TableCell>
                                <TableCell align='right'>
                                    <IconButton
                                        aria-label="edit"
                                        size="small"
                                        className={classes.editBtn}
                                        onClick={() => editCategory(category._id, category.name)}
                                    >
                                        <EditIcon color="primary" />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        size="small"
                                        onClick={() => deleteCategory(category._id)}
                                    >
                                        <DeleteIcon color='secondary' />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
