import React, {Component, Fragment} from 'react';
import classes from './List.module.css';
import Task from './Task/Task';
import AddTask from './AddTask/AddTask';
import Note from './Note/Note';
import {animateScroll} from "react-scroll";
import * as actions from "../../store/actions";
import {connect} from 'react-redux';
import Modal from '../UI/Modal/Modal';
import ConfirmModal from '../UI/Modal/confirmModal';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {faTrashAlt, faEdit} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class List extends Component {

    state = {
        openTaskId: null,
        openDropDown: false
    };


    scrollToTop() {
        animateScroll.scrollToTop({
            containerId: "scroll"
        });
    };

    componentDidMount() {
        console.log("[List] componentDidMount");
        this.scrollToTop();
        this.props.setCurrentList(this.props.list);
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        console.log("[List] shouldComponentUpdate");
        if (this.props.currentList !== nextProps.currentList ||
            this.state.openDropDown !== nextState.openDropDown ||
            this.props.showModal !== nextProps.showModal) {
            return true;
        }
        return false;
    }


    createTasks = () => {
        let tasks = this.props.currentList.tasks.map((task) => {
            return <Task key={task._id} task={task} listName={this.props.currentList.name}/>
        });


        let notebook =
            <Fragment>


                <div id='scroll' className={classes.Tasks}>
                    {tasks}
                </div>

                <div className={classes.AddTask}>
                    <AddTask list={this.props.currentList}/>
                </div>
            </Fragment>;

        return notebook;
    };

    toggle = () => {
        let openDropDown = this.state.openDropDown;
        this.setState({openDropDown: !openDropDown});
    };


    // createDropDown = () => {
    //     let deleteIcon =
    //         <div className={classes.Icon}>
    //             <FontAwesomeIcon
    //                 onClick={(e) => this.taskStatusChangeHandler(e, false, true)}
    //                 icon={faTrashAlt}
    //                 size="lg"/>
    //         </div>;
    //
    //     let editIcon =
    //         <div className={classes.Icon}>
    //             <FontAwesomeIcon
    //                 onClick={(e) => this.taskStatusChangeHandler(e, false, true)}
    //                 icon={faEdit}
    //                 size="lg"/>
    //         </div>;
    //
    //     let listOptions = !this.props.isMyDay ?
    //         <Dropdown isOpen={this.state.openDropDown}  toggle={this.toggle}>
    //             <DropdownToggle className={classes.Dropdown} color="">
    //                 ...
    //             </DropdownToggle>
    //
    //             <DropdownMenu className={classes.DropdownMenu}>
    //                 <DropdownItem onClick={() => {
    //                     console.log("FFFFF");
    //                 }}>
    //                     <div className={classes.DropdownItem}>
    //                     {editIcon}
    //                     Rename list
    //                     </div>
    //                 </DropdownItem>
    //                 <hr/>
    //                 <DropdownItem >
    //                     <div className={classes.DropdownItem}>
    //                     {deleteIcon}
    //                     Delete list
    //                     </div>
    //                 </DropdownItem>
    //             </DropdownMenu>
    //         </Dropdown> : null ;
    //
    //     return listOptions;
    // };


    createHeader = () => {
        let date = this.props.isMyDay ? <h5> {new Date().toDateString()}</h5> : null;
        // let listOptions = this.createDropDown();

        let header =
            <div className={classes.Header}>
                <div className={classes.Top}>
                    <h1> {this.props.currentList.name} </h1>
                </div>
                {date}
            </div>;

        return header;
    };


    render() {

        console.log("[List] - Render ");
        let list = null;

        if (this.props.currentList) {
            let header = this.createHeader();
            let tasks = this.createTasks();

            list =
                <Fragment>
                    <Modal show={this.props.showModal} modalClosed={() => this.props.onSetModal(false)}>
                        <ConfirmModal msg="Are you sure you want to delete this task?"
                                      onConfirm={() => {
                                          this.props.onDeleteTask(this.props.currentList, this.props.deletedTaskId)
                                      }}
                                      onCancel={() => this.props.onSetModal(false)}/>
                    </Modal>
                    <div className={classes.List}>
                        <div className={classes.Notebook}>
                            {header}
                            {tasks}
                        </div>

                        <Note listName={this.props.currentList.name}/>
                    </div>
                    ;
                </Fragment>
        }

        return list;
    };
};


const mapStateToProps = state => {
    return {
        currentList: state.lists.currentList,
        addTaskDisabled: state.lists.disabled,
        showModal: state.lists.showModal,
        deletedTaskId: state.lists.deletedTaskId
    };
};


const mapDispatchToProps = dispatch => {

    return {
        setCurrentList: (list) => dispatch(actions.setList(list)),
        onSetModal: (showModal) => dispatch(actions.setModal(showModal)),
        onDeleteTask: (currentList, taskId) => dispatch(actions.onDeleteTask(currentList, taskId))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(List);