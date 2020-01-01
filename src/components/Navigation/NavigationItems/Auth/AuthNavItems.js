import React, {Component} from 'react';
import classes from './AuthNavItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {NavLink} from 'react-router-dom';
import './dropdown.css';
class AuthNavItems extends Component {

    state = {
        openDropDown: false
    }

    toggle = () => {
        let openDropDown = this.state.openDropDown;
        this.setState({openDropDown: !openDropDown});
    };

    render() {

        let icon = <FontAwesomeIcon
            icon={faUser}
            size="lg"/>;

        let navigationItems = (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/signIn" exact>Sign In</NavigationItem>
                <NavigationItem link="/signUp" exact>Sign Up</NavigationItem>
            </ul>
        );

        if (this.props.isAuth) {
            navigationItems =
                <div className={classes.ProfileDropdown + " DropdownMenu"} onMouseEnter={this.toggle}>
                    <Dropdown isOpen={this.state.openDropDown} toggle={this.toggle}>
                        <DropdownToggle className={classes.Dropdown} color="">
                            {icon}
                        </DropdownToggle>

                        <DropdownMenu className={classes.DropdownMenu}>
                            <DropdownItem header >

                                <NavLink exact to='/profile'>
                                    Profile
                                </NavLink>

                            </DropdownItem>

                            <DropdownItem divider/>



                            <DropdownItem>
                                <NavLink exact to='/logout'>
                                    Log out
                                </NavLink>
                            </DropdownItem>

                        </DropdownMenu>
                    </Dropdown>
                </div>;
        }

        return (
            navigationItems
        );
    };


};

export default AuthNavItems;