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
        console.log("[List] componentDidMount");
        this.props.setCurrentList(this.props.list);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.scrollToBottom();
        console.log("[List] shouldComponentUpdate");
        if(this.props.currentList !== nextProps.currentList ){
            return true;
        }
        return false;
    }


    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "scroll"
        });
    };


    createTasks = () => {
        let tasks = this.props.currentList.tasks.map((task) => {
            return <Task key={task._id} task={task}  />
        });


        let notebook =
            <Fragment>
                <div id='scroll' className={classes.Tasks}>
                    {tasks}
                </div>

                <div className={classes.AddTask}>
                    <AddTask list={ this.props.currentList}/>
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
                    </div>
                </div>;
        }

        return list;
    };
};


const mapStateToProps = state => {
    return {
        currentList : state.lists.currentList,
        addTaskDisabled : state.lists.disabled
    };
};


const mapDispatchToProps = dispatch => {

    return {
        setCurrentList : (list) => dispatch(actions.setList(list))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(List);