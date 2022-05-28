import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../common/Title';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    seeMore: {
        marginTop: theme.spacing(3),
    }
}));

export default function OrdersTable({orders, needShowFullList = false}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Title>{needShowFullList ? 'Orders' : 'Recent Orders'}</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell align="right">Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.slice(0, needShowFullList ? orders.length : 5).map((row) => (
                        <TableRow key={row._id}>
                            <TableCell>{new Date(row.date).toDateString()}</TableCell>
                            <TableCell>{`${row.address.user.firstName} ${row.address.user.secondName}`}</TableCell>
                            <TableCell>{row.address.full}</TableCell>
                            <TableCell align="right">${row.totalCost}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {!needShowFullList &&
                <div className={classes.seeMore}>
                    <Link to="/orders" style={{
                        textDecoration: 'none',
                        textTransform: 'lowercase'
                    }}>
                        <Button variant="outlined" color="primary">
                            See more orders
                        </Button>
                    </Link>
                </div>
            }
        </React.Fragment>
    );
}