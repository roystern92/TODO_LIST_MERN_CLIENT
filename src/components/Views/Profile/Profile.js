import React, {Component} from 'react';
import classes from './Profile.module.css';
import {connect} from 'react-redux';
import Modal from '../../UI/Modal/Modal';
import Edit from '../../UI/Modal/edit';
import ProfileDetail from './ProfileDetail/ProfileDetail';
import * as actions from "../../../store/actions";

class Profile extends Component {

    state = {
        edit: false,
        type: null
    };

    editHandler = (type) => {
        this.setState({edit: true, type: type})
    };


    createProfilePage = () => {
        let res = null;

        if (this.props.user) {
            res = <div className={classes.Container}>

                <Modal show={this.state.edit} modalClosed={() => this.setState({edit: false, type: null})}>
                    <Edit type={this.state.type} user={this.props.user}
                          onConfirm={this.props.onEditProfile}
                          onCancel={() => this.setState({edit: false, type: null})}/>
                </Modal>

                <div className={classes.Profile}>
                    <h1>Personal info</h1>
                    <h5>Basic info, such as your name and photo, that you use on TASKS</h5>


                    <div className={classes.ProfileForm}>
                        <div className={classes.Header}>
                            <h4>Profile</h4>
                            <p>Your info is not visible to other people using TASKS.</p>
                        </div>

                        <ProfileDetail onClickHandler={this.editHandler} type="Name" value={this.props.user.name}/>
                        <ProfileDetail onClickHandler={this.editHandler} type="Gender" value={this.props.user.gender}/>
                        <ProfileDetail onClickHandler={this.editHandler} type="Birthday" value={this.props.user.birthday}/>
                        <ProfileDetail onClickHandler={this.editHandler} type="Password" value="*********" isLast={true}/>

                    </div>


                    <div className={classes.ProfileForm}>
                        <div className={classes.Header}>
                            <h4>Contact info</h4>
                        </div>
                        <ProfileDetail onClickHandler={this.editHandler} type="Email" value={this.props.user.email}/>
                        <ProfileDetail onClickHandler={this.editHandler} type="Phone" value={this.props.user.phone} isLast={true}/>
                    </div>

                </div>
            </div>;
        }

        return res;
    };

    render() {

        let profile = this.createProfilePage();
        return profile;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEditProfile: () => dispatch(actions.fetchUserProfile()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);