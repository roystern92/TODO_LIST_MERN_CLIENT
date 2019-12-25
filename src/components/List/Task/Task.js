import React, {Component} from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import  './Task.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCircleNotch  } from '@fortawesome/free-solid-svg-icons'
import { faCircle  } from '@fortawesome/free-regular-svg-icons'


class Task extends Component {

    state = {
    };

    createTask = () => {
        const element = <FontAwesomeIcon  icon={faCircle} />


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
                        Mark as completed
                    </MenuItem>
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Mark as important
                    </MenuItem>
                    <MenuItem divider />
                    <MenuItem data={{foo: 'bar'}} onClick={this.handleClick}>
                        Delete
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