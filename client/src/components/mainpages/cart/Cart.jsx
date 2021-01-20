import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Grid, IconButton } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import DeleteIcon from '@material-ui/icons/Delete';
import { changeQuantity, clearCart, removeFromCart } from '../../../redux/user-reducer';

import { PayPalBtn } from './PayPal';

import { paymentsAPI } from '../../../api/payment-api';

const useStyles = makeStyles({
    cartContainer: {
        width: '100%',
        margin: 0,
    },
    cartItem: {
        marginBottom: '10px',
        position: 'relative'
    },
    imageCard: {
        objectFit: 'contain'
    },
    emptyCartText: {
        padiingTop: '50px'
    },
    deleteBtn: {
        position: 'absolute',
        right: 0,
        top: 0
    }
})

export const Cart = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [total, setTotal] = useState(0)
    const cart = useSelector(state => state.user.cart)
    const token = useSelector(state => state.auth.token)

    const handleDelete = (product_id) => {
        dispatch(removeFromCart(product_id))
    }

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    const onChangeQuantity = (_id, value) => {
        dispatch(changeQuantity(_id, value))
    }

    const tranSuccess = async (payment) => {
        const {paymentID, address} = payment

        const result = await paymentsAPI.createPayment(token, cart, paymentID, address)
        console.log(result.data.msg)
        dispatch(clearCart())
    }

    if (cart.length === 0) {
        return (
            <Typography className={classes.emptyCartText} variant="h4" color="textSecondary" component="p" align="center">
                Cart is empty
            </Typography>
        )
    }
    return (
        <Grid className={classes.cartContainer} container spacing={3}>
            {
                cart.map(item => (
                    <Card className={classes.cartItem} key={item._id} component={Grid} item container>
                        <Grid item xs={12} sm={5}>
                            <CardMedia
                                className={classes.imageCard}
                                component="img"
                                alt={item.title}
                                height="200"
                                image={item.images.url}
                                title={item.title}
                            />
                        </Grid>

                        <CardContent component={Grid} item xs={12} sm={7}>
                            {/* <Box className={classes.contentHeader}> */}
                                <Typography variant="h5" component="h2" color='textPrimary'>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" component="span" color="textSecondary">
                                    {`id: ${item.product_id}`}
                                </Typography>
                            {/* </Box> */}

                            <Typography variant="h6" color='secondary' component="p" >
                                {`₴ ${item.price * item.quantity}`}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p" paragraph>
                                {item.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {`Sold: ${item.sold}`}
                            </Typography>
                            <CardActions style={{justifyContent: 'space-between'}}>
                                {/* <Button variant='contained' color='primary' startIcon={<ShoppingCartIcon />}>
                                    buy now
                                </Button> */}

                                <ButtonGroup color="primary" aria-label="outlined primary button group">
                                    <Button onClick={() => onChangeQuantity(item._id, 'decrease')}>-</Button>
                                    <Button disabled>
                                        {item.quantity}
                                    </Button>
                                    <Button onClick={() => onChangeQuantity(item._id, 'increase')}>+</Button>
                                </ButtonGroup>
                            </CardActions>
                        </CardContent>

                        <IconButton aria-label="delete" className={classes.deleteBtn} onClick={() => handleDelete(item.product_id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Card>
                ))
            }
            <Typography component='div' style={{display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px'}}>
                <Typography variant='h5' color='secondary'>
                    Total: ₴ {total}
                </Typography>
                <PayPalBtn total={total} tranSuccess={tranSuccess}/>
            </Typography>
        </Grid>
    )
}