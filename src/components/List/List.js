import React, {Component, Fragment} from 'react';
import classes from './List.module.css';
import Task from './Task/Task';
import AddTask from './AddTask/AddTask';
import {animateScroll} from "react-scroll";
import * as actions from "../../store/actions";
import {connect} from 'react-redux';


class List extends Component {

    state = {
        openTaskId: null,
        list: this.props.list,
    };

    componentDidMount() {
        this.scrollToBottom();
        this.props.setCurrentList(this.props.list);
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "scroll"
        });
    };


    deleteTaskHandler = (taskId) => {
        console.log("2");

        let tasks = this.state.list.tasks.filter(task => {
            return (task._id !== taskId);
        });
        let res = {...this.state.list};
        res.tasks = [...tasks];
        console.log(res);

        this.setState({list: res}, () => {
            // this.props.onTaskChange();
            console.log(this.state.list);

            console.log("3");

        });
    };


    addTaskHandler = (task, cb) => {
        let list = {...this.state.list };
        list.tasks.push(task);

        this.setState({list: list}, () => {
            cb()
                .then(() => {
                    this.props.onTaskChange();
                })
                .catch(err => console.log(err));
        });
    };

    createTasks = () => {

        let tasks = this.state.list.tasks.map((task) => {
            return <Task key={task._id} task={task} deleteTask={this.deleteTaskHandler} />
        });


        let notebook =
            <Fragment>
                <div id='scroll' className={classes.Tasks}>
                    {tasks}
                </div>

                <div className={classes.AddTask}>
                    <AddTask list={this.state.list} onAddTask={this.addTaskHandler}/>
                </div>
            </Fragment>;

        return notebook;
    };

    createNote = () => {
        // Todo Create Note Component
    };

    createHeader = () => {
        let date = this.props.isMyDay ? <h5> {new Date().toDateString()}</h5> : null;
        let header =
            <div className={classes.Header}>
                <h1> {this.state.list.name} </h1>
                {date}
            </div>;

        return header;
    };

    static getDerivedStateFromProps(props, state) {

        // console.log("[List] - getDerivedStateFromProps ");
        let propsTasksLength = props.list.tasks.length;
        let stateTasksLength = state.list.tasks.length;

        // must check if the last task id is not  equal
        // (the list last task right now id dummy one)
        // and the second check is that user didn't delete any task
        // if he delete a task, we don't want the list from the props.

        if (propsTasksLength > 0 && stateTasksLength > 0) {
            if(props.list.tasks[propsTasksLength -1]._id.toString() !== state.list.tasks[stateTasksLength -1]._id
                && propsTasksLength === stateTasksLength){
                return ({
                    list: props.list
                })
            }

        }
        return null;
    }


    render() {

        // console.log("[List] - Render ");
        // console.log( this.props.currentList);
        let header = this.createHeader();
        let tasks = this.createTasks();
        let note = this.createNote();

        let list =
            <div className={classes.List}>
                <div className={classes.Notebook}>
                    {header}
                    {tasks}
                </div>

                <div className={classes.Note}>
                    {note}
                    <p>dfdd</p>
                </div>
            </div>;

        return list;
    };
};


const mapStateToProps = state => {
    return {
        currentList : state.auth.currentList
    };
};


const mapDispatchToProps = dispatch => {

    return {
        setCurrentList : (list) => dispatch(actions.setList(list))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(List);