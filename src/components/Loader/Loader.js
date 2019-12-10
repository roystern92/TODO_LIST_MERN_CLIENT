import React, { Component } from 'react';
import classes from './Loader.module.css';
import { connect } from 'react-redux';
import { Jumbotron, Button, Spinner } from 'reactstrap';
import axios from '../../axios/axios-todo-lists';
import withErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class Loader extends Component {
    state = {
        loading: false
    }
    
    createMyDayList = () => {
        const formData = new FormData();
        formData.append('name', "My Day");
        formData.append('isPublic', false);
        formData.append('isRemovable', false);

        axios.post('/admin/list', formData)
            .then(res => {
                console.log("New list was created.");
                this.setState({ loading: false });
            })
            .catch(err => {
                this.setState({ loading: false });
                console.log("Error while tring to create new list.");
            });
    }

    buttonClickHandler = (event) => {
        this.setState({ loading: true });
        this.createMyDayList();
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

        if (this.state.loading) {
            loader =
                <div className={classes.Spinner}>
                    <Spinner style={{ width: '10rem', height: '10rem' }} />{' '}
                </div>;
        }


        return (
            <div className={classes.Loader}>
                {loader}
            </div>
        );

    };
};

const mapStatesToProps = (state) => {
    return {
        token: state.auth.token !== null,
    };
};



export default connect(mapStatesToProps)(withErrorHandler(Loader, axios));