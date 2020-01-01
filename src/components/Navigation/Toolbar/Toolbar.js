import React,{Fragment} from 'react';
import classes from './Toolbar.module.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import {NavLink} from 'react-router-dom';
import NavigationItems from '../NavigationItems/NavigationItems';
import AuthNavigationItems from '../NavigationItems/Auth/AuthNavItems';

const toolbar = (props) => (
    <header className={classes.Toolbar}>

        <NavLink
            exact
            to='/'
            className={classes.Logo}
        >
            <Logo/>

        </NavLink>




        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth}/>
            <AuthNavigationItems isAuth={props.isAuth}/>
        </nav>

        {/*<nav className={classes.DesktopOnly}>*/}
            {/*<AuthNavigationItems isAuth={props.isAuth}/>*/}
        {/*</nav>*/}



        <DrawerToggle clicked={props.drawerToggleClicked}/>
    </header>
);

export default toolbar;
