import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
    copyright: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)'
    }
})

export function Copyright() {
    const classes = useStyle()

    return (
        <Typography className={classes.copyright} variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link target='_blank' color="inherit" href="https://github.com/egoryaynov/e-commerce-shop">
                e-commerce-shop
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}