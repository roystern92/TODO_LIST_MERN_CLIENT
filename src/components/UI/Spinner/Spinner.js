import React from 'react';

import classes from './Spinner.module.css';

const spinner = () => (
    <div>
        <div className={classes.spinner3}></div>
        <div className={classes.spinner}></div>
        <div className={classes.spinner2}></div>
    </div>
);

export default spinner;