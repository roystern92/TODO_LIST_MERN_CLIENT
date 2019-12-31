import React from 'react';
import classes from './Modal.module.css';
import {Button} from 'reactstrap';

const confirmModal = (props) => {
    return (
        <div className={classes.Confirm}>
            <h5>{props.msg}</h5>
            <div className={classes.Buttons}>
                <Button color="primary" size="sm" onClick={() => {
                    props.onConfirm();
                    props.onCancel();
                }}>Confirm</Button>
                <Button color="secondary" size="sm" onClick={props.onCancel}>Cancel</Button>
            </div>
        </div>
    );
};

export default confirmModal;