import React, {Component} from 'react';
import classes from './Note.module.css';
import {connect} from 'react-redux';

class Note extends Component {

    state = {
        note: null,
        taskName: null
    };

    componentDidMount() {
     

    }

    render() {
        return (this.props.task ? <div></div> : null);
    };

};

const mapStateToProps = state => {
    return {
        task: state.lists.currentTask,

    };
}

export default connect(mapStateToProps)(Note);