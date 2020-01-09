import React, {Fragment} from 'react';
import AppLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Container}>

        <div className={classes.Logo}>
            <img src={AppLogo} alt="MyTodoList"/>
        </div>

        <div className={classes.Title}>
            <h2>TASKS</h2>
        </div>

    </div>

);

export default logo;