import React, {Component} from 'react';
import classes from './List.module.css';
import Task from './Task/Task';
import AddTask from './AddTask/AddTask';

class List extends Component {

    state = {
        openTaskId: null
    };

    createTasks = () => {

        let task = null;


        let tasks =
            <div className={classes.Tasks}>
                {task}
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />
                <Task task="fuck" />

                <AddTask />

            </div>;

        return tasks;
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