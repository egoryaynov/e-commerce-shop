import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import StorefrontIcon from '@material-ui/icons/Storefront';
import CategoryIcon from '@material-ui/icons/Category';
import NavbarListItem from "./components/NavbarListItem";

export const mainListItems = (
    <div>
        <NavbarListItem route='/dashboard' text='Dashboard' IconComponent={DashboardIcon}/>
        <NavbarListItem route='/orders' text='Orders' IconComponent={ShoppingCartIcon}/>
        <NavbarListItem route='/products' text='Products' IconComponent={StorefrontIcon}/>
        <NavbarListItem route='/customers' text='Customers' IconComponent={PeopleIcon}/>
        <NavbarListItem route='/categories' text='Categories' IconComponent={CategoryIcon}/>
    </div>
);