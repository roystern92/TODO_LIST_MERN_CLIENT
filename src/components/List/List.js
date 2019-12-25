import React, {Component, Fragment} from 'react';
import classes from './List.module.css';
import Task from './Task/Task';
import AddTask from './AddTask/AddTask';
import { animateScroll } from "react-scroll";


class List extends Component {

    state = {
        openTaskId: null
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

    createTasks = () => {

        let tasks = this.props.list.tasks.map((task) => {
            return <Task key={task._id} task={task}/>
        });


        let notebook =
            <Fragment>
                <div id='scroll' className={classes.Tasks}>
                    {tasks}
                </div>

                <div className={classes.AddTask}>
                    <AddTask listId={this.props.list._id} onAddTask={this.props.onTaskChange} />
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
                <h1> {this.props.list.name} </h1>
                {date}
            </div>;

        return header;
    };


    render() {

        console.log("[List] - Render ");
        console.log(this.state.list);
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