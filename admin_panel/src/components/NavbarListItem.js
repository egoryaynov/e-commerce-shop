import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import {NavLink} from "react-router-dom";

const NavbarListItem = ({route, text, IconComponent}) => {
    return (
        <NavLink to={route} className='navbar__link' activeClassName='navbar__active'>
            <ListItem button>
                <ListItemIcon>
                    <IconComponent/>
                </ListItemIcon>
                <ListItemText primary={text}/>
            </ListItem>
        </NavLink>
    );
};

export default NavbarListItem;
