import React, {Component} from 'react';
import classes from './AddTask.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'reactstrap';
import {connect} from 'react-redux';
import {addingNewTask} from "../../../store/actions";
import {animateScroll} from "react-scroll/modules";


class AddTask extends Component {
    state = {
        value: ""
    };



    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "scroll"
        });
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {

        if (this.state.value !== nextState.value ||
            this.props.addTaskDisabled !== nextProps.addTaskDisabled) {
            return true;
        }
        return false;
    }


    onChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };


    addTaskHandler = () => {
        if (this.state.value !== "") {
            let task = {task: this.state.value, _id: Date.now().toString()};
            this.props.AddingNewTask(this.props.list, task);

            this.setState({value: ""}, () => {
                this.scrollToBottom();
            })
        }
    };

    onEnterPressedHandler = (event) => {
        if (event.key === "Enter" && !this.props.addTaskDisabled) {
            this.addTaskHandler();
        }
    };


    createIcon = () => {
        let iconClass = !this.props.addTaskDisabled ? classes.Icon : classes.IconDisabled;
        let icon = <FontAwesomeIcon
            onClick={() => {
                if (!this.props.addTaskDisabled) {
                    this.addTaskHandler();
                }
            }}
            className={iconClass}
            icon={faPlusCircle}
            size="lg"/>;

        return icon;
    }

    createAddTask = () => {
        const addIcon = this.createIcon();


        let addTask =
            <div className={classes.Task}>
                {addIcon}
                <input onKeyDown={this.onEnterPressedHandler} type="text" onChange={(event) => {
                    this.onChangeHandler(event)
                }} value={this.state.value} placeholder="Add task"/>
                <Button disabled={this.props.addTaskDisabled} onClick={this.addTaskHandler}
                        className={classes.AddButton} size='sm'>Add</Button>
            </div>
        return addTask;
    };


    render() {
        let addTask = this.createAddTask();
        return addTask;
    };

}

const mapStateToProps = state => {
    return {
        addTaskDisabled: state.lists.disabled,
        list: state.lists.currentList
    };
};


const mapDispatchToProps = dispatch => {

    return {
        AddingNewTask: (list, task) => dispatch(addingNewTask(list, task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);