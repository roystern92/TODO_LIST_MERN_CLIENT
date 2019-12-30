import React, {Component} from 'react';
import classes from './Note.module.css';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions';
import axios from '../../../axios/axios-todo-lists';

class Note extends Component {

    componentDidMount() {
        console.log("[Note] componentDidMount ");
    }


    onEditTaskHandler = async (isTitle) => {
        if(this.props.task.task.trim() !== this.props.title.trim() ||
            this.props.task.note.trim() !== this.props.note.trim()
        ){
            try {
                let url = '/admin/todo-item/' + this.props.task._id;
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();
                let data = new FormData();
                let important = this.props.task.important;
                let completed = this.props.task.completed;

                data.append('task', this.props.title);
                data.append('note', this.props.note);
                data.append('completed', completed);
                data.append('important', important);

                let res = await axios.put(url, data);
                this.props.onSetTask(res.data.task);
                if(isTitle){
                    this.props.onSetCurrentList(this.props.listName);
                }
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
                        <hr/>
                        <textarea onChange={(event) => this.props.onNoteChanged(event.target.value)}
                                  onBlur={() => this.onEditTaskHandler(false)}
                                  cols="45"
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
        title: state.task.title
    };
};


const mapDispatchToProps = dispatch => {

    return {
        onSetTask: (task) => dispatch(actions.setCurrentTask(task)),
        onTitleChanged: (title) => dispatch(actions.setTitle(title)),
        onNoteChanged: (note) => dispatch(actions.setNote(note)),
        onSetCurrentList: (listName) => dispatch(actions.fetchCurrentList(listName))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Note);