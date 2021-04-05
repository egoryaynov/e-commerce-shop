import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import CategoryIcon from '@material-ui/icons/Category';
import {NavLink} from "react-router-dom";

export const mainListItems = (
    <div>
        <NavLink to='/dashboard' className='navbar__link' activeClassName='navbar__active'>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
        </NavLink>

        <NavLink to='/orders' className='navbar__link' activeClassName='navbar__active'>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon/>
                </ListItemIcon>
                <ListItemText primary="Orders"/>
            </ListItem>
        </NavLink>

        <NavLink to='/products' className='navbar__link' activeClassName='navbar__active'>
            <ListItem button>
                <ListItemIcon>
                    <StorefrontIcon/>
                </ListItemIcon>
                <ListItemText primary="Products"/>
            </ListItem>
        </NavLink>

        <NavLink to='/customers' className='navbar__link' activeClassName='navbar__active'>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Customers"/>
            </ListItem>
        </NavLink>

        <NavLink to='/categories' className='navbar__link' activeClassName='navbar__active'>
            <ListItem button>
                <ListItemIcon>
                    <CategoryIcon/>
                </ListItemIcon>
                <ListItemText primary="Categories"/>
            </ListItem>
        </NavLink>

        <ListItem button>
            <ListItemIcon>
                <BarChartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reports"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon/>
            </ListItemIcon>
            <ListItemText primary="Integrations"/>
        </ListItem>
    </div>
);

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItem>
    </div>
);