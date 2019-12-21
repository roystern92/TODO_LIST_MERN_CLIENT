import React, { Component } from 'react';
import classes from './Loader.module.css';
import { Jumbotron, Button } from 'reactstrap';

import { connect } from 'react-redux';

class Loader extends Component {

    buttonClickHandler = (event) => {
        if (this.props.isAuth) {
            this.props.history.push('/my-day');
        } else {
            this.props.history.push('/signUp');
        }
    };

    render() {

        let loader =
            <Jumbotron>
                <div className={classes.Top}>
                    <h1 className="display-4">Welcome To Task's</h1>
                    <p className="lead">The best way to manage your tasks.</p>
                </div>

                <div className={classes.Body} >
                    <img src='https://www.fastweb.com/uploads/article_photo/photo/2034753/crop380w_how-to-stay-organized-all-semester-long.jpg' />
                </div>

                <div className={classes.Botoom} >
                    <p className="lead">
                        <Button onClick={this.buttonClickHandler} color="primary"> Get Started</Button>
                    </p>
                </div>
            </Jumbotron>;

        return (
            <div className={classes.Loader}>
                {loader}
            </div>
        );

    };
};


const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    };
};


export default connect(mapStateToProps)(Loader);