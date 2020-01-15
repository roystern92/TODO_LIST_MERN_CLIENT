import React, {Component} from 'react';
import classes from './Note.module.css';
import {connect} from 'react-redux';
import {setCurrentTask, setTitle, setNote, fetchCurrentList, setList} from '../../../store/actions';
import axios from '../../../axios/axios-todo-lists';

class Note extends Component {

    componentDidMount() {
        console.log("[Note] componentDidMount ");
    }

    updateCurrentListWithTheUpdatedTask = () => {

        let task = {...this.props.task};
        task.task = this.props.title;
        task.note = this.props.note;

        let tasks = this.props.currentList.tasks.map(el => {
            if(el._id === task._id){
                return task;
            }
            return el;
        });

        let list = {...this.props.currentList};
        list.tasks = [...tasks];
        this.props.onSetCurrentList(list);
    };


    onEditTaskHandler = async (isTitle) => {
        if (this.props.task.task.trim() !== this.props.title.trim() ||
            this.props.task.note.trim() !== this.props.note.trim()
        ) {
            try {
                let url = '/admin/todo-item/' + this.props.task._id;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
                let data = new FormData();


                data.append('task', this.props.title);
                data.append('note', this.props.note);
                data.append('completed', this.props.task.completed);
                data.append('important', this.props.task.important);


                this.updateCurrentListWithTheUpdatedTask();

                let res = await axios.put(url, data);
                this.props.onSetTask(res.data.task);
                this.props.onFetchCurrentList(this.props.listName);
            } catch (e) {
                console.log(e);
            }
        }

    };

    createNote = () => {
        let note = <div className={classes.Note}></div>;


        if (this.props.task) {
            let titleClassName = this.props.task.completed ? classes.Title + " " + classes.Completed : classes.Title;
            note =
                <div className={classes.Note}>
                    <div className={classes.Content}>

                        <textarea
                            className={titleClassName}
                            onChange={(event) => this.props.onTitleChanged(event.target.value)}
                            onBlur={() => this.onEditTaskHandler(true)}
                            rows="3"
                            value={this.props.title}
                        />
                        <textarea className={classes.TextAreaNote} onChange={(event) => this.props.onNoteChanged(event.target.value)}
                                  onBlur={() => this.onEditTaskHandler(false)}
                                  cols="40"
                                  rows="5"
                                  placeholder="Add note..."
                                  value={this.props.note}/>
                    </div>
                </div>
            ;
        }

        return note;
    };

    render() {
        console.log("[Note] render ");
        let note = this.createNote();
        return note;
    };


};

const mapStateToProps = state => {
    return {
        task: state.task.currentTask,
        note: state.task.note,
        title: state.task.title,
        currentList: state.lists.currentList
    };
};


const mapDispatchToProps = dispatch => {

    return {
        onSetTask: (task) => dispatch(setCurrentTask(task)),
        onTitleChanged: (title) => dispatch(setTitle(title)),
        onNoteChanged: (note) => dispatch(setNote(note)),
        onFetchCurrentList: (listName) => dispatch(fetchCurrentList(listName)),
        onSetCurrentList: (list) => dispatch(setList(list)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);