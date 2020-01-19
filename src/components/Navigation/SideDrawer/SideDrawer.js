import React, {Fragment} from 'react';
import Logo from '../../Logo/Logo';
import {NavLink} from 'react-router-dom';

import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }

    let routes = <nav>
        <NavLink
            exact
            to='/signIn'
        >
            <div className={classes.MobileNavItem}>
                Sign in
            </div>

        </NavLink>

        <hr/>


        <NavLink
            exact
            to='/signUp'
        >
            <div className={classes.MobileNavItem}>
                Sign up
            </div>

        </NavLink>

    </nav>;


    if(props.isAuth){
        routes =  <nav>
            <NavLink
                exact
                to='/my-day'
            >
                <div className={classes.MobileNavItem}>
                    My day
                </div>

            </NavLink>

            <hr/>

            <NavLink
                exact
                to='/profile'
            >
                <div className={classes.MobileNavItem}>
                    Profile
                </div>

            </NavLink>

            <hr/>



            <NavLink
                exact
                to='/logout'
            >
                <div className={classes.MobileNavItem}>
                    Log out
                </div>

            </NavLink>

        </nav>;

    }


    return (
        <Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>

                {routes}

            </div>
        </Fragment>
    );
};

export default sideDrawer;