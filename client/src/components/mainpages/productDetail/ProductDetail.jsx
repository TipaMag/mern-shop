import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { ProductItem } from '../utils/product_item/ProductItem';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        width: "100%",
        margin: '0 auto'
    },
    imageCard: {
        objectFit: 'contain'
    },
    contentHeader: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

export const ProductDetail = () => {
    const classes = useStyles()
    const params = useParams()
    const [detailProduct, setDetailProduct] = useState([])

    const isAuth = useSelector(state => state.auth.isAuth)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const products = useSelector(state => state.products.products)

    useEffect(() => {
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) setDetailProduct(product)
            })
        }
    }, [params.id, products])

    if (detailProduct.length === 0) return null
    return (
        <>
            <Card className={classes.root} component={Grid} container spacing={3}>
                <Grid item xs={12} sm={7}>
                    <CardMedia
                        className={classes.imageCard}
                        component="img"
                        alt={detailProduct.title}
                        height="350"
                        image={detailProduct.images.url}
                        title={detailProduct.title}
                    />
                </Grid>
                <CardContent component={Grid} item xs={12} sm={5}>
                    <Box className={classes.contentHeader}>
                        <Typography variant="h4" component="h2" color='textPrimary'>
                            {detailProduct.title}
                        </Typography>
                        <Typography variant="h6" component="span" color="textSecondary">
                            {`#id: ${detailProduct.product_id}`}
                        </Typography>
                    </Box>

                    <Typography variant="h6" color='secondary' component="p" >
                        {`₴ ${detailProduct.price}`}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p" paragraph>
                        {detailProduct.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {`Sold: ${detailProduct.sold}`}
                    </Typography>
                    <CardActions>
                        <Button variant='contained' color='primary' startIcon={<ShoppingCartIcon />}>
                            buy now
                        </Button>
                    </CardActions>
                </CardContent>
                <Grid item xs={12}>
                    <Typography variant="body1" color="textPrimary" component="p" paragraph>
                        {detailProduct.content}
                    </Typography>
                </Grid>
            </Card>

            <Box>
                <Typography variant="h5" component="h2" style={{margin: '10px 0'}}>
                    Related products
                </Typography>
                <Grid container spacing={3}>
                    {
                        products.map(product => {
                        return (product.category === detailProduct.category) ?
                            <ProductItem key={product._id}
                                isAdmin={isAdmin} 
                                isAuth={isAuth}
                                product={product}
                            />
                            : null
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}