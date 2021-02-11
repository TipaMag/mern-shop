import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 200,
    },
}));

const validationSchema = yup.object({
    product_id: yup
        .string('Enter product_id')
        .required('product_id is required'),
    title: yup
        .string('Enter title')
        .min(3, 'Title should be of minimum 3 characters length')
        .required('Title is required'),
    description: yup
        .string('Enter description')
        .required('Description is required'),
    content: yup
        .string('Enter content')
        .max(1000, 'Content should be of maximum 1000 characters length')
        .required('Content is required'),
    price: yup
        .number('Enter price')
        .min(1)
        .required('Price is required'),
    category: yup
        .string('Select category')
        .min(2, 'Select category')
        .required('Select category')
})

export const CreateProductForm = ({initialPropValues, categories, handleFormSubmit, onEdit}) => {
    const classes = useStyles()

    const formik = useFormik({
        initialValues: initialPropValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            handleFormSubmit(values)
        },
        enableReinitialize: true
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="product_id"
                    name="product_id"
                    label="product_id"
                    variant="outlined"
                    margin="normal"
                    disabled={onEdit}

                    value={formik.values.product_id}
                    onChange={formik.handleChange}
                    error={formik.touched.product_id && Boolean(formik.errors.product_id)}
                    helperText={formik.touched.product_id && formik.errors.product_id}
                />
                <TextField
                    fullWidth
                    id="title"
                    name="title"
                    label="title"
                    variant="outlined"
                    margin="normal"

                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth
                    id="description"
                    name="description"
                    label="description"
                    multiline
                    rows={2}
                    variant="outlined"
                    margin="normal"

                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField
                    fullWidth
                    id="content"
                    name="content"
                    label="content"
                    multiline
                    rows={6}
                    variant="outlined"
                    margin="normal"

                    value={formik.values.content}
                    onChange={formik.handleChange}
                    error={formik.touched.content && Boolean(formik.errors.content)}
                    helperText={formik.touched.content && formik.errors.content}
                />
                <TextField
                    fullWidth
                    type="number"
                    id="price"
                    name="price"
                    label="price"
                    variant="outlined"
                    margin="normal"

                    value={formik.values.price}
                    onChange={formik.handleChange}
                    error={formik.touched.price && Boolean(formik.errors.price)}
                    helperText={formik.touched.price && formik.errors.price}
                />

                <FormControl 
                    className={classes.formControl} 
                    variant="filled"
                    error={formik.touched.category && Boolean(formik.errors.category)}
                >
                    <InputLabel id="category">Select a category</InputLabel>
                    <Select
                        labelId="category"
                        id="category"
                        name="category"
                        value={formik.values.category}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
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

                <Button color="primary" variant="contained" fullWidth type="submit">
                    {onEdit ? 'update' : 'create'}
                </Button>
            </form>
        </div>
    );
};