import React from 'react';
import Link from '@material-ui/core/Link';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../common/Title';

function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles({
    depositContext: {
        flex: 1,
    },
});

export default function Deposits({orders}) {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Title>Recent Deposits</Title>
            <Typography component="p" variant="h4">
                ${orders.reduce((acc, order, idx) => order.totalCost + acc, 0)}
            </Typography>
            <Typography color="textSecondary" className={classes.depositContext}>
                {new Date().toUTCString()}
            </Typography>
        </React.Fragment>
    );
}