import React from 'react';
import AppLogo from '../../assets/images/Yellow_Duck.jpg';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}  >
        <img src={AppLogo}  alt="MyTodoList"/>
    </div>
);

export default logo;