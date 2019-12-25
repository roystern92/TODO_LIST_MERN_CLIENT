import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
    let navigationItems = (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/signIn" exact>Sign In</NavigationItem>
            <NavigationItem link="/signUp" exact>Sign Up</NavigationItem>
        </ul>
    );

    if (props.isAuth) {
        navigationItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/my-day" exact>My Day</NavigationItem>
                <NavigationItem link="/my-lists" exact>My Lists</NavigationItem>
                <NavigationItem link="/profile" exact>Profile</NavigationItem>
                <NavigationItem link="/logout" exact>Sign Out</NavigationItem>
            </ul>
        );
    }


    return (
        navigationItems
    );
};

export default navigationItems;