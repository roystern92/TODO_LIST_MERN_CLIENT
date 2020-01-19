import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {


    let navigationItems = null;

    if (props.isAuth) {
        navigationItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/my-day" exact>My Day</NavigationItem>
            </ul>
        );
    }


    return (
        navigationItems
    );
};

export default navigationItems;