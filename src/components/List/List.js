import React, {Component, Fragment} from 'react';
import classes from './List.module.css';
import Task from './Task/Task';
import AddTask from './AddTask/AddTask';
import {animateScroll} from "react-scroll";
import * as actions from "../../store/actions";
import {connect} from 'react-redux';


class List extends Component {

    state = {
        openTaskId: null
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
        let tasks = this.props.currentList.tasks.filter(task => {
            return (task._id !== taskId);
        });

        let res = {... this.props.currentList};
        res.tasks = [...tasks];

        this.setState({list: res}, () => {
            this.props.onTaskChange();
        });
    };


    addTaskHandler = (task, cb) => {
        let list = {... this.props.currentList };
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
        let tasks = this.props.currentList.tasks.map((task) => {
            return <Task key={task._id} task={task} deleteTask={this.deleteTaskHandler} />
        });


        let notebook =
            <Fragment>
                <div id='scroll' className={classes.Tasks}>
                    {tasks}
                </div>

                <div className={classes.AddTask}>
                    <AddTask list={ this.props.currentList} onAddTask={this.addTaskHandler}/>
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
                <h1> { this.props.currentList.name} </h1>
                {date}
            </div>;

        return header;
    };

    render() {

        console.log("[List] - Render ");
        let list = null;

        if(this.props.currentList){
            let header = this.createHeader();
            let tasks = this.createTasks();
            let note = this.createNote();

            list =
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
        }

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