import React, {Component, Fragment} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

// Redux
import {connect} from 'react-redux';


class Layout extends Component {

    state = {
        sideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        });
    }

    render() {
        return (
            <Fragment>
                <main className={classes.Content}>
                    <Toolbar isAuth={this.props.isAuthenticated}
                             drawerToggleClicked={this.sideDrawerToggleHandler}
                    />
                    <SideDrawer
                        isAuth={this.props.isAuthenticated}
                        open={this.state.showSideDrawer}
                        closed={this.sideDrawerClosedHandler}/>
                    <div className={classes.Content}>
                        {this.props.children}
                    </div>
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