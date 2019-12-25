import React, {Component, Fragment} from 'react';
import {ContextMenu, MenuItem, ContextMenuTrigger} from "react-contextmenu";
import './Task.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCircle, faEdit} from '@fortawesome/free-regular-svg-icons';
import classes from './Task.module.css';


class Task extends Component {

    state = {};

    createTask = () => {
        const element = <FontAwesomeIcon className={classes.Icon} icon={faCircle} size="lg"/>

        let task =
            <Fragment>

                <div className={classes.Task}>
                    {element}
                    <h1>{this.props.task.task}</h1>
                    <FontAwesomeIcon className={classes.Pen} icon={faEdit} size="sm"/>
                </div>

                <hr className={classes.Line}/>
            </Fragment>


        return (
            <div className={classes.Container}>
                <ContextMenuTrigger id="some_unique_identifier">
                    {task}
                </ContextMenuTrigger>

                <ContextMenu id="some_unique_identifier">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Mark as completed
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Mark as important
                    </MenuItem>
                    <MenuItem divider/>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Delete
                    </MenuItem>
                </ContextMenu>

            </div>
        );
    };


    render() {
        console.log("[Task] - Render ");

        let task = this.createTask();
        return task;
    };
};

export default Task;