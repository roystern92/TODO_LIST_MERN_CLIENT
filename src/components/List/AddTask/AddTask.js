import React, {Component} from 'react';
import classes from './AddTask.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons'

class AddTask extends Component {
    state = {
        value: ""
    };

    onChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    createAddTask = () => {
        const addIcon = <FontAwesomeIcon className={classes.Icon} icon={faPlusCircle}/>

        let addTask =
            <div className={classes.Content} >
                <div className={classes.AddTask}>
                    {addIcon}
                    <input type="text" onChange={(event) => {
                        this.onChangeHandler(event)
                    }} value={this.state.value} placeholder="Add task"/>
                </div>

                <hr className={classes.Line}/>
            </div>

        return addTask;
    };


    render() {

        let addTask = this.createAddTask();
        return addTask;

    };

}

export default AddTask;