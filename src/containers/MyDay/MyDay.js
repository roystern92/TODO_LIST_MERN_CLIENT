import React, {Component} from 'react';
import classes from './MyDay.module.css';
import List from '../../components/List/List';
import {connect} from  'react-redux';
import {setList, fetchCurrentList} from "../../store/actions";
import Spinner from '../../components/UI/Spinner/Spinner'

class MyDay extends Component {

    componentDidMount() {
        if(!this.props.currentList){
            this.fetchMyDayList();
        }
    }

    fetchMyDayList = async () => {
        try {
            await this.props.fetchList('My_Day');
        }catch (e) {
            console.log(e);
        }

    };


    render() {
        let list = this.props.currentList ? <div className={classes.MyDay}>
            <List list={this.props.currentList} isMyDay={true}/>
        </div> : <Spinner/>;

        return list;
    }
};



const mapStateToProps = state => {
    return {
        lists: state.lists.lists,
        currentList: state.lists.currentList
    };
};


const mapDispatchToProps = dispatch => {
    return {
        setCurrentList : (list) => dispatch(setList(list)),
        fetchList: (listName) => dispatch(fetchCurrentList(listName))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MyDay);

