import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import { NavLink } from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>



        
        <NavLink
            exact
            to='/'
            className={classes.Logo}
        >
                <Logo />
        </NavLink>

        <div className={classes.Title} >
            <h2>TASKS</h2>
        </div>

        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} />
        </nav>

        <DrawerToggle clicked={props.drawerToggleClicked} />
    </header>
);

export default toolbar;
