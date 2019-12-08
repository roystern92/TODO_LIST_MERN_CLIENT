import React, { Component, Fragment } from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

// Redux
import { connect } from 'react-redux';


class Layout extends Component {

    state = {
        sideDrawer: false
    }

    render() {
        return (
            <Fragment>
                <Toolbar isAuth={this.props.isAuthenticated}/>
                <p>SideDrawer</p>

                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);