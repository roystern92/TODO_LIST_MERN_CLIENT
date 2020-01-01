import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const navigationItems = (props) => {


    let navigationItems = null;

    if (props.isAuth) {
        navigationItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/my-day" exact>My Day</NavigationItem>
                <NavigationItem link="/my-lists" exact>My Lists</NavigationItem>
            </ul>
        );
    }


    return (
        navigationItems
    );
};

export default navigationItems;