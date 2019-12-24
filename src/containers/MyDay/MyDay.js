import React, {Component} from 'react';
import classes from './MyDay.module.css';
import axios from '../../axios/axios-todo-lists';
import List from '../../components/List/List';

class MyDay extends Component {

    state = {
        list: null
    }

    fetchList = () => {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token').toString();

        let listName  = 'My_Day';
        let url = '/admin/list/' + listName;

        axios.get(url)
            .then(res => {
                this.setState({list: res.data.list});
            })
            .catch(err => {
                console.log(err);
            });
    };

    componentDidMount() {
       this.fetchList();
    };

    taskDeleteHandler = () => {
        this.fetchList();
    };


    render() {
        let list = this.state.list ?
            <div className={classes.MyDay}>
                <List list={this.state.list} isMyDay={true} onTaskDelete={this.taskDeleteHandler}/>
            </div> : null ;

        return list;
    }
};

export default MyDay;

