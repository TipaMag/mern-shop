import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    }
})

export const OrderDetails = () => {
    const classes = useStyles()
    const [orderDetails, setOrderDetails] = useState([])
    const history = useSelector(state => state.user.history)

    const params = useParams()

    useEffect(() => {
        if (params.id) {
            history.forEach(item => {
                if (item._id === params.id) {
                    setOrderDetails(item)
                }
            })
        }
    }, [history, params.id])

    if (orderDetails.length === 0) return null
    return (
        <>
            <TableContainer component={Paper} style={{marginBottom: '20px' }}>
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

            <TableContainer component={Paper} style={{marginBottom: '20px' }}>
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