import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles({
    backButton: {
        marginBottom: '15px'
    },
    table: {
        minWidth: 650,
    }
})

export const OrderDetails = () => {
    const classes = useStyles()
    const history = useHistory()
    const [orderDetails, setOrderDetails] = useState([])
    const userHistory = useSelector(state => state.user.history)

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            userHistory.forEach(item => {
                if (item._id === params.id) {
                    setOrderDetails(item)
                }
            })
        }
    }, [userHistory, params.id])

    if (orderDetails.length === 0) return null
    return (
        <>
            <Button
                variant="outlined"
                color="default"
                className={classes.backButton}
                startIcon={<ArrowBackIcon />}
                onClick={() => history.push('/history')}
            >
                back
            </Button>

            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table className={classes.table} aria-label="ordered detils table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'blue' }}>Name</TableCell>
                            <TableCell style={{ color: 'blue' }}>Address</TableCell>
                            <TableCell style={{ color: 'blue' }}>Postal code</TableCell>
                            <TableCell style={{ color: 'blue' }}>Country code</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{orderDetails.address.recipient_name}</TableCell>
                            <TableCell>{orderDetails.address.line1 + ' - ' + orderDetails.address.city}</TableCell>
                            <TableCell>{orderDetails.address.postal_code}</TableCell>
                            <TableCell>{orderDetails.address.country_code}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
                <Table className={classes.table} aria-label="ordered detils table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'blue' }}></TableCell>
                            <TableCell style={{ color: 'blue' }}>Products</TableCell>
                            <TableCell style={{ color: 'blue' }}>Quantity</TableCell>
                            <TableCell style={{ color: 'blue' }}>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orderDetails.cart.map(item => (
                            <TableRow key={item.product_id}>
                                <TableCell>
                                    <img src={item.images.url} alt="" width='70' height='50' />
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>₴ {item.price * item.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}