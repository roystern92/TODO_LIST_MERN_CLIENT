import React, {Component, Fragment} from 'react';
import classes from './List.module.css';
import Task from './Task/Task';
import AddTask from './AddTask/AddTask';
import {animateScroll} from "react-scroll";


class List extends Component {

    state = {
        openTaskId: null,
        list: this.props.list,
    };

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "scroll"
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
            return <Task key={task._id} task={task}/>
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

        let propsTasksLength = props.list.tasks.length;
        let stateTasksLength = state.list.tasks.length;
        console.log("[List] - getDerivedStateFromProps ");


        if (propsTasksLength > 0 && stateTasksLength > 0) {
            if(props.list.tasks[propsTasksLength -1]._id.toString() !== state.list.tasks[stateTasksLength -1]._id){
                return ({
                    list: props.list
                })
            }

        }
        return null;
    }

    //
    // shouldComponentUpdate(nextProps, nextState, nextContext) {
    //     if(this.state.list !== nextProps.list){
    //         // setState?
    //         return true;
    //     }
    //     return false;
    // }


    render() {

        console.log("[List] - Render ");
        let header = this.createHeader();
        let tasks = this.createTasks();
        let note = this.createNote();
        // let addTask = <AddTask/> ;

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

export default List;