import React from 'react';
import classes from "../Profile.module.css";

const profileDetail = (props) => {

    return (
    <div onClick={() => props.onClickHandler(props.type)} className={!props.isLast ? classes.RowContainer : classes.LastRowContainer}>
        <div className={classes.Row}>
            <h4>{props.type.toUpperCase()}</h4>
            <p>{props.value}</p>
            <span>></span>
        </div>
    </div>);

}

export default profileDetail;