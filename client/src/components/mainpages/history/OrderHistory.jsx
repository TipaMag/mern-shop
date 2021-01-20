import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserHistory } from '../../../redux/user-reducer';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Link as RouterLink } from 'react-router-dom'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

export const OrderHistory = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useSelector(state => state.user.history)

    useEffect(() => {
        dispatch(getUserHistory())
    }, [dispatch])
    
    return (
        <>
            <Typography variant="h6" align='center' style={{ marginBottom: '20px' }}>
                You have {history.length} ordered
            </Typography>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="ordered table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ color: 'blue' }}>Payment ID</TableCell>
                            <TableCell style={{ color: 'blue' }}>Date of Purchased</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {history.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.paymentID}</TableCell>
                                <TableCell>{new Date(item.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell>
                                    <RouterLink to={`/history/${item._id}`}>View</RouterLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}