import React, {Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import  './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


class Task extends Component {

    state = {
    };

    createTask = () => {
        const element = <FontAwesomeIcon style={{color: 'green'}} icon={faPlusCircle} />


        let task =
            <div className={Task}>
                {element}
            </div>;

        return (
            <div>
                <ContextMenuTrigger id="some_unique_identifier">
                    {task}
                </ContextMenuTrigger>

                <ContextMenu id="some_unique_identifier">
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        ContextMenu Item 1
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        ContextMenu Item 2
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        ContextMenu Item 3
                    </MenuItem>
                </ContextMenu>

            </div>
        );

        // Todo Create all The Task
    };


    render() {
        let task = this.createTask();
        return task;
    };
};

export default Task;