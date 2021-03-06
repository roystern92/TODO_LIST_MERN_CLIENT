import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './AuthNavItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-regular-svg-icons";
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {withRouter} from 'react-router-dom';
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

        if (this.props.isAuth && this.props.user) {
            let userEmail = this.props.user.email;
            let userFullName = this.props.user.name;

            navigationItems =
                <div className={classes.ProfileDropdown + " DropdownMenu"}>
                    <Dropdown isOpen={this.state.openDropDown} toggle={this.toggle}>
                        <DropdownToggle className={classes.Dropdown} color="">
                            {icon}
                        </DropdownToggle>

                        <DropdownMenu className={classes.DropdownMenu}>
                            <DropdownItem onClick={() => {
                                this.props.history.push('/profile');
                            }}>

                                <div className={classes.Profile}>
                                    <h3>{userFullName}</h3>
                                    <h5>{userEmail}</h5>

                                </div>

                            </DropdownItem>

                            <DropdownItem divider/>

                            <DropdownItem onClick={() => {
                                this.props.history.push('/logout');
                            }}>
                                Log out
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


const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

export default withRouter(connect(mapStateToProps)(AuthNavItems));