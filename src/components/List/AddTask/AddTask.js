import React, {Component} from 'react';
import classes from './AddTask.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import {Button} from 'reactstrap';
import axios from '../../../axios/axios-todo-lists';
import {connect} from 'react-redux';
import * as actions from "../../../store/actions";


class AddTask extends Component {
    state = {
        value: ""
    };

    // componentDidMount() {
    //     this.props.AddingNewTask();
    // }

    onChangeHandler = (event) => {
        this.setState({value: event.target.value});
    };

    saveTaskAtServer = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
            let url = '/admin/todo-item/' + this.props.list._id;
            let data = new FormData();

            data.append('task', this.state.value);
            this.setState({value: ""});
            return await axios.post(url, data);

        } catch (e) {
            console.log(e);
        }

    };

    addTaskHandler = () => {
        if (this.state.value !== "") {
            let task = {task: this.state.value, _id: Date.now().toString()};
            this.props.AddingNewTask(this.props.list, task);
            this.props.onAddTask(task, this.saveTaskAtServer);
        }
    };

    onEnterPressedHandler = (event) => {
        if (event.key === "Enter") {
            this.addTaskHandler();
        }
    };

    createAddTask = () => {
        const addIcon = <FontAwesomeIcon onClick={this.addTaskHandler} className={classes.Icon} icon={faPlusCircle}
                                         size="lg"/>

        let addTask =
            <div className={classes.Task}>
                {addIcon}
                <input onKeyDown={this.onEnterPressedHandler} type="text" onChange={(event) => {
                    this.onChangeHandler(event)
                }} value={this.state.value} placeholder="Add task"/>
                <Button onClick={this.addTaskHandler} className={classes.AddButton} size='sm'>Add</Button>
            </div>
        return addTask;
    };

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (this.props.list !== nextProps.list || this.state.value !== nextState.value) {
            return true;
        }
        return false;
    }


    render() {
        // console.log("[AddTask] - Render ");
        // console.log(this.props.addTaskDisabled);

        let addTask = this.createAddTask();
        return addTask;

    };

}

const mapStateToProps = state => {
    return {
        addTaskDisabled : state.auth.disabled,
        list: state.auth.currentList
    };
};


const mapDispatchToProps = dispatch => {

    return {
        AddingNewTask : (list, task) => dispatch(actions.addingNewTask(list, task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTask);