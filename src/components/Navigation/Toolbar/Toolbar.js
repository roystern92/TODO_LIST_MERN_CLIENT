import React from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={() => {}}/>
        <div className={classes.Logo}>
            <Logo />
        </div>

        <div className={classes.Title} >
           <h1>TASK'S</h1>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/> 
        </nav>
    </header>
);

export default toolbar;
