import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import { CreateProductForm } from './CreateProductForm';
import { useDispatch, useSelector } from 'react-redux';

import { getCategories } from '../../../redux/categories-reducer';
import { createProducts, updateProducts } from '../../../redux/products-reducer';
import { BackdropLoader } from '../../common/BackdropLoader';
import { imageUploadAPI } from '../../../api/products-api';
import { notify } from '../utils/notify/Notify';


const useStyles = makeStyles((theme) => ({
    uploadContainer: {
        display: 'flex',
        alignContent: 'cnter',
        justifyContent: 'center'
    },
    imageContainer: {
        padding: '50px 10px 10px',
        position: 'relative',
        width: '500px',
        height: '350px',
    },
    previewImage: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    imageFileLabel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: '#eff8ff'
        }
    },
    imageFileInput: {
        position: 'absolute',
        outline: 0,
        opacity: 0,
        pointerEvents: 'none',
        userSelect: 'none'
    },
    clearImgBtn: {
        position: 'absolute',
        top: 3,
        right: 3,
    }
}));

let initialProduct = {
    product_id: '',
    title: '',
    description: '',
    content: '',
    price: 0,
    id: '',
    category: ''
}


export const CreateProduct = () => {
    const classes = useStyles()
    const param = useParams()
    const dispatch = useDispatch()

    const token = useSelector(state => state.auth.token)
    const categories = useSelector(state => state.categories.categories)
    const products = useSelector(state => state.products.products.products)

    const [product, setProduct] = useState(initialProduct)
    const [onEdit, setOnEdit] = useState(false)

    const [images, setImage] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleFormSubmit = async (formValues) => {
        let newProduct = { ...formValues, images }
        if (images && !param.id) {
            const res = await dispatch(createProducts(newProduct))
            if (res) { //fix
                setImage(false)
            } 
        }
        if (images && param.id) {
            dispatch(updateProducts(param.id, newProduct))
        }
    }
    const handleUploadImage = async (e) => {
        if (e.target.files[0]) {
            setLoading(true)

            let formData = new FormData()
            formData.append('file', e.target.files[0])

            const res = await imageUploadAPI.uploadImage(token, formData)
            if (res.status === 200) {
                setImage(res.data)
            } else {
                notify(res.data.msg, res.status)
            }

            setLoading(false)
        }
    }
    const handleDeleteImage = async () => {
        setLoading(true)

        const res = await imageUploadAPI.deleteImage(token, images.public_id)
        if (res.status === 200) {
            setImage(false)
        } else {
            notify(res.data.msg, res.status)
        }

        setLoading(false)
    }

    useEffect(() => {
        if (param.id) {
            products.forEach(product => {
                if (product._id === param.id) {
                    setOnEdit(true)
                    setProduct(product)
                    setImage(product.images)
                }
            })
        }
    }, [param.id, products])

    useEffect(() => {
        if(categories.length === 0)
        dispatch(getCategories())
    }, [categories.length, dispatch])

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6} className={classes.uploadContainer}>
                <Paper className={classes.imageContainer}>
                    {loading ? <BackdropLoader />
                        : <>
                            {images ?
                                <>
                                    <img className={classes.previewImage} src={images.url} accept="image/*" alt="preview img" />
                                    <IconButton className={classes.clearImgBtn} onClick={handleDeleteImage} color="secondary" aria-label="clear image">
                                        <CancelOutlinedIcon />
                                    </IconButton>
                                </>
                                :
                                <label className={classes.imageFileLabel}>
                                    <input className={classes.imageFileInput} type="file" onChange={handleUploadImage} />
                                    <AddCircleOutlineIcon style={{ fontSize: '5rem' }} color='primary' />
                                </label>
                            }
                        </>
                    }
                </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
                <CreateProductForm
                    initialPropValues={product}
                    categories={categories}
                    handleFormSubmit={handleFormSubmit}
                    onEdit={onEdit}
                />
            </Grid>
        </Grid>
    )
}